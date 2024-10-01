import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Feed from "../screens/Feed";
import NewPost from "../screens/CreatePost";
import SearchPost from "../screens/SearchPost";
import SearchUser from "../screens/SearchProfile";

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
	return (
		<Tab.Navigator 
			screenOptions={{ 
				headerShown: false,
				tabBarActiveBackgroundColor: '#7d7d7d', 
				tabBarActiveTintColor: '#ffffff', 
				tabBarInactiveTintColor: '#cccccc', 
				tabBarStyle: {
					backgroundColor: '#4f4f4f', 
				},
			}}
		>
			
			<Tab.Screen
				name="Feed"
				component={Feed}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Feather name="home" size={size} color={color} />
					),
					tabBarLabel: "Início",
				}}
			/>
						<Tab.Screen
				name="SearchPost"
				component={SearchPost}
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name=	"file-find-outline"
							size={size}
							color={color}
						/>
					),
					tabBarLabel: "Pesquise Post",
				}}
			/>
			<Tab.Screen
				name="SearchUser"
				component={SearchUser}
				options={{
					tabBarIcon: ({ color, size }) => (
						<Feather name="users" size={size} color={color} />
					),
					tabBarLabel: "Pesquisar Usuário",
				}}
			/>
		</Tab.Navigator>
	);
}
