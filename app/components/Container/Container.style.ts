import { StyleSheet, Platform } from 'react-native'
import Color from '../../utils/theme/color';
import { Device } from '../../utils/class/Device';

const device = new Device();

export const styles = StyleSheet.create({
    screen_centered: {
        flex: 1,
        backgroundColor: Color.Theme.screenBackground,
        alignItems: "center",
    },
    screend_body: {
        flex: 1,
        alignItems: "stretch",
        alignSelf:"stretch",
    },
    component_container: {
        flex: 1,
        marginHorizontal: device.width * 0.03,
        paddingTop: 30,
        paddingBottom: Platform.OS === 'ios' ? 20 : 10
    },
    body_centered : {
        flex: 1,
        marginHorizontal: device.width * 0.03,
        alignItems: "center",
        paddingTop: 30,
        paddingBottom: Platform.OS === 'ios' ? 20 : 10
    }
});