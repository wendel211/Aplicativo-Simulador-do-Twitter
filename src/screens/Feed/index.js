import React, { useState, useEffect } from "react";
import { Alert, ScrollView, TouchableOpacity, TextInput } from "react-native";
import styled from "styled-components/native";
import { useAuth } from "../../contexts/AuthContext";

export default function Feed() {
  const { user, getPosts, createPost, likePost, unlikePost, commentPost } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPostMessage, setNewPostMessage] = useState("");
  const [commentMessages, setCommentMessages] = useState({});
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

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
      Alert.alert("Error", "Falhou ao carregar posts");
    } finally {
      setRefreshing(false);
    }
  }

  async function handleCreatePost() {
    try {
      const newPost = await createPost(newPostMessage);
      setPosts([newPost, ...posts]);
      setNewPostMessage("");
    } catch (error) {
      Alert.alert("Error", "Falhou ao criar post");
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
      Alert.alert("Error", "Falhou ao curtir post");
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
      Alert.alert("Error", "Falhou ao descurtir post");
    }
  }

  async function handleCommentPost(postId) {
    try {
      const message = commentMessages[postId];
      if (!message) return;

      const newComment = await commentPost(postId, message);
      const updatedPosts = posts.map(post =>
        post.id === postId ? { ...post, comments: [...(post.comments || []), newComment] } : post
      );
      setPosts(updatedPosts);
      setCommentMessages({ ...commentMessages, [postId]: "" });
    } catch (error) {
      Alert.alert("Error", "Failed to comment on post");
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
          <TextInput
            placeholder="O que você está pensando?"
            value={newPostMessage}
            onChangeText={setNewPostMessage}
            style={{ color: '#ffffff' }}
          />
          <TouchableOpacity onPress={handleCreatePost}>
            <ActionButtonText>Post</ActionButtonText>
          </TouchableOpacity>
        </NewPostContainer>

        {posts.map((post) => (
          <PostContainer key={post.id}>
            <Username>{post.user_login}</Username>
            <Caption>{post.message}</Caption>
            <LikesText>{post.likes_count || 0} likes</LikesText>
            <TouchableOpacity onPress={() => post.liked ? handleUnlikePost(post.id) : handleLikePost(post.id)}>
              <ActionButtonText>{post.liked ? "Unlike" : "Like"}</ActionButtonText>
            </TouchableOpacity>
            <CommentsContainer>
              {post.comments && post.comments.map((comment) => (
                <CommentText key={comment.id}>
                  <CommentUser>{comment.user_login}: </CommentUser>
                  {comment.message}
                </CommentText>
              ))}
            </CommentsContainer>
            <TextInput
              placeholder="Adicione um comentár..."
              value={commentMessages[post.id] || ""}
              onChangeText={(text) => setCommentMessages({ ...commentMessages, [post.id]: text })}
              style={{ color: '#ffffff' }}
            />
            <TouchableOpacity onPress={() => handleCommentPost(post.id)}>
              <ActionButtonText>Comment</ActionButtonText>
            </TouchableOpacity>
          </PostContainer>
        ))}
      </ScrollView>
    </MainContainer>
  );
}

const MainContainer = styled.View`
  flex: 1;
  background-color: #121212;
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
  background-color: #2e2e2e;
  border-radius: 15px;
  margin-bottom: 20px;
`;

const LogoText = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #00ff00;
  text-align: center;
`;

const NewPostContainer = styled.View`
  background-color: #2e2e2e;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 20px;
`;

const PostContainer = styled.View`
  width: 100%;
  height: auto;
  background-color: #2e2e2e;
  border-radius: 15px;
  padding: 15px;
  margin-bottom: 20px;
`;

const Username = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 10px;
`;

const Caption = styled.Text`
  font-size: 16px;
  color: #ffffff;
  margin-bottom: 10px;
`;

const LikesText = styled.Text`
  font-size: 14px;
  color: #b3b3b3;
  margin-bottom: 5px;
`;

const CommentsContainer = styled.View`
  margin-top: 10px;
`;

const CommentText = styled.Text`
  font-size: 14px;
  color: #ffffff;
  margin-bottom: 5px;
`;

const CommentUser = styled.Text`
  font-weight: bold;
  color: #b3b3b3;
`;

const ActionButtonText = styled.Text`
  color: #00ff00;
  font-size: 16px;
  font-weight: bold;
`;