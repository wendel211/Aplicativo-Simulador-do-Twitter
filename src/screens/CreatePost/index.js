import React, { useState } from "react"; 
import { Alert } from "react-native";
import styled from "styled-components/native";

export default function NewPost() {
  const [postMessage, setPostMessage] = useState("");

  const handlePublish = () => {
    Alert.alert("Publicado", "Postagem publicada com sucesso.");
    setPostMessage(""); 
  };

  return (
    <MainContainer>
      <LogoContainer>
        <LogoText>Papacapim</LogoText>
      </LogoContainer>

      <FormContainer>
        <FeedTitle>O que você está pensando?</FeedTitle>

        <PostInput
          multiline
          numberOfLines={8}
          placeholder="Digite aqui sua postagem..."
          placeholderTextColor="#999" 
          value={postMessage}
          onChangeText={setPostMessage}
        />

        <Footer>
          <SendButton
            onPress={handlePublish}
            disabled={postMessage.trim().length === 0}
            activeOpacity={postMessage.trim().length > 0 ? 0.8 : 1}
            backgroundColor={postMessage.trim().length > 0 ? "#00b300" : "#9E9E9E"}
          >
            <ButtonText>Enviar</ButtonText>
          </SendButton>
        </Footer>
      </FormContainer>
    </MainContainer>
  );
}

// Estilos
const MainContainer = styled.View`
  flex: 1;
  background-color: #121212;
  padding: 20px;
`;

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
  color: #00ff00; /* Verde */
  text-align: center;
`;

const FeedTitle = styled.Text`
  font-size: 18px; /* Texto menor */
  color: #ffffff;
  margin-bottom: 10px; /* Espaçamento reduzido */
`;

const FormContainer = styled.View`
  flex: 1;
  background-color: #1c1c1c;
  padding: 20px;
  border-radius: 25px;
  align-items: center;
  elevation: 5;
  margin-top: 20px;
`;

const PostInput = styled.TextInput`
  width: 100%;
  padding: 10px;
  background-color: #1c1c1c;
  color: #fff;
  border-radius: 10px;
  border: 1px solid #333;
  text-align-vertical: top;
  margin-bottom: 20px;
`;

const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px; /* Espaçamento extra para afastar do input */
`;

const SendButton = styled.TouchableOpacity`
  padding: 10px 56px; /* Espaçamento interno */
  border-radius: 25px;
  background-color: ${(props) => props.backgroundColor};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  margin-left: auto; /* Move o botão para a direita */
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
