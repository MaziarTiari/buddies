import { StyleProp, ViewStyle } from "react-native";
import Color from "../utils/theme/color";

export const StackNavScreenHeaderStyle: StyleProp<ViewStyle> = {
    backgroundColor: Color.navBackground
}

export const StackNavScreenHeaderStyle_ios: StyleProp<ViewStyle> = {
    backgroundColor: Color.navBackground,
    height: 100
}