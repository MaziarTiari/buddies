import React, { ReactNode, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { IconButton } from 'react-native-paper'
import Container from '../Container/Container'
import { ThemeContext } from '../../context/ThemeContext/ThemeContext'
import { getResponsiveSize, getResponsiveHeight } from '../../utils/font/font'
import useEditableSectionStyle from './EditableSection.style'

interface EditableSectionProp {
    children: ReactNode;
    isEditing: boolean;
    onEdit: () => void;
    noDevider?: boolean;
}
const EditableSection = (props: EditableSectionProp) => {
    const { styles, theme } = useEditableSectionStyle(!!props.noDevider);
    return (
        <Container type="component" layout="root" style={styles.container}>
            {props.children}
            {props.isEditing &&
                <IconButton
                    onPress={props.onEdit}
                    style={styles.editIcon}
                    color={theme.App.interactiveItem}
                    icon={"lead-pencil"}
                    size={getResponsiveSize(26)} />
            }
        </Container>
    )
}

export default EditableSection;
