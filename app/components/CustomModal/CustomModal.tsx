import React, { useContext, ReactNode } from 'react'
import { View, Modal, StyleSheet, Alert } from 'react-native'
import { getResponsiveSize } from '../../utils/font/font';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { IconButton } from 'react-native-paper';

interface CenteredModalProps {
    onCloseModal: () => void;
    onSubmit?: () => void;
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
        paddingBottom: getResponsiveSize(20),
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
        header: {
            justifyContent: "space-between",
            flexDirection: "row",
        },
        closeIcon: {
            alignSelf: Props.onSubmit ? "flex-start" : "flex-end",
        },
        submitIcon: {
            alignSelf: "flex-end",
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
                        <View style={styles.header}>
                            <IconButton
                                color={theme.App.primaryText}
                                style={styles.closeIcon}
                                icon="window-minimize" 
                                onPress={Props.onCloseModal}
                            />
                            {Props.onSubmit &&
                                <IconButton
                                    color={theme.App.primaryText}
                                    style={styles.submitIcon}
                                    icon="hand-okay" 
                                    onPress={Props.onSubmit}
                                />
                            }
                        </View>
                        {Props.children}
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default CustomModal
