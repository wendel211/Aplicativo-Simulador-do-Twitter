import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstFront from '../screens/FirstFront';
import Login from '../screens/Login';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator();

export default function PublicRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="FirstFront" component={FirstFront} />
            <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />

    </Stack.Navigator>
  );
}