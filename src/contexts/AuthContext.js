import React, { createContext, useState, useEffect, useContext } from "react"; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";


export const AuthContext = createContext({});

// AuthProvider 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await AsyncStorage.getItem("user");
      const storagedToken = await AsyncStorage.getItem("token");

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
        api.defaults.headers["x-session-token"] = storagedToken;
      }
      setLoading(false);
    }
    loadStoragedData();
  }, []);

  // Função para realizar login
  const signIn = async (login, password) => {
    try {
      const response = await api.post("/sessions", { login, password });
      setUser(response.data); // Armazena os dados do usuário logado
      api.defaults.headers["x-session-token"] = response.data.token; // Define o token para as próximas requisições
      await AsyncStorage.setItem("user", JSON.stringify(response.data)); // Armazena o usuário no AsyncStorage
      await AsyncStorage.setItem("token", response.data.token); // Armazena o token no AsyncStorage
    } catch (error) {
      throw error; // Tratamento de erros
    }
  };

  // Função para realizar logout
  const signOut = async () => {
    await AsyncStorage.removeItem("user"); 
    await AsyncStorage.removeItem("token"); 
    setUser(null); 
  };

  // Função para registro de novo usuário
  const register = async (userData) => {
    try {
      const response = await api.post("/users", { user: userData });
      return response.data; // Retorna os dados do usuário registrado
    } catch (error) {
      throw error;
    }
  };

  // Função para deletar a conta do usuário
  const deleteUser = async (password) => {
    try {
      await api.delete(`/users/${user.id}`); // Exclui o usuário pelo ID
      await signOut(); // Faz logout após a exclusão
    } catch (error) {
      throw error;
    }
  };

  // Função para atualizar dados do usuário
  const updateUser = async (userData) => {
    try {
      const response = await api.updateUser(userData); // Atualiza os dados do usuário
      setUser(response); // Atualiza o estado do usuário
      await AsyncStorage.setItem("user", JSON.stringify(response)); // Armazena novos dados no AsyncStorage
      return response; 
    } catch (error) {
      console.error("Error updating user:", error);
      if (error.response && error.response.status === 422) {
        throw error.response.data;
      }
      throw error;
    }
  };

  // Função para buscar um usuário por login
  const searchUser = async (login) => {
    try {
      const response = await api.get(`/users/${login}`); // Busca usuário pelo login
      return response.data; // Retorna os dados do usuário
    } catch (error) {
      throw error;
    }
  };

  // Função para seguir outro usuário
  const followUser = async (login) => {
    try {
      const response = await api.post(`/users/${login}/followers`);
      return response.data; // Retorna o status da operação de seguir
    } catch (error) {
      throw error;
    }
  };

  const unfollowUser = async (login, followerId) => {
    try {
      await api.delete(`/users/${login}/followers/${followerId}`);
    } catch (error) {
      throw error;
    }
  };

  // Função para obter seguidores de um usuário
  const getFollowers = async (login) => {
    try {
      const response = await api.get(`/users/${login}/followers`); // Busca seguidores do usuário
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // Função para obter detalhes de um usuário
  const getUserDetails = async (login) => {
    try {
      const response = await api.get(`/users/${login}`); // Obtém detalhes do usuário
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  // O contexto de autenticação expõe todas as funções e estados necessários
  return (
    <AuthContext.Provider
      value={{
        signed: !!user, // Verifica se há usuário logado
        user, // Dados do usuário atual
        loading, // Indica se os dados estão carregando
        signIn, // Função de login
        signOut, // Função de logout
        register, // Função de registro
        updateUser, // Função de atualização do usuário
        deleteUser, // Função de exclusão de usuário
        searchUser, // Função de busca de usuário
        followUser, // Função para seguir usuário
        unfollowUser, // Função para deixar de seguir
        getFollowers, // Função para obter seguidores
        getUserDetails, // Função para obter detalhes do usuário
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook customizado para usar o contexto de autenticação
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
