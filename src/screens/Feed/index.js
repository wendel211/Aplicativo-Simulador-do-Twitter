import React, { useState, useEffect } from "react";
import { Alert, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { useAuth } from "../../contexts/AuthContext";
import { Ionicons } from '@expo/vector-icons';

export default function Feed() {
  const { user, getPosts, createPost, likePost, unlikePost, commentPost } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPostMessage, setNewPostMessage] = useState("");
  const [commentMessages, setCommentMessages] = useState({});
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts(refresh = false) {
    try {
      setRefreshing(true);
      const newPage = refresh ? 1 : page;
      const fetchedPosts = await getPosts(newPage);
      setPosts(refresh ? fetchedPosts : [...posts, ...fetchedPosts]);
      setPage(newPage + 1);
    } catch (error) {
      Alert.alert("Error", "Falhou ao carregar os posts");
    } finally {
      setRefreshing(false);
    }
  }

  async function handleCreatePost() {
    if (!newPostMessage.trim()) return;
    try {
      setLoading(true);
      const newPost = await createPost(newPostMessage);
      setPosts([newPost, ...posts]);
      setNewPostMessage("");
    } catch (error) {
      Alert.alert("Error", "Falhou ao criar o post");
    } finally {
      setLoading(false);
    }
  }

  async function handleLikePost(postId) {
    try {
      await likePost(postId);
      const updatedPosts = posts.map(post =>
        post.id === postId ? { ...post, liked: true, likes_count: (post.likes_count || 0) + 1 } : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      Alert.alert("Error", "Falhou ao curtir o post");
    }
  }

  async function handleUnlikePost(postId) {
    try {
      await unlikePost(postId);
      const updatedPosts = posts.map(post =>
        post.id === postId ? { ...post, liked: false, likes_count: Math.max((post.likes_count || 0) - 1, 0) } : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      Alert.alert("Error", "Failed to unlike post");
    }
  }

  async function handleCommentPost(postId) {
    const message = commentMessages[postId];
    if (!message?.trim()) return;

    try {
      setLoading(true);
      const newComment = await commentPost(postId, message);
      const updatedPosts = posts.map(post =>
        post.id === postId ? { ...post, comments: [...(post.comments || []), newComment] } : post
      );
      setPosts(updatedPosts);
      setCommentMessages({ ...commentMessages, [postId]: "" });
    } catch (error) {
      Alert.alert("Error", "Falhou ao comentar no post");
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainContainer>
      <ScrollView
        contentContainerStyle={scrollViewStyle}
        onRefresh={() => loadPosts(true)}
        refreshing={refreshing}
        onEndReached={() => loadPosts()}
        onEndReachedThreshold={0.1}
      >
        <LogoContainer>
          <LogoText>Papacapim</LogoText>
        </LogoContainer>

        <NewPostContainer>
          <StyledTextInput
            placeholder="Diga o que estar pensando..."
            value={newPostMessage}
            onChangeText={setNewPostMessage}
            multiline
          />
          <PostButton onPress={handleCreatePost} disabled={loading}>
            {loading ? <ActivityIndicator color="#FFFFFF" /> : <PostButtonText>Post</PostButtonText>}
          </PostButton>
        </NewPostContainer>

        {posts.map((post) => (
          <PostContainer key={post.id}>
            <Username>{post.user_login}</Username>
            <Caption>{post.message}</Caption>
            <LikesText>{post.likes_count || 0} likes</LikesText>
            <ActionContainer>
              <LikeButton onPress={() => post.liked ? handleUnlikePost(post.id) : handleLikePost(post.id)}>
                <Ionicons name={post.liked ? "heart" : "heart-outline"} size={24} color={post.liked ? "#FF6B6B" : "#FFFFFF"} />
              </LikeButton>
              <ActionButtonText>{post.liked ? "Unlike" : "Like"}</ActionButtonText>
            </ActionContainer>
            <CommentsContainer>
              {post.comments && post.comments.map((comment) => (
                <CommentText key={comment.id}>
                  <CommentUser>{comment.user_login}: </CommentUser>
                  {comment.message}
                </CommentText>
              ))}
            </CommentsContainer>
            <StyledTextInput
              placeholder="Adicione um coment..."
              value={commentMessages[post.id] || ""}
              onChangeText={(text) => setCommentMessages({ ...commentMessages, [post.id]: text })}
            />
            <CommentButton onPress={() => handleCommentPost(post.id)} disabled={loading}>
              {loading ? <ActivityIndicator color="#FFFFFF" /> : <ActionButtonText>Comente aqui</ActionButtonText>}
            </CommentButton>
          </PostContainer>
        ))}
      </ScrollView>
    </MainContainer>
  );
}

const MainContainer = styled.View`
  flex: 1;
  background-color: #1E1E1E;
  padding: 20px;
`;

const scrollViewStyle = {
  flexGrow: 1,
};

const LogoContainer = styled.View`
  width: 100%;
  height: 80px;
  justify-content: center;
  align-items: center;
  background-color: #2C2C2C;
  border-radius: 15px;
  margin-bottom: 20px;
`;

const LogoText = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #4CAF50;
  text-align: center;
`;

const NewPostContainer = styled.View`
  background-color: #2C2C2C;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 20px;
`;

const PostContainer = styled.View`
  width: 100%;
  background-color: #2C2C2C;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 20px;
`;

const Username = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #FFFFFF;
  margin-bottom: 10px;
`;

const Caption = styled.Text`
  font-size: 16px;
  color: #FFFFFF;
  margin-bottom: 10px;
`;

const LikesText = styled.Text`
  font-size: 14px;
  color: #B3B3B3;
  margin-bottom: 5px;
`;

const ActionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const LikeButton = styled.TouchableOpacity`
  margin-right: 10px;
`;

const CommentsContainer = styled.View`
  margin-top: 10px;
`;

const CommentText = styled.Text`
  font-size: 14px;
  color: #FFFFFF;
  margin-bottom: 5px;
`;

const CommentUser = styled.Text`
  font-weight: bold;
  color: #B3B3B3;
`;

const ActionButtonText = styled.Text`
  color: #4CAF50;
  font-size: 16px;
  font-weight: bold;
`;

const StyledTextInput = styled.TextInput`
  background-color: #3C3C3C;
  border-radius: 10px;
  padding: 10px;
  color: #FFFFFF;
  margin-bottom: 10px;
`;

const PostButton = styled.TouchableOpacity`
  background-color: #4CAF50;
  border-radius: 10px;
  padding: 10px;
  align-items: center;
`;

const PostButtonText = styled.Text`
  color: #FFFFFF;
  font-size: 16px;
  font-weight: bold;
`;

const CommentButton = styled.TouchableOpacity`
  background-color: #3C3C3C;
  border-radius: 10px;
  padding: 10px;
  align-items: center;
`;