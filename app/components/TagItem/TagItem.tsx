import React, { useContext } from "react";
import { View, Text } from "react-native";
import { IconButton } from "react-native-paper";
import useStyle from "./TagItem.style";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { getResponsiveSize } from "../../utils/font/font";

export interface ICategory {
    id: number;
    text: string;
}

export interface TagItemProps {
    uuid: string;
    category: ICategory;
    text: string;
    getText: (category: ICategory, text: string) => string;
    onDelete: (uuid: string) => void;
    onEdit: (uuid: string) => void;
}

const TagItem = (props: TagItemProps) => {
    const style = useStyle();
    const { theme } = useContext(ThemeContext);
    return (
        <View style={style.container}>
            <Text numberOfLines={1} style={style.text}>
                {props.getText(props.category, props.text)}
            </Text>
            <IconButton
                icon="pencil"
                size={getResponsiveSize(20)}
                onPress={() => props.onEdit(props.uuid)}
                color={theme.App.secondaryText}
            />
            <IconButton
                icon="delete"
                size={getResponsiveSize(20)}
                onPress={() => props.onDelete(props.uuid)}
                color={theme.App.secondaryText}
            />
        </View>
    );
};

export default TagItem;
