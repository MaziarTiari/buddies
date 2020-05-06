import React, { useState } from "react";
import { NativeSyntheticEvent, TextInputFocusEventData, ViewProps } from "react-native";
import { IconButton } from "react-native-paper";
import InputField from "../InputField/InputField";
import useStyle from "./ChatInput.style";
import { fontsizes, getLineHeight } from "../../utils/font/font";

export interface ChatInputProps extends ViewProps {
    onSend: (message: string) => void;
    onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

const MIN_HEIGHT = getLineHeight(fontsizes.medium);
const MAX_HEIGHT = getLineHeight(fontsizes.medium * 5);

export const ChatInput = (Props: ChatInputProps) => {
    const { theme, styles } = useStyle();
    const [inputText, setInputText] = useState("");

    const handleChangeText = (text: string) => {
        setInputText(text);
    };

    const handleSendText = () => {
        Props.onSend(inputText);
        setInputText("");
    };

    return (
        <InputField
            containerStyle={styles.inputContainer}
            dynamicHeight={{ min: MIN_HEIGHT, max: MAX_HEIGHT }}
            multiline={true}
            value={inputText}
            onChangeText={handleChangeText}
            leftComponent={
                <IconButton
                    icon="delete"
                    color={theme.App.secondaryText}
                    size={fontsizes.icon}
                    onPress={() => setInputText("")}
                />
            }
            rightComponent={
                <IconButton
                    icon="send"
                    color={theme.App.secondaryText}
                    size={fontsizes.icon}
                    onPress={handleSendText}
                />
            }
        />
    );
};

export default ChatInput;
