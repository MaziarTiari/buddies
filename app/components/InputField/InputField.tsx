import React, { useState, useEffect } from "react";
import {
    TextInput,
    NativeSyntheticEvent,
    TextInputContentSizeChangeEventData,
    View,
    StyleProp,
    ViewStyle,
    TextInputProps,
} from "react-native";
import useStyle from "./InputField.style";

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
    const styles = useStyle();

    const [inputHeight, setInputHeight] = useState(Props.dynamicHeight?.min);

    const LeftComponent = () => (Props.leftComponent ? Props.leftComponent : null);
    const RightComponent = () => (Props.rightComponent ? Props.rightComponent : null);

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
        <View style={[styles.inputContainer, Props.containerStyle]}>
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
