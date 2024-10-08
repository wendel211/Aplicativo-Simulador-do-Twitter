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
        drawerActiveBackgroundColor: '#333333', 
        drawerActiveTintColor: '#00b300', 
        drawerInactiveTintColor: '#cccccc', 
        drawerStyle: {
          backgroundColor: '#00b300',
        },
        headerStyle: {
          backgroundColor: '#00b300', 
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
      {}
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
