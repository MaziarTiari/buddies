import React, { useContext } from "react";
import { Modal, View, ActivityIndicator, Text } from "react-native";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import useStyle from "./LoadingModal.style";
import { getResponsiveSize } from "../../utils/font/font";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const LoadingModal = (): JSX.Element => {
    const { translations } = useContext(LanguageContext);
    const { theme } = useContext(ThemeContext);
    const style = useStyle();
    return (
        <Modal visible={true} transparent={true}>
            <View style={style.modalBackground}>
                <View style={style.modalContainer} >
                    <ActivityIndicator size={getResponsiveSize(80)} color={theme.App.primaryItem} />
                    <Text style={style.modalText}>{translations.please_wait}</Text>
                </View>
            </View>
        </Modal>
    );
};

export default LoadingModal;