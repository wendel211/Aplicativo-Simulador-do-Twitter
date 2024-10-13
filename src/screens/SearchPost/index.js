import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";

export default function SearchPost() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { SearchPost } = useAuth(); // Obtendo a função SearchPost do AuthContext

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        handleSearch();
      } else {
        setResults([]); // Limpa os resultados se a query estiver vazia
      }
    }, 500);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const searchResults = await SearchPost({ search: searchQuery }); // Passando a busca como parâmetro
      setResults(searchResults);
    } catch (error) {
      Alert.alert("Erro", "Falha ao buscar as postagens. Por favor, tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderResults = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#00ff00" />;
    }

    if (results.length === 0 && searchQuery.trim() !== "") {
      return <Text style={styles.noResults}>Nenhum resultado encontrado</Text>;
    }

    return results.map((result) => (
      <View key={result.id} style={styles.resultItem}>
        <Text style={styles.resultText}>{result.message}</Text>
        <Text style={styles.resultUser}>Por: {result.user_login}</Text>
        <Text style={styles.resultDate}>
          {new Date(result.created_at).toLocaleString()}
        </Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="post" size={24} color="#00ff00" />
          <Text style={styles.description}>Pesquise por conteúdo de postagens</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Escreva sua pesquisa..."
          value={searchQuery}
          placeholderTextColor="#999999"
          onChangeText={setSearchQuery}
          multiline
          textAlignVertical="center"
        />

        <View style={styles.resultsContainer}>{renderResults()}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#ffffff",
    marginLeft: 10,
    fontWeight: "bold",
  },
  input: {
    height: 50,
    backgroundColor: "#1c1c1c",
    color: "#ffffff",
    borderColor: "#00ff00",
    borderWidth: 1,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
  },
  resultsContainer: {
    marginBottom: 20,
  },
  resultItem: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#1c1c1c",
    borderRadius: 5,
  },
  resultText: {
    fontSize: 16,
    color: "#ffffff",
  },
  resultUser: {
    fontSize: 12,
    color: "#999999",
  },
  resultDate: {
    fontSize: 10,
    color: "#999999",
  },
  noResults: {
    fontSize: 16,
    color: "#999999",
    textAlign: "center",
    marginTop: 20,
  },
});
