import React, { useContext } from "react";
import { Modal, View, Text } from "react-native";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import useStyle from "./ErrorModal.style";
import { SessionContext } from "../../context/SessionContext/SessionContext";
import Button from "../Button/Button";

const ErrorModal = (): JSX.Element => {
    const { translations } = useContext(LanguageContext);
    const { theme } = useContext(ThemeContext);
    const { errorMessage, setErrorMessage } = useContext(SessionContext);
    const style = useStyle();
    return (
        <Modal visible={true} transparent={true}>
            <View style={style.modalBackground}>
                <View style={style.modalContainer} >
                    <Text style={style.modalText}>
                        <Text style={[style.modalText, { fontWeight: "bold", color: theme.App.errorColor }]}>{translations.error}: </Text>
                        {errorMessage}
                    </Text>
                    <Button
                        title={translations.continue}
                        onPress={() => setErrorMessage(undefined)}
                        style={style.button}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default ErrorModal;