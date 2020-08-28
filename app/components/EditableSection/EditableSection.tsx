import React, { ReactNode, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import Container from '../Container/Container'
import { ThemeContext } from '../../context/ThemeContext/ThemeContext'
import { getResponsiveSize, getResponsiveHeight } from '../../utils/font/font'

interface EditableSectionProp {
    children: ReactNode;
    isEditing: boolean;
    onEdit: () => void;
    noDevider?: boolean;
}
const EditableSection = (Props: EditableSectionProp) => {
    const { theme } = useContext(ThemeContext);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            borderTopWidth: Props.noDevider ? 0 : 1,
            borderTopColor: theme.App.devider,
            paddingTop: getResponsiveHeight(10),
            marginBottom: getResponsiveHeight(10),
            position: "relative"
        }, editIcon: {
            alignSelf: "flex-end",
            flex: 1,
            position: "absolute",
            margin: 0,
        }
    });
    return (
        <Container type="component" layout="root" style={styles.container}>
            {Props.children}
            {Props.isEditing &&
                <IconButton
                    onPress={Props.onEdit}
                    style={styles.editIcon}
                    color={theme.App.interactiveItem}
                    icon={"lead-pencil"}
                    size={getResponsiveSize(26)} />
            }
        </Container>
    )
}

export default EditableSection;
