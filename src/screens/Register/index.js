import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import { useAuth } from "../../contexts/AuthContext";
import TextInputField from "../../structure/inputStructure";
import styled from "styled-components/native";

const Register = () => {
  const navigation = useNavigation();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !login || !password || !confirmPassword) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      await register({
        name,
        login,
        password,
        password_confirmation: confirmPassword,
      });
      Alert.alert(
        "Registro concluído",
        "Cadastro foi realizado com sucesso!"
      );
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erro no registro:", error);
      Alert.alert("Erro", "Falha no registro. Por favor, tente novamente.");
    }
  };

  return (
    <MainContainer>
      <LogoContainer>
        <LogoText>Cadastramento!</LogoText>
      </LogoContainer>

      <FormContainer>
        <ScrollView>
          <TextInputField
            label="Nome:"
            placeholder="Digite aqui seu nome"
            value={name}
            onChangeText={setName}
          />
          <TextInputField
            label="Username:"
            placeholder="Digite aqui seu username"
            value={login}
            onChangeText={setLogin}
          />
          <TextInputField
            label="Senha:"
            placeholder="Defina sua senha"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TextInputField
            label="Confirme sua senha:"
            placeholder="Confirme sua senha"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={handleRegister}>
            <ActionButton>
              <ActionButtonText>Cadastrar</ActionButtonText>
            </ActionButton>
          </TouchableOpacity>
        </ScrollView>
      </FormContainer>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Info>Se já tem uma conta, clique aqui e fccaça o login</Info>
      </TouchableOpacity>
    </MainContainer>
  );
};

export default Register;

// Estilos adaptados
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
  color: #00ff00; 
  text-align: center; 
`;

const FormContainer = styled.View`
  flex: 1;
  background-color: #1c1c1c; 
  padding: 20px;
  border-radius: 25px;
  align-items: center; 
  elevation: 5; 
`;

const Info = styled.Text`
  font-size: 12px;
  color: #eb5757; 
  text-align: center;
  margin-top: 10px;
`;

const ActionButton = styled.View`
  background-color: #00b300; 
  padding-vertical: 14px;
  padding-horizontal: 20px; 
  border-radius: 25px;
  width: 100%; 
  align-self: center;
  align-items: center;
  padding: 10px;
  margin-top: 30px; 
`;

const ActionButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;
