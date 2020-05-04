import { Device } from "../class/Device"

const device = new Device();

export const getResponsiveSize = (value: number) => {
    const maxSize = value * 1.35;
    const responsiveSize = value * device.width / 450;
    return responsiveSize > maxSize ? maxSize : responsiveSize;
}

export const fontsizes = {
    large: getResponsiveSize(26),
    medium: getResponsiveSize(20),
    small: getResponsiveSize(15),
    xsmall: getResponsiveSize(12),
    icon: getResponsiveSize(30),
    icon_m: getResponsiveSize(40),
}