import { Device } from "../class/Device";

const device = new Device();
const maxScaling = 1.3;

export const getResponsiveSize = (value: number) => {
    const scaling = device.width / 450;
    return scaling > maxScaling ? maxScaling * value : scaling * value;
};

export const fontsizes = {
    large: getResponsiveSize(26),
    medium: getResponsiveSize(22),
    small: getResponsiveSize(16),
    xsmall: getResponsiveSize(12),
    icon: getResponsiveSize(30),
    icon_m: getResponsiveSize(40),
};

export const lineheights = {
    large: fontsizes.large * 1.2,
    medium: fontsizes.medium * 1.2,
    small: fontsizes.small * 1.2,
    xsmall: fontsizes.xsmall * 1.2,
};
