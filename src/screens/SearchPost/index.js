import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";

export default function SearchPost() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const { SearchPost } = useAuth(); // Função de pesquisa no contexto

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      Alert.alert("Atenção", "Digite o conteúdo da postagem para pesquisar.");
      return;
    }

    try {
      // Chama a função de pesquisa passando o termo buscado
      const response = await SearchPost(searchQuery);
      if (response.length > 0) {
        setResults(response); // Define os resultados retornados pela API
      } else {
        setResults([`Nenhum post encontrado para: ${searchQuery}`]);
      }
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao buscar os posts.");
      console.error("Erro ao buscar posts:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <MaterialCommunityIcons name="post" size={24} color="#00ff00" />
          <Text style={styles.description}>
            Pesquise por conteúdo de postagens
          </Text>
        </View>

        {/* Campo de Pesquisa */}
        <TextInput
          style={styles.input}
          placeholder="Digite o conteúdo da postagem..."
          value={searchQuery}
          placeholderTextColor="#a9a9a9"
          onChangeText={setSearchQuery}
          multiline
          textAlignVertical="center"
        />

        {/* Resultados */}
        <View style={styles.resultsContainer}>
          {results.map((result, index) => (
            typeof result === "string" ? (
              <Text key={index} style={styles.resultText}>{result}</Text>
            ) : (
              <View key={index} style={styles.resultItem}>
                <Text style={styles.resultText}>{result.message}</Text>
              </View>
            )
          ))}
        </View>
      </ScrollView>

      {/* Botão de Busca */}
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Feather name="search" size={24} color="#ffffff" />
        <Text style={styles.buttonText}>Buscar Postagens</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    justifyContent: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: "#ffffff",
    marginLeft: 10,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#1c1c1c",
    color: "#ffffff",
    borderColor: "#00ff00",
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
  },
  resultsContainer: {
    marginBottom: 20,
  },
  resultItem: {
    backgroundColor: "#1c1c1c",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    color: "#ffffff",
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
    color: "#ffffff",
    fontSize: 16,
    marginLeft: 10,
  },
});
