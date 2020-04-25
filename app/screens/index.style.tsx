import { StyleSheet, Platform } from "react-native";
import Color from "../utils/theme/color";

export const styles = StyleSheet.create({
    stackNavScreenHeader: {
        backgroundColor: Color.navBackground,
        ...Platform.select({
            ios: {
                height: 100
            }
        })
    }
});