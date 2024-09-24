import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";

export const AuthContext = createContext({});

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


  const signIn = async (login, password) => {
    try {
      const response = await api.post("/sessions", { login, password });
      setUser(response.data);
      api.defaults.headers["x-session-token"] = response.data.token;
      await AsyncStorage.setItem("user", JSON.stringify(response.data));
      await AsyncStorage.setItem("token", response.data.token);
    } catch (error) {
      throw error;
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    setUser(null);
  };

  const register = async (userData) => {
    try {
      const response = await api.post("/users", { user: userData });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const updateUser = async (userData) => {
    try {
      const response = await api.updateUser(userData);
      setUser(response);
      await AsyncStorage.setItem("user", JSON.stringify(response));
      return response;
    } catch (error) {
      console.error("Error updating user:", error);
      if (error.response && error.response.status === 422) {
        throw error.response.data;
      }
      throw error;
    }
  };

  const deleteUser = async (password) => {
    try {
      await api.delete(`/users/${user.id}`);
      await signOut();
    } catch (error) {
      throw error;
    }
  };

  const searchUser = async (login) => {
    try {
      const response = await api.get(`/users/${login}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const followUser = async (login) => {
    try {
      const response = await api.post(`/users/${login}/followers`);
      return response.data;
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

  const getFollowers = async (login) => {
    try {
      const response = await api.get(`/users/${login}/followers`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getUserDetails = async (login) => {
    try {
      const response = await api.get(`/users/${login}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn,
        signOut,
        register,
        updateUser,
        deleteUser,
        searchUser,
        followUser,
        unfollowUser,
        getFollowers,
        getUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
