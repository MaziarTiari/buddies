import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { IconButton } from 'react-native-paper'
import { ThemeContext } from '../../context/ThemeContext/ThemeContext'
import { getResponsiveSize } from '../../utils/font/font';
import { useEditApprovalStyle } from './EditApproval.style';

interface EditApprovalProps {
    submitIconName: string;
    cancelIconName: string;
    onSubmit: () => void;
    onCancel: () => void;
}
export default function EditApproval(props: EditApprovalProps) {
    const { theme } = useContext(ThemeContext);
    const styles = useEditApprovalStyle();
    return (
        <View style={styles.container}>
            <IconButton
                icon={props.cancelIconName}
                size={getResponsiveSize(50)}
                onPress={props.onCancel}
                color={theme.App.rejectColor}
            />
            <IconButton
                icon={props.submitIconName}
                size={getResponsiveSize(50)}
                onPress={props.onSubmit}
                color={theme.App.acceptColor}
            />
        </View>
    )
}

