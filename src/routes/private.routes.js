import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import TabRoutes from "./tab.routes";
import Settings from "../screens/Config";

const Drawer = createDrawerNavigator();

export default function PrivateRoutes() {
  return (
    <Drawer.Navigator 
      screenOptions={{ 
        title: "", 
        drawerActiveBackgroundColor: '#7d7d7d', 
        drawerActiveTintColor: '#ffffff', 
        drawerInactiveTintColor: '#cccccc', 
        drawerStyle: {
          backgroundColor: '#4f4f4f',
        },
        headerStyle: {
          backgroundColor: '#4f4f4f', 
        },
        headerTintColor: '#ffffff',
      }} 
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={TabRoutes}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
          drawerLabel: "Página Inicial",
        }}
      />
      {/* <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
          drawerLabel: "Meu perfil",
        }}
      /> */}
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
          drawerLabel: "Configurações",
        }}
      />
    </Drawer.Navigator>
  );
}
