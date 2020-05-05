import { Platform, NativeModules, Dimensions } from "react-native";

export class Device {
    readonly width: number;
    readonly height: number;
    readonly language = Platform.OS === "ios"
                      ? NativeModules.SettingsManager.settings.AppleLocale ||
                        NativeModules.SettingsManager.settings.AppleLanguages[0]
                      : NativeModules.I18nManager.localeIdentifier;

    constructor() {
        const dimension = Dimensions.get('screen');
        const isLandscape = dimension.width > dimension.height ? true : false;
        this.width = isLandscape ? dimension.height : dimension.width;
        this.height = isLandscape ? dimension.width : dimension.height;
    }
}