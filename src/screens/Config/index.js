import { useAuth } from "../../contexts/AuthContext";
import api from "../../services/api";
import styled from "styled-components/native";
import React, { useState, useEffect } from "react";
import {
  Alert,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";

const Configuracoes = () => {
  const { user, signOut } = useAuth();
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");
  const [isModalDeletarVisible, setIsModalDeletarVisible] = useState(false);
  const [isModalSairVisible, setIsModalSairVisible] = useState(false);
  const [isModalSenhaVisible, setIsModalSenhaVisible] = useState(false);
  const [senhaDeletar, setSenhaDeletar] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setNome(user.name || "");
      setLogin(user.login || "");
    }
  }, [user]);

  const atualizarNome = async () => {
    if (!nome.trim()) {
      Alert.alert("Erro", "Informe um nome para atualizar.");
      return;
    }
    setIsLoading(true);
    try {
      await api.patch(`/users/${user.id}`, { user: { name: nome } });
      Alert.alert("Sucesso", "Nome atualizado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o nome.");
    } finally {
      setIsLoading(false);
    }
  };

  const atualizarLogin = async () => {
    if (!login.trim()) {
      Alert.alert("Erro", "Informe um nome de usuário para atualizar.");
      return;
    }
    setIsLoading(true);
    try {
      await api.patch(`/users/${user.id}`, { user: { login } });
      Alert.alert("Sucesso", "Nome de usuário atualizado com sucesso!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar o nome de usuário.");
    } finally {
      setIsLoading(false);
    }
  };

  const atualizarSenha = async () => {
    if (!senhaAtual) {
      Alert.alert("Erro", "Informe sua senha atual.");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }
    setIsLoading(true);
    try {
      await api.patch(`/users/${user.id}`, {
        user: {
          current_password: senhaAtual,
          password: novaSenha,
          password_confirmation: confirmarSenha,
        },
      });
      Alert.alert("Sucesso", "Senha atualizada com sucesso!");
      setNovaSenha("");
      setConfirmarSenha("");
      setSenhaAtual("");
      setIsModalSenhaVisible(false);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar a senha.");
    } finally {
      setIsLoading(false);
    }
  };

  const excluirConta = async () => {
    if (!senhaDeletar) {
      Alert.alert("Erro", "Informe sua senha para confirmar a exclusão.");
      return;
    }
    setIsLoading(true);
    try {
      await api.delete(`/users/${user.id}`, { data: { password: senhaDeletar } });
      signOut();
      Alert.alert("Sucesso", "Sua conta foi excluída com sucesso.");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir a conta.");
    } finally {
      setIsLoading(false);
      setIsModalDeletarVisible(false);
    }
  };

  const fazerLogout = () => {
    signOut();
    setIsModalSairVisible(false);
  };

  const abrirModalSenha = () => {
    if (!novaSenha || !confirmarSenha) {
      Alert.alert("Erro", "Informe a nova senha e a confirmação.");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }
    setIsModalSenhaVisible(true);
  };

  return (
    <ScrollView contentContainerStyle={scrollViewStyle}>
      <MainContainer>
        <Cabecalho>Configurações</Cabecalho>

        <FormContainer>
          <FormTitle>Atualizar Nome</FormTitle>
          <RótuloEntrada>Nome social:</RótuloEntrada>
          <EntradaTextoStyled
            value={nome}
            onChangeText={setNome}
            placeholder="Digite como deseja ser chamado.."
          />
          <ActionButton onPress={atualizarNome} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <ActionButtonText>Atualizar Nome</ActionButtonText>
            )}
          </ActionButton>

          <Divisor />

          <FormTitle>Atualizar Apelido</FormTitle>
          <RótuloEntrada>Nome de usuário:</RótuloEntrada>
          <EntradaTextoStyled
            value={login}
            onChangeText={setLogin}
            placeholder="Digite o novo login..."
          />
          <ActionButton onPress={atualizarLogin} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <ActionButtonText>Atualizar Nome de Usuário</ActionButtonText>
            )}
          </ActionButton>

          <Divisor />

          <FormTitle>Atualizar Senha</FormTitle>
          <RótuloEntrada>Nova senha:</RótuloEntrada>
          <EntradaTextoStyled
            value={novaSenha}
            onChangeText={setNovaSenha}
            secureTextEntry
            placeholder="Digite a nova senha"
          />
          <RótuloEntrada>Confirmar nova senha:</RótuloEntrada>
          <EntradaTextoStyled
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            secureTextEntry
            placeholder="Confirme a nova senha"
          />
          <ActionButton bgColor="#ff6600" onPress={abrirModalSenha} disabled={isLoading}>
            <ActionButtonText>Atualizar Senha</ActionButtonText>
          </ActionButton>

          <Divisor />

          <ActionButton bgColor="#b30000" onPress={() => setIsModalDeletarVisible(true)}>
            <ActionButtonText>Excluir Conta</ActionButtonText>
          </ActionButton>
          <ActionButton bgColor="#808080" onPress={() => setIsModalSairVisible(true)}>
            <ActionButtonText>Sair</ActionButtonText>
          </ActionButton>
        </FormContainer>
      </MainContainer>

      {/* Modal para confirmação de exclusão */}
      <Modal visible={isModalDeletarVisible} transparent>
        <ContainerModal>
          <ConteudoModal>
            <TextoModal>
              Digite sua senha para confirmar a exclusão da conta:
            </TextoModal>
            <EntradaTextoModal
              secureTextEntry
              value={senhaDeletar}
              onChangeText={setSenhaDeletar}
              placeholder="Digite sua senha"
            />
            <ActionButton bgColor="#b30000" onPress={excluirConta} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <ActionButtonText>Excluir conta</ActionButtonText>
              )}
            </ActionButton>
            <ActionButton onPress={() => setIsModalDeletarVisible(false)}>
              <ActionButtonText>Cancelar</ActionButtonText>
            </ActionButton>
          </ConteudoModal>
        </ContainerModal>
      </Modal>

      {/* Modal para confirmação de logout */}
      <Modal visible={isModalSairVisible} transparent>
        <ContainerModal>
          <ConteudoModal>
            <TextoModal>Tem certeza de que deseja sair?</TextoModal>
            <ActionButton bgColor="#808080" onPress={fazerLogout}>
              <ActionButtonText>Sim</ActionButtonText>
            </ActionButton>
            <ActionButton onPress={() => setIsModalSairVisible(false)}>
              <ActionButtonText>Cancelar</ActionButtonText>
            </ActionButton>
          </ConteudoModal>
        </ContainerModal>
      </Modal>

      {/* Modal para atualização de senha */}
      <Modal visible={isModalSenhaVisible} transparent>
        <ContainerModal>
          <ConteudoModal>
            <TextoModal>
              Digite sua senha atual para confirmar a atualização:
            </TextoModal>
            <EntradaTextoModal
              secureTextEntry
              value={senhaAtual}
              onChangeText={setSenhaAtual}
              placeholder="Digite sua senha atual"
            />
            <ActionButton bgColor="#ff6600" onPress={atualizarSenha} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <ActionButtonText>Atualizar Senha</ActionButtonText>
              )}
            </ActionButton>
            <ActionButton onPress={() => setIsModalSenhaVisible(false)}>
              <ActionButtonText>Cancelar</ActionButtonText>
            </ActionButton>
          </ConteudoModal>
        </ContainerModal>
      </Modal>
    </ScrollView>
  );
};

