import "react-native-gesture-handler";
import React from "react";
import Routes from "./src/routes";
import { AuthProvider } from "./src/contexts/AuthContext";  


// Componente principal da aplicação
export default function App() {
  return (
    <AuthProvider>
      <Routes /> 
    </AuthProvider>
  );
}
