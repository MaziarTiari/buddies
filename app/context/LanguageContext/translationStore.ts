export interface IMultiLangLineList {
    menu_profile: string;
    menu_feed: string;
    menu_activities: string;
    menu_activities_favorites: string;
    menu_activities_participated: string;
    menu_chat: string;
    menu_profile_editor: string;
    activities_tab_list: string;
    activities_tab_map: string;
    profile_tab_about: string;
    profile_tab_activity: string;
    profile_tab_galery: string;
    mutual_friends: string;
    message_relation_friend: string;
    message_relation_stranger: string;
    message_relation_blocked: string;
    message_relation_group: string;
    profile_friends: string;
    profile_groups: string;
    profile_personal_info: string;
    profile_personal_info_edit: string;
    profile_name: string;
    profile_location: string;
    profile_birthday: string;
    profile_relationshipstate: string;
    profile_sex: string;
    profile_languages: string;
    profile_employments: string;
    profile_employment_preposition: string;
    profile_hobbies: string;
    profile_about_me: string;
    profile_add_employment: string;
    profile_edit_employment: string;
    profile_edit_employments: string;
    profile_employment_category_placeholder: string;
    profile_employment_title_placeholder: string;
    profile_employment_institution_placeholder: string;
    profile_add_hobby: string;
    profile_edit_hobby: string;
    profile_edit_hobbies: string;
    profile_hobby_category_placeholder: string;
    profile_hobby_title_placeholder: string;
    profile_hobby_institution_placeholder: string;
    form: {
        heading: string;
        username: string;
        email: string;
        phone: string;
        birth_date: string;
        city: string;
        password: string;
        repeat_password: string;
        submit_button: string;
    };
    button: {
        save: string;
        cancel: string;
        delete: string;
    };
}

export type Language = "de" | "en";

export interface TranslationStore {
    de: IMultiLangLineList;
    en: IMultiLangLineList;
}

export const translationStore: TranslationStore = {
    de: {
        menu_profile: "Profil",
        menu_feed: "Buddies",
        menu_activities: "Aktivitäten",
        menu_activities_favorites: "Meine Favoriten",
        menu_activities_participated: "Meine Aktivitäten",
        menu_chat: "Nachrichten",
        menu_profile_editor: "Profil bearbeiten",
        activities_tab_list: "Liste",
        activities_tab_map: "Karte",
        profile_tab_about: "Über mich",
        profile_tab_activity: "Aktivitäten",
        profile_tab_galery: "Galerie",
        mutual_friends: "gemeinsame Freunde",
        message_relation_friend: "mit dir befreundet",
        message_relation_stranger: "nicht befreundet",
        message_relation_blocked: "ist blockiert",
        message_relation_group: "in gemeinsamer Gruppe",
        profile_friends: "Freunde",
        profile_groups: "Gruppen",
        profile_personal_info: "Persönliches",
        profile_personal_info_edit: "Persönliches bearbeiten",
        profile_name: "Name",
        profile_location: "Wohnort",
        profile_birthday: "Geburtstag",
        profile_relationshipstate: "Beziehnungsstatus",
        profile_sex: "Geschlecht",
        profile_languages: "Sprachen",
        profile_employments: "Tätigkeiten",
        profile_employment_preposition: "bei",
        profile_hobbies: "Interessen",
        profile_about_me: "Über mich",
        profile_add_employment: "Tätigkeit hinzufügen",
        profile_edit_employment: "Tätigkeit bearbeiten",
        profile_edit_employments: "Tätigkeiten bearbeiten",
        profile_employment_category_placeholder: "Kategorie",
        profile_employment_title_placeholder: "Studiengang, Jobbeschreibung ...",
        profile_employment_institution_placeholder: "Institution, Unternehmen ...",
        profile_add_hobby: "Interesse hinzufügen",
        profile_edit_hobby: "Interesse bearbeiten",
        profile_edit_hobbies: "Interessen bearbeiten",
        profile_hobby_category_placeholder: "Kategorie",
        profile_hobby_title_placeholder: "Beschreibung ...",
        profile_hobby_institution_placeholder: "Institution, Verein, Gruppe ...",
        form: {
            heading: "Registrieren",
            username: "Benutzername",
            email: "Email",
            phone: "Mobil",
            birth_date: "Geburtsdatum",
            city: "Stadt",
            password: "Passwort",
            repeat_password: "Passwort wiederholen",
            submit_button: "Registrieren",
        },
        button: {
            save: "Speichern",
            cancel: "Abbrechen",
            delete: "Löschen",
        },
    },
    en: {
        menu_profile: "Profile",
        menu_feed: "Buddies",
        menu_activities: "Activities",
        menu_activities_favorites: "My Favorites",
        menu_activities_participated: "My Activities",
        menu_chat: "Messages",
        menu_profile_editor: "Edit Profile",
        activities_tab_list: "List",
        activities_tab_map: "Map",
        profile_tab_about: "About",
        profile_tab_activity: "Activities",
        profile_tab_galery: "Galery",
        mutual_friends: "mutual friends",
        message_relation_friend: "you are friends",
        message_relation_stranger: "not your friend",
        message_relation_blocked: "is blocked",
        message_relation_group: "in same group",
        profile_friends: "Friends",
        profile_groups: "Groups",
        profile_personal_info: "Personal Information",
        profile_personal_info_edit: "Edit Personal Information",
        profile_name: "Name",
        profile_location: "Home",
        profile_birthday: "Birthday",
        profile_relationshipstate: "Relationship State",
        profile_sex: "Sex",
        profile_languages: "Languages",
        profile_employments: "Employments",
        profile_employment_preposition: "at",
        profile_hobbies: "Interests",
        profile_about_me: "About Me",
        profile_edit_employment: "Edit Employment",
        profile_edit_employments: "Edit Employments",
        profile_add_employment: "Add Employment",
        profile_employment_category_placeholder: "Category",
        profile_employment_title_placeholder: "Course of study, Job description ....",
        profile_employment_institution_placeholder: "Institution, Company ...",
        profile_add_hobby: "Add Interest",
        profile_edit_hobby: "Edit Interest",
        profile_edit_hobbies: "Edit Interests",
        profile_hobby_category_placeholder: "Choose Category ...",
        profile_hobby_title_placeholder: "Description ...",
        profile_hobby_institution_placeholder: "Institution, Club, Group ...",
        form: {
            heading: "Sign Up",
            username: "Username",
            email: "Email",
            phone: "Cellphone",
            birth_date: "Birth date",
            city: "City",
            password: "Password",
            repeat_password: "Repeat Passwort",
            submit_button: "Sign Up",
        },
        button: {
            save: "Save",
            cancel: "Cancel",
            delete: "Delete",
        },
    },
};
