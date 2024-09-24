import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FirstFront from "../screens/FirstFront";
import SignIn from "../screens/SignIn";
import Register from "../screens/Register";
import DrawerRoutes from "./drawer.routes";

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FirstFront" component={FirstFront} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="PrivateRoutes" component={DrawerRoutes} />

    </Stack.Navigator>
  );
}
