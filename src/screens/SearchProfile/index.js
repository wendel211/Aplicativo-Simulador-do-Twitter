
import { Feather } from "@expo/vector-icons";
import { Modal,FlatList,ActivityIndicator,StyleSheet,Text,View,TextInput,TouchableOpacity,ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import React, { useState, useEffect } from "react";

export default function SearchUser() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerId, setFollowerId] = useState(null);
  const [followerCount, setFollowerCount] = useState(0);
  const [followers, setFollowers] = useState([]);
  const [isLoadingFollowers, setIsLoadingFollowers] = useState(false);
  const [followersModalVisible, setFollowersModalVisible] = useState(false);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    if (userData) {
      checkFollowing(userData.login);
      fetchFollowerCount(userData.login);
    }
  }, [userData]);

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      Alert.alert("Atenção", "Digite um apelido para pesquisar.");
      return;
    }

    try {
      const response = await api.get(`/users/${searchQuery}`);
      const userData = response.data;
      if (userData) {
        setUserData(userData);
      } else {
        Alert.alert(
          "Erro",
          "Usuário não encontrado. Não existe um usuário com este apelido."
        );
      }
    } catch (error) {
      console.error("Erro ao pesquisar o usuário:", error);
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao processar sua solicita o. Tente novamente mais tarde."
      );
    }
  };

  const checkFollowing = async (login) => {
    try {
      const storedStatus = await AsyncStorage.getItem(`following_${login}`);
      const isFollowingUser =
        storedStatus !== null ? JSON.parse(storedStatus) : false;

      if (isFollowingUser) {
        setIsFollowing(true);
        return;
      }

      const response = await api.get(`/users/${login}/followers`);
      const followers = response.data || [];
      const follower = followers.find(
        (followerItem) => followerItem?.follower_login === currentUser?.login
      );

      setIsFollowing(!!follower);
      setFollowerId(follower?.id || null);
      await AsyncStorage.setItem(
        `following_${login}`,
        JSON.stringify(!!follower)
      );
    } catch (error) {
      console.error("Erro ao verificar o status de seguir:", error);
      setIsFollowing(false);
      setFollowerId(null);
    }
  };

  const fetchFollowerCount = async (login) => {
    try {
      const response = await api.get(`/users/${login}/followers`);
      const followers = response.data || [];
      setFollowerCount(followers.length);
    } catch (error) {
      console.error("Erro ao buscar contagem de seguidores:", error);
      setFollowerCount(0);
    }
  };
  const handleFollow = async () => {
    if (isFollowing) {
      await unfollowUser();
    } else {
      await followUser();
    }
  };

  const followUser = async () => {
    try {
      const response = await api.post(`/users/${userData.login}/followers`);
      setIsFollowing(true);
      setFollowerId(response.data.id);
      await AsyncStorage.setItem(
        `following_${userData.login}`,
        JSON.stringify(true)
      );
      Alert.alert("Sucesso", "Você está seguindo o usuário");
      fetchFollowerCount(userData.login);
    } catch (error) {
      handleFollowError(error);
    }
  };

  const unfollowUser = async () => {
    try {
      await api.delete(`/users/${userData.login}/followers/${followerId}`);
      setIsFollowing(false);
      setFollowerId(null);
      await AsyncStorage.setItem(
        `following_${userData.login}`,
        JSON.stringify(false)
      );
      Alert.alert("Sucesso", "Você deixou de seguir o usuário");
      fetchFollowerCount(userData.login);
    } catch (error) {
      handleFollowError(error);
    }
  };

  const handleFollowError = (error) => {
    console.error("Erro ao seguir/deixar de seguir o usuário:", error);
    if (error.response && error.response.status === 422) {
      const action = isFollowing ? "deixar de seguir" : "seguir";
      Alert.alert(
        "Erro",
        `Você já ${
          action === "seguir" ? "está seguindo" : "não está seguindo"
        } este usuário.`
      );
    } else {
      Alert.alert("Erro", "Ocorreu um erro ao processar sua solicitação.");
    }
    checkFollowing(userData.login);
  };
  const handleOpenProfile = () => {
    if (userData) {
      setModalVisible(true);
    }
  };

  const fetchFollowers = async (login) => {
    setIsLoadingFollowers(true);
    try {
      const response = await api.get(`/users/${login}/followers`);
      console.log("Dados de seguidores:", response.data);
      const followersData = response.data;
      const detailedFollowers = await Promise.all(
        followersData.map(async (follower) => {
          try {
            const userResponse = await api.get(
              `/users/${follower.follower_login}`
            );
            return {
              ...follower,
              name: userResponse.data.name,
            };
          } catch (error) {
            console.error(
              `Erro ao buscar detalhes do usuário ${follower.follower_login}:`,
              error
            );
            return {
              ...follower,
              name: "Nome não disponível",
            };
          }
        })
      );

      setFollowers(detailedFollowers);
    } catch (error) {
      console.error("Erro ao buscar seguidores:", error);
      Alert.alert("Erro", "Não foi possível carregar os seguidores.");
      setFollowers([]);
    } finally {
      setIsLoadingFollowers(false);
    }
  };

  const handleOpenFollowersModal = () => {
    if (userData) {
      setFollowersModalVisible(true);
      fetchFollowers(userData.login);
    }
  };
  const renderFollowerItem = ({ item }) => (
    <View style={styles.followerItem}>
      <Feather
        name="user"
        size={24}
        color="#2F80ED"
        style={styles.followerIcon}
      />
      <View style={styles.followerInfo}>
        <Text style={styles.followerName}>{item.name}</Text>
        <Text style={styles.followerLogin}>@{item.follower_login}</Text>
      </View>
    </View>
  );

  

  const getFollowerKey = (item) => `follower-${item.follower_id}`;

  const isCurrentUser =
    userData && currentUser && userData.login === currentUser.login;


    
  return (

         
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.description}>
          Aqui você pode pesquisar usuários do aplicativo e seguir ou deixar de seguir.
          </Text>
        </View>
        
 
        <TextInput
          style={styles.input}
          placeholder="Digite o apelido..."
          value={searchQuery}
          placeholderTextColor="#ffffff"
          onChangeText={setSearchQuery}
          textAlignVertical="center"
        />

        {userData && (
          <TouchableOpacity
            style={styles.userContainer}
            onPress={handleOpenProfile}
          >
            <View style={styles.userIconContainer_Left}>
              <Feather
                style={styles.userIcon}
                name="user"
                size={24}
                color="#2F80ED"
              />
            </View>
            <View style={styles.userInfoContainer_Right}>
              <View style={styles.userInfoRow}>
                <Text style={styles.userText}>{userData.name}</Text>
                <Text style={styles.userTextLogin}>@{userData.login}</Text>
              </View>
              <Text style={styles.modalInfo}>
                Usuário desde:{" "}
                {userData &&
                  new Date(userData.created_at).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <View></View>
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Feather name="search" size={24} color="#fff" />
          <Text style={styles.buttonText}>Encontre o usuário</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Feather name="x" size={24} color="#2F80ED" />
            </TouchableOpacity>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{userData?.name}</Text>
              <Text style={styles.modalSubtitle}>@{userData?.login}</Text>
            </View>
            <Text style={styles.modalInfo}>
              Usuário desde:{" "}
              {userData &&
                new Date(userData.created_at).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
            </Text>
            {!isCurrentUser && (
              <TouchableOpacity
                style={[
                  styles.followButton,
                  isFollowing ? styles.unfollowButton : styles.followButton,
                ]}
                onPress={isFollowing ? unfollowUser : followUser}
              >
                <Text style={styles.followButtonText}>
                  {isFollowing ? "Deixar de Seguir" : "Seguir"}
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={handleOpenFollowersModal}
              style={styles.followersContainer}
            >
              <Text style={styles.followersInfo}>
                {followerCount} seguidores
              </Text>
              <Text style={styles.followersLink}>Ver todos os seguidores</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={followersModalVisible}
        onRequestClose={() => setFollowersModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setFollowersModalVisible(false)}
            >
              <Feather name="x" size={24} color="#2F80ED" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Seguidores</Text>
            {isLoadingFollowers ? (
              <ActivityIndicator size="large" color="#2F80ED" />
            ) : followers.length > 0 ? (
              <FlatList
                data={followers}
                renderItem={renderFollowerItem}
                keyExtractor={getFollowerKey}
                style={styles.followersList}
              />
            ) : (
              <Text style={styles.noFollowersText}>
                Nenhum seguidor encontrado.
              </Text>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginBottom: 16,
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    color: "#00ff00",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#1c1c1c",
    color: "#ffffff",
    width: "100%",
    padding: 12,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#00ff00",
    textAlign: "center",
    fontSize: 16,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#1f1f1f",
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#00ff00",
    width: "100%",
  },
  userIconContainer_Left: {
    padding: 10,
    marginRight: 15,
    backgroundColor: "#2F80ED",
    borderRadius: 50,
  },
  userInfoContainer_Right: {
    flex: 1,
    alignItems: "flex-start",
  },
  userInfoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  userText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  userTextLogin: {
    color: "#777777",
    fontSize: 14,
  },
  modalInfo: {
    fontSize: 14,
    color: "#777777",
    marginTop: 5,
  },
  footer: {
    justifyContent: "flex-end",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00ff00",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: 10,
  },
  modalTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalSubtitle: {
    color: "#777777",
    fontSize: 14,
  },
  followButton: {
    backgroundColor: "#00ff00",
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  followButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  unfollowButton: {
    backgroundColor: "#ff3333",
  },
  followersContainer: {
    marginTop: 15,
    alignItems: "center",
  },
  followersInfo: {
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 5,
  },
  followersLink: {
    color: "#00ff00",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
  },
});
