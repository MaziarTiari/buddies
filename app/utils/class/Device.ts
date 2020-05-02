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
        const isLandscape = this.isLandscape();
        this.width = isLandscape ? dimension.height : dimension.width;
        this.height = isLandscape ? dimension.width : dimension.height;
    }

    public isLandscape = () => {
        const d = Dimensions.get('screen');
        return d.width > d.height ? true : false;
    }
}