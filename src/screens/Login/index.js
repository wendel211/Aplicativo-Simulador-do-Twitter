import React, { useState } from "react"
import { TouchableOpacity, Alert, ActivityIndicator } from "react-native"
import TextInputField from "../../structure/inputStructure"
import { useNavigation } from "@react-navigation/native"
import { useAuth } from "../../contexts/AuthContext"
import styled from "styled-components/native"

const Login = () => {

  const navigation = useNavigation();

  const {signIn} = useAuth();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {

    if (!login || !password) {

      return Alert.alert("Erro", "Por favor, preencha todos os campos.");

    }

    setIsLoading(true);

    try {

      await signIn(login, password);
      
      Alert.alert("Sucesso", "Login efetuado com sucesso");

    } catch (error) {

      Alert.alert(
        "Erro",

        "Falha no login. Por favor, verifique suas credenciais e tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainContainer>
      <LogoContainer>
        <LogoText>Bem-vindo(a)</LogoText>
      </LogoContainer>

      <FormContainer>
        <FormTitle>Faça seu login</FormTitle>
        <TextInputField
          label="Login:"
          placeholder="Digite aqui seu usuário/apelido"
          value={login}
          onChangeText={setLogin}
          autoCapitalize="none"
        />
        <TextInputField
          label="Senha:"
          placeholder="Entre com a sua senha"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity onPress={handleSignIn} disabled={isLoading}>
          <ActionButton>
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <ActionButtonText>Acessar</ActionButtonText>
            )}
          </ActionButton>
        </TouchableOpacity>
      </FormContainer>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Info>Caso não possua cadastro, clique aqui</Info>
      </TouchableOpacity>
    </MainContainer>
  )
}

const MainContainer = styled.View`
  flex: 1;
  background-color: #121212;
  padding: 20px; 
`

const LogoContainer = styled.View`
  width: 100%;
  height: 80px;
  justify-content: center;
  align-items: center;
  background-color: #2e2e2e; 
  border-radius: 15px; 
  margin-bottom: 20px; 
`

const LogoText = styled.Text`
  font-size: 28px; 
  font-weight: bold;
  color: #00ff00; /* Verde */
  text-align: center; 
`

const FormContainer = styled.View`
  flex: 1;
  background-color: #1c1c1c; 
  padding: 20px;
  border-radius: 25px;
  align-items: center; 
  elevation: 5; 

`

const FormTitle = styled.Text`
  font-size: 22px;
  color: #ffffff;
  margin-bottom: 20px;
  font-weight: bold;
  text-align: center; 
`

const Info = styled.Text`
  font-size: 12px;
  color: #eb5757; /* Vermelho */
  text-align: center;
  margin-top: 10px;
`

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
`

const ActionButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`
export default Login;