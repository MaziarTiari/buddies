import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
    container: {
        paddingBottom: Platform.OS === 'ios' ? 20 : 10
    },
    inputField: {
        alignSelf: "flex-end"
    },
    list: {
        flex: 1,
    },
});

export default styles;
