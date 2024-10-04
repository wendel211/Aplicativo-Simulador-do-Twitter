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

  const getPosts = async (page = 1, feed = 0) => {
    try {
      const response = await api.get(`/posts?page=${page}&feed=${feed}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  };

  const getOnePosts = async (page = 1, feed = 0, postId = null) => {
    try {
      const endpoint = postId ? `/posts/${postId}` : `/posts?page=${page}&feed=${feed}`;
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  };
  

  const createPost = async (message) => {
    try {
      const response = await api.post("/posts", { post: { message } });
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  };

  const likePost = async (postId) => {
    try {
      const response = await api.post(`/posts/${postId}/likes`);
      return response.data;
    } catch (error) {
      console.error("Error liking post:", error);
      throw error;
    }
  };

  const unlikePost = async (postId) => {
    try {
      await api.delete(`/posts/${postId}/likes/1`);
    } catch (error) {
      console.error("Error unliking post:", error);
      throw error;
    }
  };

  const commentPost = async (postId, message) => {
    try {
      const response = await api.post(`/posts/${postId}/replies`, { reply: { message } });
      return response.data;
    } catch (error) {
      console.error("Error commenting on post:", error);
      throw error;
    }
  };
  const SearchPost = async (searchQuery) => {
    try {
      const response = await api.get(`/posts?search=${searchQuery}`);
      return response.data;
    } catch (error) {
      console.error("Error searching post:", error);
      throw error;
    }
  }



  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        signIn,
        signOut,
        register,
        getPosts,
        getOnePosts,
        createPost,
        likePost,
        unlikePost,
        commentPost,
        SearchPost,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}