export default Configuracoes;

// Estilos
const MainContainer = styled.View`
  flex: 1;
  background-color: #121212;
  padding: 20px;
`;

const scrollViewStyle = {
  flexGrow: 1,
  justifyContent: "flex-start",
  alignItems: "stretch",
};

const Cabecalho = styled.Text`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #ffffff;
  text-align: center;
`;

const FormContainer = styled.View`
  flex: 1;
  background-color: #1c1c1c;
  padding: 30px;
  border-radius: 20px;
  elevation: 5;
`;

const FormTitle = styled.Text`
  font-size: 20px;
  color: #ffffff;
  margin-bottom: 15px;
  font-weight: bold;
  text-align: center;
`;

const Divisor = styled.View`
  height: 1px;
  background-color: #dddddd;
  margin: 15px 0;
`;

const RótuloEntrada = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #ffffff;
  margin-top: 10px;
`;

const EntradaTextoStyled = styled.TextInput`
  height: 45px;
  border-color: #dddddd;
  border-width: 1px;
  border-radius: 8px;
  padding: 10px;
  background-color: #ffffff;
  font-size: 14px;
  color: #333333;
  margin-top: 10px;
`;

const ContainerModal = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ConteudoModal = styled.View`
  width: 90%;
  padding: 20px;
  background-color: #1c1c1c;
  border-radius: 10px;
`;

const TextoModal = styled.Text`
  font-size: 16px;
  color: #ffffff;
  margin-bottom: 10px;
`;

const EntradaTextoModal = styled.TextInput`
  height: 45px;
  border-color: #dddddd;
  border-width: 1px;
  border-radius: 8px;
  padding: 10px;
  background-color: #ffffff;
  font-size: 14px;
  color: #333333;
  margin-bottom: 15px;
`;

const ActionButton = styled.TouchableOpacity`
  height: 50px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgColor || "#00b300"};
  padding: 10px;
  margin-top: 15px;
  width: 100%;
`;

const ActionButtonText = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
`;
