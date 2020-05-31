import React, { ReactElement, ReactNode, useContext } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native'
import { IconButton, TouchableRipple } from 'react-native-paper'
import Container from '../Container/Container'
import { ThemeContext } from '../../context/ThemeContext/ThemeContext'
import { getResponsiveSize } from '../../utils/font/font'
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface EditableTextProp {
    children: ReactNode;
    editable: boolean;
    onEdit: () => void;
}
const EditableText = (Props: EditableTextProp) => {
    const { theme } = useContext(ThemeContext);
    const styles = StyleSheet.create({
        container: {
            flex:1,
            borderTopWidth: 1,
            borderTopColor: theme.App.devider,
            paddingTop: 10,
            marginBottom: 10,
            position: "relative"
        }, editIcon: {
            alignSelf:"flex-end",
            flex:1,
            position: "absolute",
            margin: 0,
        }
    });
    return (
        <Container type="component" layout="root" style={styles.container}>
            {Props.children}
            {Props.editable &&
            <IconButton
                onPress={Props.onEdit}
                style={styles.editIcon}
                color={theme.App.primaryText}
                icon={"lead-pencil"} 
                size={getResponsiveSize(26)}/>
            }
        </Container>
    )
}

export default EditableText
