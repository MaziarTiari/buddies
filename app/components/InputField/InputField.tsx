import React, { useState, useEffect } from "react";
import {
    TextInput,
    NativeSyntheticEvent,
    TextInputContentSizeChangeEventData,
    View,
    Keyboard,
    KeyboardEvent,
    Platform,
    StyleProp,
    ViewStyle,
    TextInputProps,
} from "react-native";
import styles from "./InputField.style";

interface IDynamicHeight {
    min: number;
    max: number;
}

export interface InputFieldProps extends TextInputProps {
    dynamicHeight?: IDynamicHeight;
    leftComponent?: JSX.Element;
    rightComponent?: JSX.Element;
    containerStyle?: StyleProp<ViewStyle>;
}

export const InputField = ({style, ...Props}: InputFieldProps) => {
    const [inputHeight, setInputHeight] = useState(Props.dynamicHeight?.min);
    const [marginBottom, setMarginBottom] = useState(0);

    const LeftComponent = () => (Props.leftComponent ? Props.leftComponent : null);
    const RightComponent = () => (Props.rightComponent ? Props.rightComponent : null);

    useEffect(() => {
        if (Platform.OS !== "ios") return;
        Keyboard.addListener("keyboardWillShow", _keyboardWillShow);
        Keyboard.addListener("keyboardWillHide", _keyboardWillHide);
        return () => {
            Keyboard.removeListener("keyboardWillShow", _keyboardWillShow);
            Keyboard.removeListener("keyboardWillHide", _keyboardWillHide);
        };
    }, []);

    const _keyboardWillShow = (event: KeyboardEvent) => {
        setMarginBottom(event.endCoordinates.height * 0.31);
    };

    const _keyboardWillHide = () => {
        setMarginBottom(0);
    };

    const handleContentSizeChange = (
        event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
    ) => {
        if (Props.dynamicHeight) {
            let inputHeight = event.nativeEvent.contentSize.height;
            inputHeight =
                inputHeight < Props.dynamicHeight.min
                    ? Props.dynamicHeight.min
                    : inputHeight > Props.dynamicHeight.max
                    ? Props.dynamicHeight.max
                    : inputHeight;
            setInputHeight(inputHeight);
        }
    };

    return (
        <View
            style={[
                styles.inputContainer,
                Props.containerStyle,
                { marginBottom: marginBottom },
            ]}
        >
            <LeftComponent {...Props.leftComponent?.props} />
            <TextInput
                onContentSizeChange={Props.dynamicHeight && handleContentSizeChange}
                {...Props}
                style={[
                    styles.textInput,
                    style,
                    Props.dynamicHeight && { height: inputHeight },
                ]}
            />
            <RightComponent {...Props.rightComponent?.props} />
        </View>
    );
};

export default InputField;