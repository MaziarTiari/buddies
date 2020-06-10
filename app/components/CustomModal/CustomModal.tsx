import React, { useContext, ReactNode } from 'react'
import { View, Modal, StyleSheet, Alert } from 'react-native'
import { getResponsiveSize } from '../../utils/font/font';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { IconButton } from 'react-native-paper';

interface CenteredModalProps {
    onCloseModal: () => void;
    fixPosition?: boolean,
    showModal: boolean;
    children: ReactNode;
}

const CustomModal = (Props: CenteredModalProps) => {
    const { theme } = useContext(ThemeContext);
    const styles = StyleSheet.create({
        container: {
            flex: Props.fixPosition ? 0 : 1,
            justifyContent: Props.fixPosition ? "flex-start" : "center",
            alignItems: "stretch",
            top: Props.fixPosition ? "15%" : 0,
        },
        modalView: {
        position:"absolute",
        width:"90%",
        alignSelf:"center",
        alignItems:"stretch",
        backgroundColor: theme.App.screenBackground,
        borderRadius: 20,
        paddingHorizontal: getResponsiveSize(20),
        shadowColor: "#0000",
        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 20
        },
        modalIcon: {
            alignSelf:"flex-end",
        }
    });
    
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={Props.showModal}
                onRequestClose={() => {Alert.alert("Modal has been closed.");}}
            >
                <View style={styles.container}>
                    <View style={styles.modalView}>
                        <IconButton
                            color={theme.App.primaryText}
                            style={styles.modalIcon}
                            icon="window-minimize" 
                            onPress={Props.onCloseModal}
                        />
                        {Props.children}
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default CustomModal
