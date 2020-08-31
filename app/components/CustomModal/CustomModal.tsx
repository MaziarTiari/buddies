import React, { useContext, ReactNode } from 'react'
import { View, Modal, StyleSheet, Alert } from 'react-native'
import { getResponsiveSize } from '../../utils/font/font';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { IconButton } from 'react-native-paper';
import { useCustomModalStyle } from './CustomModal.style';

export interface CustomModalProps {
    onCloseModal: () => void;
    onSubmit?: () => void;
    fixPosition?: boolean,
    showModal: boolean;
    children: ReactNode;
}

const CustomModal = (props: CustomModalProps) => {
    const { theme } = useContext(ThemeContext);
    const styles = useCustomModalStyle(props);
    
    return (
        <View style={styles.root}>
            <View style={styles.container}>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={props.showModal}
                >
                    <View style={styles.container}>
                        <View style={styles.modalView}>
                            <View style={styles.header}>
                                <IconButton
                                    color={theme.App.rejectColor}
                                    style={styles.closeIcon}
                                    icon="window-minimize" 
                                    onPress={props.onCloseModal}
                                />
                                {props.onSubmit &&
                                    <IconButton
                                        color={theme.App.acceptColor}
                                        style={styles.submitIcon}
                                        icon="hand-okay" 
                                        onPress={props.onSubmit}
                                    />
                                }
                            </View>
                            {props.children}
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )
}

export default CustomModal
