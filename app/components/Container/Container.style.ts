import { StyleSheet, Platform } from 'react-native'
import Color from '../../utils/theme/color';

export const styles = StyleSheet.create({
    screen_centered: {
        flex: 1,
        backgroundColor: Color.Theme.screenBackground,
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 10,
    },
    body_centered : {
        flex: 1,
        alignItems: "center",
        paddingTop: 30,
        paddingBottom: Platform.OS === 'ios' ? 20 : 10
    }
});