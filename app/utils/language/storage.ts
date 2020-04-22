interface IMultiLanguageStorage {
    [key: string]: any;
}

const MultiLanguageStorage: IMultiLanguageStorage = {
    menu_profile: {
        en_US: "Profile",
        de_DE: "Profil",
    },
    menu_feed: {
        en_US: "Feed",
        de_DE: "Feed",
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
