import React, { useState, useEffect, useMemo } from "react";
import {
    TextInput,
    NativeSyntheticEvent,
    TextInputContentSizeChangeEventData,
    View,
    Keyboard,
    KeyboardEvent,
    Platform,
    TextInputProps,
    StyleProp,
    ViewStyle,
} from "react-native";
import styles from "./InputField.style";

const MIN_INPUT_HEIGHT = 30;
const MAX_INPUT_HEIGHT = 90;

export interface InputContainerProps  {
    minInputHeight?: number;
    maxInputHeight?: number;
    leftComponent?: JSX.Element;
    rightComponent?: JSX.Element; 
    style?: StyleProp<ViewStyle>;
    textInput?: TextInputProps;
}

export const InputField = (Props: InputContainerProps) => {

    const minInputHeight = useMemo(
        () => Props.minInputHeight ? 
              Props.minInputHeight : MIN_INPUT_HEIGHT,
    [Props.minInputHeight]);

    const maxInputHeight = useMemo(
        () => Props.maxInputHeight ? 
              Props.maxInputHeight : MAX_INPUT_HEIGHT,
    [Props.minInputHeight]);

    const [inputHeight, setInputHeight] = useState(minInputHeight);
    const [marginBottom, setMarginBottom] = useState(0)

    const LeftComponent = () => Props.leftComponent ? Props.leftComponent : <View/>;
    const RightComponent = () => Props.rightComponent ? Props.rightComponent : <View/>;

    useEffect(() => {
        if(Platform.OS !== 'ios') return;
        Keyboard.addListener('keyboardWillShow', _keyboardWillShow);
        Keyboard.addListener('keyboardWillHide', _keyboardWillHide);
        return () => {
            Keyboard.removeListener('keyboardWillShow', _keyboardWillShow);
            Keyboard.removeListener('keyboardWillHide', _keyboardWillHide);
        }
    }, [])

    const _keyboardWillShow = (event: KeyboardEvent) => {
        setMarginBottom(event.endCoordinates.height * 0.31);
    };

    const _keyboardWillHide = () => {
        setMarginBottom(0);
    };

    const handleContentSizeChange = 
            (event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {

        let inputHeight = event.nativeEvent.contentSize.height;
        
        inputHeight =
            inputHeight < minInputHeight
                ? minInputHeight
                : inputHeight > maxInputHeight
                ? maxInputHeight
                : inputHeight;
        setInputHeight(inputHeight);
    };

    return (
        <View style={[styles.inputContainer, Props.style, {marginBottom:marginBottom}]}>
            <LeftComponent {...Props.leftComponent?.props}/>
            <TextInput
                onContentSizeChange={handleContentSizeChange}
                style={[
                    styles.textInput,
                    {height: inputHeight},
                    Props.textInput?.style,
                ]}
                {...Props.textInput}
            />
            <RightComponent {...Props.rightComponent?.props} />
        </View>
    );
};

export default InputField;