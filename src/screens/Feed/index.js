import React, { useState } from "react";
import { Alert, ScrollView, TouchableOpacity, Image } from "react-native";
import styled from "styled-components/native";

const feedData = [
  {
    id: 1,
    usuario: "usuario123",
    imagemUrl: "https://picsum.photos/400/300",
    legenda: "Dia lindo na praia! 🌊☀️",
    curtidas: 156,
    comentarios: [
      { usuario: "amanteDaPraia", texto: "Parece incrível! Gostaria de estar lá." },
      { usuario: "viajante", texto: "Qual praia é essa?" },
    ],
  },
  {
    id: 2,
    usuario: "galDaComida",
    imagemUrl: "https://picsum.photos/400/300",
    legenda: "Deliciosa massa caseira para o jantar 🍝👨‍🍳",
    curtidas: 89,
    comentarios: [
      { usuario: "fãDeMassa", texto: "Receita, por favor!" },
      { usuario: "comedorSaudavel", texto: "Parece delicioso e nutritivo!" },
    ],
  },
  {
    id: 3,
    usuario: "geekDaTecnologia",
    imagemUrl: "https://picsum.photos/400/300",
    legenda: "Novo smartphone chegou! 📱🚀",
    curtidas: 203,
    comentarios: [
      { usuario: "GokuMaisBrabo", texto: "Vale a pena a expectativa?" },
      { usuario: "oldSchool", texto: "Queria comprar esse ceular, vc ta gostando?" },
    ],
  },
];

export default function Feed() {
  const [posts, setPosts] = useState(feedData || []); 

  const handleRefresh = () => {
    const novoPost = {
      id: posts.length + 1,
      usuario: "novoUsuario" + (posts.length + 1),
      imagemUrl: "https://picsum.photos/400/300",
      legenda: "Novo post adicionado! " + new Date().toLocaleString(),
      curtidas: Math.floor(Math.random() * 100),
      comentarios: [
        { usuario: "usuarioAleatorio", texto: "Ótimo novo post!" },
        { usuario: "entusiasta", texto: "Continue postando!" },
      ],
    };

    setPosts([novoPost, ...posts]);
    Alert.alert("Sucesso", "Feed atualizado com sucesso!");
  };

  return (
    <MainContainer>
      <LogoContainer>
        <LogoText>Seu Feed</LogoText>
      </LogoContainer>

      <ScrollView contentContainerStyle={scrollViewStyle}>
        <FeedTitle>Feed de Posts</FeedTitle>
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostContainer key={post.id}>
              <Username>{post.usuario}</Username>
              <PostImage source={{ uri: post.imagemUrl }} />
              <Caption>{post.legenda}</Caption>
              <LikesText>❤️ {post.curtidas} curtidas</LikesText>
              <CommentsContainer>
                {post.comentarios.map((comentario, index) => (
                  <CommentText key={index}>
                    <CommentUser>{comentario.usuario}:</CommentUser> {comentario.texto}
                  </CommentText>
                ))}
              </CommentsContainer>
            </PostContainer>
          ))
        ) : (
          <Caption>Sem posts para exibir.</Caption>
        )}
      </ScrollView>

      <FormContainer>
        <FormTitle>Carregar novos posts?</FormTitle>
        <Footer>
          <TouchableOpacity onPress={handleRefresh}>
            <ActionButton>
              <ActionButtonText>(Atualizar Feed)</ActionButtonText>
            </ActionButton>
          </TouchableOpacity>
        </Footer>
      </FormContainer>
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
  alignItems: "center",
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

const FeedTitle = styled.Text`
  font-size: 24px;
  color: #ffffff;
  margin-bottom: 20px;
`;

const PostContainer = styled.View`
  width: 100%;
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

const PostImage = styled.Image`
  width: 100%;
  height: 200px;
  border-radius: 10px;
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

const FormContainer = styled.View`
  background-color: #1c1c1c;
  padding: 20px;
  border-radius: 25px;
  align-items: center;
  elevation: 5;
  margin-top: 20px;
`;

const FormTitle = styled.Text`
  font-size: 22px;
  color: #ffffff;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ActionButton = styled.View`
  background-color: #00b300;
  padding: 14px 20px;
  border-radius: 25px;
  width: 100%;
  align-items: center;
`;

const ActionButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;
