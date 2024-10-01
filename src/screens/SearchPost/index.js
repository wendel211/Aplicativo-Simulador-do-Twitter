import React, { useState } from "react";

import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";

import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

export default function SearchPost() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      Alert.alert("Atenção", "Digite o conteúdo da postagem para pesquisar.");
      return;
    }

    setResults([`Buscando por: ${searchQuery}`]);
  };

  return (
    <View style={styles.container}> 

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="post" size={24} color="#00ff00" />
          <Text style={styles.description}>
              Pesquise por conteúdo de postagens
          </Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Escreva sua postagem..."
          value={searchQuery}
           placeholderTextColor="#ffffff"
          onChangeText={setSearchQuery}
          multiline
          textAlignVertical="center"
        />

        <View style={styles.resultsContainer}>
          <View style={styles.resultsSearch}>
            {results.map((result, index) => (
              <Text key={index}>{result}</Text>
            ))}
          </View>
        </View>
      </ScrollView>

      <View></View>
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Feather name="search" size={24} color="#ffffff" />
          <Text style={styles.buttonText}> Encontre seus posts clicando aqui</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", 
    padding: 16,
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
  resultText: {
    fontSize: 16,
    color: "#ffffff", 
    marginBottom: 5,
    padding: 10, 
    backgroundColor: "#1c1c1c", 
    borderRadius: 5, 
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
  },
});
