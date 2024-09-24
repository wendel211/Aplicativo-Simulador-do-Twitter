import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../contexts/AuthContext";
import PublicRoutes from "./public.routes";
import PrivateRoutes from "./private.routes";
import { View, ActivityIndicator } from "react-native";

const RootStack = createNativeStackNavigator();

export default function Routes() {
  
  const { signed, loading } = useAuth();

 
  if (loading) {
    return (

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#666" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>


        {signed ? (
          <RootStack.Screen name="PrivateRoutes" component={PrivateRoutes} />
        ) : (
          <RootStack.Screen name="PublicRoutes" component={PublicRoutes} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

  
  // Se o estado de loading for verdadeiro, exibe um indicador de carregamento