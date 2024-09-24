
import { validateRegistration } from './validation';


export const validateName = (name) => {
    return name.length > 0;
  };
  
  export const validateLogin = (login) => {
    const regex = /^[a-zA-Z0-9_]{3,}$/;
    return regex.test(login);
  };
  
  export const validatePassword = (password) => {
    return password.length >= 6; 
  };
  
  export const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };
  
  export const validateRegistration = (name, login, password, confirmPassword) => {
    if (!validateName(name)) {
      return "Por favor, preencha o nome.";
    }
    if (!validateLogin(login)) {
      return "O nome de usuário deve ter pelo menos 3 caracteres e pode conter letras, números e underscores.";
    }
    if (!validatePassword(password)) {
      return "A senha deve ter pelo menos 6 caracteres.";
    }
    if (!validateConfirmPassword(password, confirmPassword)) {
      return "As senhas não coincidem.";
    }
    return null; 
  };