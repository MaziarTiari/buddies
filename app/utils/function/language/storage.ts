interface IMultiLanguageStorage {
    [key: string]: any;
}

const MultiLanguageStorage: IMultiLanguageStorage = {
    menu_profile: {
        en_US: "Profile",
        de_DE: "Profil",
    },
    menu_feed: {
        en_US: "Buddies",
        de_DE: "Buddies",
    },
    menu_activities: {
        en_US: "Activities",
        de_DE: "Aktivitäten",
    },
    menu_activities_favorites: {
        en_US: "My Favorites",
        de_DE: "Meine Favoriten",
    },
    menu_activities_participated: {
        en_US: "My Activities",
        de_DE: "Meine Aktivitäten",
    },
    menu_chat: {
        en_US: "Messages",
        de_DE: "Nachrichten",
    },
    activities_tab_list: {
        en_US: "List",
        de_DE: "Liste",
    },
    activities_tab_map: {
        en_US: "Map",
        de_DE: "Karte",
    },
    profile_tab_about: {
        en_US: "About",
        de_DE: "Über mich",
    },
    profile_tab_activity: {
        en_US: "Activities",
        de_DE: "Aktivitäten",
    },
    profile_tab_galery: {
        en_US: "Galery",
        de_DE: "Galerie",
    },
    mutual_friends : {
        en_US: "mutual friends",
        de_DE: "gemeinsame Freunde",
    }
};

export default MultiLanguageStorage;
