import { Dimensions } from 'react-native';

export const { width, height } = Dimensions.get('window');

export const colors = { 

    primary: '##00b300; ',
    secondary: '#1c1c1c',
    tertiary: '#2e2e2e',
    success: '#00ff00',

};

export const padding = {

    sm: 10,
    md: 20,
    lg: 30,
    xl: 40,

};

export const border = {

    radius: 5,
    sm: 5,
    md: 10,
    lg: 15,
    xl: 20,

};

export default constants;