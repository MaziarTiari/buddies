import { StyleSheet, Platform } from 'react-native'
import Color from '../../utils/theme/color';
import { Device } from '../../utils/class/Device';

const device = new Device();

export const styles = StyleSheet.create({
    screen_centered: {
        flex: 1,
        backgroundColor: Color.Theme.screenBackground,
        alignItems: "center",
        paddingHorizontal: device.width * 0.03,
    },
    body_centered : {
        flex: 1,
        alignItems: "center",
        paddingTop: 30,
        paddingBottom: Platform.OS === 'ios' ? 20 : 10
    }
});