import { StyleSheet, Platform } from 'react-native'
import Color from '../../utils/theme/color';

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Color.screenBackground,
    },
    centered_body : {
        flex: 1,
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 10,
        paddingTop: 30,
        paddingBottom: Platform.OS === 'ios' ? 20 : 10
    }
});