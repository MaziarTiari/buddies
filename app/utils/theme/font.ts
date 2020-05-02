import { Device } from "../class/Device"

const device = new Device();

export const getResponsiveFontsize = (value: number) => value * device.width / 450;

export const fontsizes = {
    header_1: getResponsiveFontsize(20),
    content: getResponsiveFontsize(15),
    icon: getResponsiveFontsize(30)
}