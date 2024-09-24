import React from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import papacapim from "../../assets/papacapim.png"; 

const FirstFront = () => {
  const navigation = useNavigation();

  return (
    <MainContainer>
      <LogoContainer>
        <LogoImage source={papacapim} resizeMode="contain" />
        <LogoText>Bem-vindo ao Papacapim, a melhor rede social que existe!</LogoText>
      </LogoContainer>
      <FormContainer>
        <FormTitle>Já tem uma conta?</FormTitle>
        <ActionButton onPress={() => navigation.navigate("Login")}>
          <ActionButtonText>Entre agora</ActionButtonText>
        </ActionButton>
      </FormContainer>
    </MainContainer>
  );
};

export default FirstFront;

const MainContainer = styled.View`
  flex: 1;
  background-color: #121212; /* Preto */
  padding: 20px; 
`;

const LogoContainer = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
  background-color: #2e2e2e; 
  border-radius: 15px; 
  padding: 20px; 
  margin-bottom: 20px; 
`;

const LogoImage = styled.Image`
  width: 180px;
  height: 180px;
  margin-bottom: 15px; 
`;

const LogoText = styled.Text`
  font-size: 28px; 
  font-weight: bold;
  color: #00ff00; 
  text-align: center; 
  padding-horizontal: 10px; 
`;

const FormContainer = styled.View`
  flex: 0.8;
  background-color: #1c1c1c;
  padding: 20px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  margin-top: -20px; 
  align-items: center; 
`;

const FormTitle = styled.Text`
  font-size: 22px;
  color: #ffffff;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center; 
`;

const ActionButton = styled.TouchableOpacity`
  background-color: #00b300; 
  padding-vertical: 14px;
  padding-horizontal: 20px; 
  border-radius: 25px;
  width: 100%; 
  align-self: center;
  align-items: center;
`;

const ActionButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;
