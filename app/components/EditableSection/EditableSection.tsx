import React, { ReactNode, useContext } from 'react'
import { StyleSheet } from 'react-native'
import { IconButton } from 'react-native-paper'
import Container from '../Container/Container'
import { ThemeContext } from '../../context/ThemeContext/ThemeContext'
import { getResponsiveSize } from '../../utils/font/font'

interface EditableSectionProp {
    children: ReactNode;
    editable: boolean;
    onEdit: () => void;
}
const EditableSection = (Props: EditableSectionProp) => {
    const { theme } = useContext(ThemeContext);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            borderTopWidth: 1,
            borderTopColor: theme.App.devider,
            paddingTop: 10,
            marginBottom: 10,
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
            {Props.editable &&
                <IconButton
                    onPress={Props.onEdit}
                    style={styles.editIcon}
                    color={theme.App.primaryText}
                    icon={"lead-pencil"}
                    size={getResponsiveSize(26)} />
            }
        </Container>
    )
}

export default EditableSection;
