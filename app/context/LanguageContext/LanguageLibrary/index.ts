import { DictionaryLibrary } from "./type";
import { germanDictionary } from "./dictionaries/de";
import { englishDictionary } from "./dictionaries/en";

export const library: DictionaryLibrary = {
    de: germanDictionary,
    en: englishDictionary,
};
