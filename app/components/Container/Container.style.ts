import { StyleSheet, Platform } from "react-native";
import Color from "../../utils/theme/color";
import { getResponsiveSize } from "../../utils/theme/font";

const screen = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Color.Theme.screenBackground,
        alignItems: "center",
    },
    body: {
        flex: 1,
        alignItems: "stretch",
        alignSelf: "stretch",
    },
});

const component = StyleSheet.create({
    root: {
        flex: 1,
        marginHorizontal: getResponsiveSize(15),
    },
    root_center: {
        flex: 1,
        marginHorizontal: getResponsiveSize(15),
        alignItems: "center",
        paddingTop: 30,
        paddingBottom: Platform.OS === "ios" ? 20 : 10,
    },
});

export const styles = { screen: screen, component: component };
