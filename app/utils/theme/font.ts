import { Device } from "../class/Device"

const device = new Device();

export const getResponsiveFontsize = (value: number) => value * device.width / 450;

export const fontsizes = {
    large: getResponsiveFontsize(26),
    medium: getResponsiveFontsize(20),
    small: getResponsiveFontsize(15),
    xsmall: getResponsiveFontsize(12),
    icon: getResponsiveFontsize(30),
    icon_m: getResponsiveFontsize(40),
}