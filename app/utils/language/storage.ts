interface IMultiLanguageStorage {
    [key: string]: any;
}

const MultiLanguageStorage: IMultiLanguageStorage = {
    menu_profile: {
        en_US: "Profile",
        de_DE: "Profil",
    },
    menu_friends: {
        en_US: "Friends",
        de_DE: "Freunde",
    },
    menu_activities: {
        en_US: "Activities",
        de_DE: "Aktivitäten",
    },
    menu_settings: {
        en_US: "Settings",
        de_DE: "Einstellungen",
    },
};

export default MultiLanguageStorage;
