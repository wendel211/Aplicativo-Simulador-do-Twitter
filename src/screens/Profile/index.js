import React, { useState, useEffect } from "react";  
import { Alert, TouchableOpacity } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";
import styled from "styled-components/native";

export default function Profile({ route }) {
  const { user } = useAuth();
  const [profileUser, setProfileUser] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);  
  const [followerId, setFollowerId] = useState(null);

  const login = route.params?.login || user.login;
  const isOwnProfile = login === user.login;

  useEffect(() => {
    loadUser();
    if (!isOwnProfile) {
      checkFollowing();
    }
  }, [login]);

  const loadUser = async () => {
    try {
      const response = await api.get(`/users/${login}`);
      setProfileUser(response.data);
    } catch (error) {
      console.error("Erro ao carregar o usuário:", error);
      Alert.alert("Erro", "Não foi possível carregar o perfil do usuário.");
    }
  };

  const checkFollowing = async () => {
    try {
      const response = await api.get(`/users/${login}/followers`);
      const followerRelation = response.data.find(
        (follower) => follower.login === user.login
      );
      setIsFollowing(!!followerRelation);
      if (followerRelation) {
        setFollowerId(followerRelation.id);
      }
    } catch (error) {
      console.error("Erro ao verificar o status de seguir:", error);
    }
  };

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await api.delete(`/users/${login}/followers/${followerId}`);
        setIsFollowing(false);
        setFollowerId(null);
        Alert.alert("Sucesso", "Você deixou de seguir este usuário.");
      } else {
        const response = await api.post(`/users/${login}/followers`);
        setIsFollowing(true);
        setFollowerId(response.data.id);
        Alert.alert("Sucesso", "Você está seguindo este usuário.");
      }
    } catch (error) {
      console.error("Erro ao seguir/deixar de seguir o usuário:", error);
      Alert.alert("Erro", "Não foi possível realizar a ação. Tente novamente.");
    }
  };

  if (!profileUser) {
    return (
      <LoadingContainer>
        <LoadingText>Carregando...</LoadingText>
      </LoadingContainer>
    );
  }

  return (
    <ProfileContainer>
      <Title>{profileUser.name}</Title>
      <Subtitle>@{profileUser.login}</Subtitle>
      <InfoText>
        Usuário desde: {new Date(profileUser.created_at).toLocaleDateString()}
      </InfoText>

      {!isOwnProfile && (
        <FollowButton onPress={handleFollow}>
          <FollowButtonText>
            {isFollowing ? "Deixar de Seguir" : "Seguir"}
          </FollowButtonText>
        </FollowButton>
      )}
    </ProfileContainer>
  );
}

const ProfileContainer = styled.View`
  flex: 1;
  background-color: #1c1c1c; /* Cor de fundo do perfil */
  padding: 20px; 
  border-radius: 25px;
  elevation: 5;
`;

const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #1c1c1c; /* Cor de fundo durante o carregamento */
`;

const LoadingText = styled.Text`
  color: #ffffff;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #00ff00; /* Verde */
`;

const Subtitle = styled.Text`
  font-size: 18px;
  color: #ffffff; /* Texto branco para melhor legibilidade */
  margin-bottom: 20px;
`;

const InfoText = styled.Text`
  font-size: 16px;
  color: #777;
  margin-bottom: 30px;
`;

const FollowButton = styled.TouchableOpacity`
  background-color: #00b300; /* Verde */
  padding-vertical: 14px;
  border-radius: 25px;
  width: 100%; 
  align-items: center;
`;

const FollowButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;
