import { StyleSheet } from 'react-native';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { getResponsiveSize } from '../../utils/font/font';

const useActionButtonStyle = () => {
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
        overlay: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'transparent',
            alignItems: 'flex-end',
            justifyContent: 'flex-end'
        },
        button: {
            alignItems: 'center', 
            justifyContent: 'center',
            width: getResponsiveSize(80),
            height: getResponsiveSize(80),
            borderRadius: getResponsiveSize(40),
            marginHorizontal: getResponsiveSize(20),
            marginBottom: getResponsiveSize(20)
        },
        childButton: {
            alignItems: 'center', 
            justifyContent: 'center',
            width: getResponsiveSize(50),
            height: getResponsiveSize(50),
            borderRadius: getResponsiveSize(25),
            marginHorizontal: getResponsiveSize(35),
            marginBottom: getResponsiveSize(10)
        }
    });
};

export default useActionButtonStyle;
