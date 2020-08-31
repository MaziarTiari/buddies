import React, { useState } from "react";
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

    return (
        <View style={{flexDirection: "row"}}>
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
                    />
                }
            />
        </View>
    );
};

export default InputField;
