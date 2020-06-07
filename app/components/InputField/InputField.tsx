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
import useStyle from "./InputField.style";
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
}

export const InputField = ({style, ...Props}: InputFieldProps) => {
    const styles = useStyle();

    const [inputHeight, setInputHeight] = useState(Props.dynamicHeight?.min);

    const LeftComponent = (Props.leftComponent ? Props.leftComponent : undefined);
    const RightComponent = (Props.rightComponent ? Props.rightComponent : undefined);

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
        <View style={{flexDirection: "row"}}>
            <InputFieldContainer 
                leftComponent={LeftComponent} rightComponent={RightComponent}
                style={Props.containerStyle}
                content={
                    <TextInput
                        onContentSizeChange={Props.dynamicHeight && handleContentSizeChange}
                        {...Props}
                        style={[
                            styles.textInput,
                            style,
                            Props.dynamicHeight && { height: inputHeight },
                        ]}
                    />
                }
            />
        </View>
    );
};

export default InputField;
