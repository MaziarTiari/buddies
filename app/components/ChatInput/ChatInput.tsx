import React, { useState } from "react";
import { NativeSyntheticEvent, TextInputFocusEventData, ViewProps } from "react-native";
import Color from "../../utils/theme/color";
import { IconButton } from "react-native-paper";
import InputField from "../InputField/InputField";

export interface ChatInputProps extends ViewProps {
    onSend: (message: string) => void;
    onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

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
            textInput={
                { multiline: true, value:inputText, onChangeText: handleChangeText}
            }
            leftComponent={
                <IconButton icon="delete" color={Color.secondaryText} size={28}
                            onPress={() => setInputText("")} />
            }
            rightComponent={
                <IconButton icon="send" color={Color.secondaryText} size={28}
                            onPress={handleSendText} />
            }
        />      
    );
};

export default ChatInput;
