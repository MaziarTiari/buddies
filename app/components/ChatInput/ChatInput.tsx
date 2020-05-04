import React, { useState } from "react";
import { NativeSyntheticEvent, TextInputFocusEventData, ViewProps } from "react-native";
import Color from "../../utils/theme/color";
import { IconButton } from "react-native-paper";
import InputField from "../InputField/InputField";
import styles from "./ChatInput.style";
import { fontsizes, lineheights } from "../../utils/theme/font";

export interface ChatInputProps extends ViewProps {
    onSend: (message: string) => void;
    onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

const MIN_HEIGHT = lineheights.medium;
const MAX_HEIGHT = lineheights.medium * 5;

export const ChatInput = (Props: ChatInputProps) => {
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
                    color={Color.Theme.secondaryText}
                    size={fontsizes.icon}
                    onPress={() => setInputText("")}
                />
            }
            rightComponent={
                <IconButton
                    icon="send"
                    color={Color.Theme.secondaryText}
                    size={fontsizes.icon}
                    onPress={handleSendText}
                />
            }
        />
    );
};

export default ChatInput;
