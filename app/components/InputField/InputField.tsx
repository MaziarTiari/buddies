import React, { useEffect, useState } from "react";
import {
    TextInput,
    NativeSyntheticEvent,
    TextInputContentSizeChangeEventData,
    StyleProp,
    ViewStyle,
    TextInputProps,
    View,
} from "react-native";
import useInputFieldStyle from "./InputField.style";
import { InputFieldContainer } from "../InputFieldContainer/InputFieldContainer";

interface IDynamicHeight {
    min: number;
    max: number;
}

export interface InputFieldProps extends TextInputProps {
    dynamicHeight?: IDynamicHeight;
    leftComponent?: JSX.Element;
    rightComponent?: JSX.Element;
    containerStyle?: StyleProp<ViewStyle>;
    onPress?: () => void;
}

export const InputField = ({style, ...props}: InputFieldProps) => {
    const styles = useInputFieldStyle();

    const [inputHeight, setInputHeight] = useState(props.dynamicHeight?.min);

    const LeftComponent = (props.leftComponent ? props.leftComponent : undefined);
    const RightComponent = (props.rightComponent ? props.rightComponent : undefined);

    const handleContentSizeChange = (
        event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
    ) => {
        if (props.dynamicHeight) {
            let inputHeight = event.nativeEvent.contentSize.height;
            inputHeight =
                inputHeight < props.dynamicHeight.min
                    ? props.dynamicHeight.min
                    : inputHeight > props.dynamicHeight.max
                    ? props.dynamicHeight.max
                    : inputHeight;
            setInputHeight(inputHeight);
        }
    };

    useEffect(() => {
        if (props.value === "" && props.dynamicHeight) {
            setInputHeight(props.dynamicHeight.min);
        }
    }, [props.value]);

    return (
        <View style={{display: "flex", flexDirection: "row", width: "100%"}}>
        <InputFieldContainer
            leftComponent={LeftComponent} rightComponent={RightComponent}
            style={props.containerStyle}
            content={
                <TextInput
                    onContentSizeChange={
                        props.dynamicHeight && handleContentSizeChange
                    }
                    {...props}
                    style={[
                        styles.textInput,
                        style,
                        props.dynamicHeight && { height: inputHeight },
                    ]}
                    value={props.value}
                />
            }
        />
        </View>
    );
};

export default InputField;
