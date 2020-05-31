import React, { useContext, useState } from "react";
import { StyleProp, TextStyle, Picker, View, Modal, Alert, StyleSheet, TouchableHighlight, Text } from "react-native";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { TouchableRipple, IconButton } from "react-native-paper";
import FormInput from "../FormInput/FormInput";
import { getResponsiveSize, fontsizes } from "../../utils/font/font";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface SelectorProps {
    error?: boolean;
    placeholder?: string;
    modalTitle: string;
    items: string[];
    onSelect: (item: string) => void;
	selectedItem: string;
	style?: StyleProp<TextStyle>
}
export function Selector( Props: SelectorProps) {
    const { theme } = useContext(ThemeContext);
    const styles = useStyle();
    
    const [modalVisible, setModalVisible] = useState(false);
    const [value, setValue] = useState(Props.selectedItem || "");

    const onSelect = (i: number) => {
        setModalVisible(false);
        setValue(Props.items[i]);
        Props.onSelect(Props.items[i]);
    }
    return (
        <View>
            <TouchableRipple 
                style={{flex:1}}
                onPress={() => setModalVisible(!modalVisible)}>
                <FormInput
                    verify={Props.error}
                    placeholder={Props.placeholder}
                    value={value} editable={false} 
                    onTouchStart={() => setModalVisible(!modalVisible)}
                    rightComponent={
                        <Text style={{color: theme.App.primaryText}}>▼</Text>
                    }
                />
            </TouchableRipple>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { Alert.alert("Modal has been closed."); }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <IconButton
                        color={theme.App.primaryText}
                        icon="close" onPress={() => setModalVisible(false)} 
                        style={{alignSelf:"flex-end", position:"absolute"}}
                    />
                        <Text style={styles.modalTitle}>{Props.modalTitle}</Text>
                            <View>
                                {Props.items.map((item, i) =>
                                    <TouchableHighlight  key={i}
                                        style={{ ...styles.itemContainer}}
                                        onPress={() => onSelect(i)}
                                    >
                                        <Text style={styles.itemText}>
                                            {item}
                                        </Text>
                                    </TouchableHighlight>
                                )}
                            </View>
                    </View>
                </View>
            </Modal>
    </View>
    );
}

const useStyle = () => { 
    const { theme } = useContext(ThemeContext);
    return StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "stretch",
            marginTop: getResponsiveSize(22)
            },
            modalView: {
            margin: getResponsiveSize(20),
            backgroundColor: theme.App.menuBackground,
            borderRadius: getResponsiveSize(20),
            paddingVertical: getResponsiveSize(35),
            alignItems: "stretch",
            shadowColor: theme.App.devider,
            shadowOpacity: 1,
            shadowRadius: 1.5,
            elevation: 10
        },
        itemContainer: {
            borderTopColor: theme.App.devider,
            backgroundColor: theme.App.menuBackground,
            paddingVertical: getResponsiveSize(8),
            paddingHorizontal: getResponsiveSize(15),
            color: theme.App.primaryText
        },
        modalTitle: {
            fontSize: getResponsiveSize(24),
            marginBottom: getResponsiveSize(20),
            color: theme.App.primaryText,
            fontWeight: "bold",
            textAlign: "center"
        },
        itemText: {
            fontSize: fontsizes.small,
            color: theme.App.primaryText
        }
    });
}