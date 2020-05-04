import { StyleSheet, Platform } from 'react-native'
import Color from '../../utils/theme/color';
import { Device } from '../../utils/class/Device';
import { getResponsiveSize } from '../../utils/theme/font';

const device = new Device();

const screen = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Color.Theme.screenBackground,
        alignItems: "center",
    },
    body: {
        flex: 1,
        alignItems: "stretch",
        alignSelf:"stretch",
    }
});

const component = StyleSheet.create({
    root: {
        flex: 1,
        marginHorizontal: device.width * 0.03,
    },
    root_center : {
        flex: 1,
        marginHorizontal: device.width * 0.03,
        alignItems: "center",
        paddingTop: 30,
        paddingBottom: Platform.OS === 'ios' ? 20 : 10
    }
});

export const styles = { screen: screen, component: component };