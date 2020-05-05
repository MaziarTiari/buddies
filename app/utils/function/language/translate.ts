import MultiLanguageStorage from "./storage";
import { Device } from "../../class/Device";

const device = new Device();

const defaultLanguage = "en_US";

const translate = (key: string): string => {
    if (!MultiLanguageStorage[key]) return key;
    let value: string = MultiLanguageStorage[key][device.language];
    if (value) return value;
    value = MultiLanguageStorage[key][defaultLanguage];
    if (value) return value;
    return key;
};

export default translate;
