import { NativeModules, Platform } from "react-native";
import MultiLanguageStorage from "./storage";

const deviceLanguage =
    Platform.OS === "ios"
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;

const defaultLanguage = "en_US";

const translate = (key: string): string => {
    if (!MultiLanguageStorage[key]) return key;
    let value: string = MultiLanguageStorage[key][deviceLanguage];
    if (value) return value;
    value = MultiLanguageStorage[key][defaultLanguage];
    if (value) return value;
    return key;
};

export default translate;
