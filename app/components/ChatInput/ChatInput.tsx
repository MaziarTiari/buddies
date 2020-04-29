import React, { useState } from "react";
import {
    TextInput,
    View,
    NativeSyntheticEvent,
    TextInputContentSizeChangeEventData,
} from "react-native";
import styles from "./ChatInput.style";
import Color from "../../utils/theme/color";
import { IconButton } from "react-native-paper";

const MIN_INPUT_HEIGHT = 30;
const MAX_INPUT_HEIGHT = 95;

export interface ChatInputProps {
    onSend: (message: string) => void;
}

export const ChatInput = (Props: ChatInputProps) => {
    const [inputText, setInputText] = useState("");
    const [inputHeight, setInputHeight] = useState(MIN_INPUT_HEIGHT);

    const handleChangeText = (text: string) => {
        setInputText(text);
    };

    const handleContentSizeChange = (
        event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
    ) => {
        let inputHeight = event.nativeEvent.contentSize.height;
        inputHeight =
            inputHeight < MIN_INPUT_HEIGHT
                ? MIN_INPUT_HEIGHT
                : inputHeight > MAX_INPUT_HEIGHT
                ? MAX_INPUT_HEIGHT
                : inputHeight;
        setInputHeight(inputHeight);
    };

    const handleRemoveText = () => {
        setInputText("");
        setInputHeight(MIN_INPUT_HEIGHT);
    };

    const handleSendText = () => {
        Props.onSend(inputText);
        handleRemoveText();
    };

    return (
        <View style={styles.inputContainer}>
            <IconButton
                icon="delete"
                color={Color.secondaryText}
                size={28}
                onPress={handleRemoveText}
            />
            <TextInput
                multiline={true}
                value={inputText}
                onChangeText={handleChangeText}
                onContentSizeChange={handleContentSizeChange}
                style={{
                    ...styles.textInput,
                    height: inputHeight,
                }}
            />
            <IconButton
                icon="send"
                color={Color.secondaryText}
                size={28}
                onPress={handleSendText}
            />
        </View>
    );
};

export default ChatInput;
