import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";


const bottomTab = {

	  backgroundColor: "#2e2e2e",
	  borderRadius: 5,
	  padding: 10,
	  marginVertical: 12,
	  alignItems: "center",
	  justifyContent: "center",
}

const RegisterScreen = () => {
	return (
		<View style={{ padding: 20 }}>
			<InputRegister
				label="Nome"
				placeholder="Digite seu nome"
			/>
			<InputRegister
				label="Email"
				placeholder="Digite seu email"
			/>
			<InputRegister
				label="Senha"
				placeholder="Digite sua senha"
				secureTextEntry
			/>
			<Button title="Registrar" onPress={() => console.log("Registrar")} />
			<Message text="Registro realizado com sucesso!" />
		</View>
	);
};

const Schema = StyleSheet.create({
	messageContainer: {
		backgroundColor: "#2e2e2e",
		borderRadius: 5,
		padding: 10,
		marginVertical: 12,
	},
	messageText: {
		color: "#ffffff",
		fontSize: 14,
	},
});

const Message = ({ text }) => {
	return (
		<View style={styles.messageContainer}>
			<Text style={styles.messageText}>{text}</Text>
		</View>
	);
};


const styles = StyleSheet.create({
	container: {
		marginBottom: 12,
	},
	title: {
		fontSize: 16,
		marginTop: 28,
		marginBottom: 8,
		color: "#ffffff",
	},
	input: {
		borderBottomWidth: 1,
		borderBottomColor: "#ffffff", 
		height: 40,
		fontSize: 14,
		color: "#ffffff", 
		backgroundColor: "#2e2e2e", 
		paddingHorizontal: 10,
	},
});

const InputRegister = ({
	label,
	placeholder,
	secureTextEntry,
	...props
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{label}</Text>
			<TextInput
				style={styles.input}
				placeholder={placeholder}
				secureTextEntry={secureTextEntry}
				placeholderTextColor="#cccccc" 
				{...props}
			/>
		</View>
	);
};

export default InputRegister;
