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
    formInput: {
        error: {
            password: string;
            email: string;
            number: string;
            phone: string;
        }
    }
    profile: {
        firstname: string;
        lastname: string;
        email: string;
        phone: string;
        username: string;
        friends: string;
        groups: string;
        personal_info: string;
        personal_info_edit: string;
        name: string;
        city: string;
        birthDate: string;
        relationshipstate: string;
        gender: string;
        gender_pick_labels: {
            male: string;
            female: string;
            other: string;
        };
        languages: string;
        employments: string;
        employment_preposition: string;
        hobbies: string;
        about_me: string;
        editor: {
            hobbies: {
                editor_heading: string;
                heading_when_add: string;
                heading_when_edit: string;
                hobbie_title_label: string;
                place_label: string;
            }
        },
        add_employment: string;
        edit_employment: string;
        edit_employments: string;
        category: string;
        employment_title_placeholder: string;
        employment_institution_placeholder: string;
        add_hobby: string;
        edit_hobby: string;
        edit_hobbies: string;
        hobby_title_placeholder: string;
        hobby_institution_placeholder: string;
    }
    ScreenHeading: {
        register: string;
        login: string;
        createProfile: string;
    }
    createProfile: {
        errorMessage: {
            username: {
                pattern: string;
                conflict: string
            };
            notFound: string;
        },
        submit_button: string;
    };
    login: {
        errorMessages: {
            email: string;
            password: string;
        }
        submit_button: string;
    }
    register: {
        errorMessage: {
            password: string;
            email: string;
        };
        password: string;
        repeat_password: string;
        submit_button: string;
    };
    apiRequestError: {
        responceError: string;
    };
    button: {
        save: string;
        cancel: string;
        delete: string;
    };
    activity: {
        description: string;
        information: string;
        location: string;
        startTime: string;
        endTime: string;
        hobbies: string;
        criteria: string;
        visibility: string;
        maxApplications: string;
        applicationDeadline: string;
        reqLocation: string;
        reqSex: string;
        reqAge: string;
        reqRelationshipState: string;
        reqJob: string;
        reqLanguage: string;
        members: string;
    }
    dateRangePreposition: string;
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
        formInput: {
            error: {
                email: "Gib bitte eine korrekte Email Adresse ein",
                password: "",
                number: "Nur Nummer als Eingabe erlaubt",
                phone: "Keine korrekte Telefonnummer",
            }
        },
        profile: {
            firstname: "Vorname",
            lastname: "Nachname",
            email: "Email",
            phone: "Mobil",
            username: "Benutzername",
            friends: "Freunde",
            groups: "Gruppen",
            personal_info: "Persönliches",
            personal_info_edit: "Persönliches bearbeiten",
            name: "Name",
            city: "Wohnort",
            birthDate: "Geburtdatum",
            relationshipstate: "Beziehnungsstatus",
            gender: "Geschlecht",
            gender_pick_labels: {
                female: "Weiblich",
                male: "Männlich",
                other: "Drittes Geschlecht"
            },
            languages: "Sprachen",
            employments: "Tätigkeiten",
            employment_preposition: "bei",
            hobbies: "Interessen",
            about_me: "Über mich",
            editor: {
                hobbies: {
                    editor_heading: "Was sind deine Hobbies?",
                    heading_when_add: "Hobby hinzufügen",
                    heading_when_edit: "Möchtest du was ändern?",
                    hobbie_title_label: "Ich laufe gerne, und du?",
                    place_label: "Ort, Verein..."
                }
            },
            add_employment: "Tätigkeit hinzufügen",
            edit_employment: "Tätigkeit bearbeiten",
            edit_employments: "Tätigkeiten bearbeiten",
            category: "Kategorie",
            employment_title_placeholder: "Studiengang, Jobbeschreibung ...",
            employment_institution_placeholder: "Institution, Unternehmen ...",
            add_hobby: "Interesse hinzufügen",
            edit_hobby: "Interesse bearbeiten",
            edit_hobbies: "Interessen bearbeiten",
            hobby_title_placeholder: "Beschreibung ...",
            hobby_institution_placeholder: "Institution, Verein, Gruppe ...",

        },
        ScreenHeading: {
            register: "Registrieren",
            login: "Bitte melde dich an",
            createProfile: "Erstelle ein Profil",
        },
        createProfile: {
            errorMessage: {
                username: {
                    pattern: "Nur Buchstaben, Zieffern und dise Sonderzeichen erlaubt . - _",
                    conflict: "Der Name existiert schon bereits",
                },
                notFound: "Benutzer konnte nicht gefunden werden"
            },
            submit_button: "Profil erstellen"
        },
        login: {
            errorMessages: {
                email: "Die Email Adresse existiert nicht",
                password: "Das Passwort ist nicht korrekt",
            },
            submit_button: "Einloggen"
        },
        apiRequestError: {
            responceError: "Es gibt einen Problem, wir kümmern uns so schnell wie möglich",
        },
        register: {
            password: "Passwort",
            repeat_password: "Passwort wiederholen",
            submit_button: "Registrieren",
            errorMessage: {
                password: "Die Passwörter stimmen nicht überein",
                email: "Die Email Adresse existiert bereits",
            }
        },
        button: {
            save: "Speichern",
            cancel: "Abbrechen",
            delete: "Löschen",
        },
        dateRangePreposition: "bis",
        activity: {
            description: "Beschreibung",
            information: "Informationen",
            location: "Treffpunkt",
            startTime: "Beginn",
            endTime: "Ende",
            hobbies: "Themen",
            criteria: "Teilnahmekriterien",
            visibility: "Sichbarkeit",
            maxApplications: "Max. Teilnehmerzahl",
            applicationDeadline: "Bewerbungsfrist",
            reqLocation: "Wohnort + Umkreis",
            reqSex: "Geschlecht",
            reqAge: "Mindestalter",
            reqRelationshipState: "Beziehungsstatus",
            reqJob: "Tätigkeiten",
            reqLanguage: "Sprache",
            members: "Teilnehmer",
        }
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
        formInput: {
            error: {
                email: "Please enter a valid email address",
                password: "",
                number: "Please enter a number",
                phone: "Please enter a valid phone number",
            }
        },
        profile: {
            firstname: "Firstname",
            lastname: "Lastname",
            email: "Email",
            phone: "Cellphone",
            username: "Username",
            friends: "Friends",
            groups: "Groups",
            personal_info: "Personal Information",
            personal_info_edit: "Edit Personal Information",
            name: "Name",
            city: "Home",
            birthDate: "Birthday",
            relationshipstate: "Relationship State",
            gender: "Gender",
            gender_pick_labels: {
                female: "Female",
                male: "Male",
                other: "Third gender"
            },
            languages: "Languages",
            employments: "Employments",
            employment_preposition: "at",
            hobbies: "Interests",
            about_me: "About Me",
            editor: {
                hobbies: {
                    editor_heading: "What are your Hobbies?",
                    heading_when_add: "Add new Hobby",
                    heading_when_edit: "Need to change something?",
                    hobbie_title_label: "I love hiking, and you?",
                    place_label: "Place, Club..."
                }
            },
            edit_employment: "Edit Employment",
            edit_employments: "Edit Employments",
            add_employment: "Add Employment",
            category: "Category",
            employment_title_placeholder: "Course of study, Job description ....",
            employment_institution_placeholder: "Institution, Company ...",
            add_hobby: "Add Interest",
            edit_hobby: "Edit Interest",
            edit_hobbies: "Edit Interests",
            hobby_title_placeholder: "Description ...",
            hobby_institution_placeholder: "Institution, Club, Group ...",
        },
        ScreenHeading: {
            register: "Sign Up",
            login: "Sign In",
            createProfile: "Create a profile",
        },
        createProfile: {
            errorMessage: {
                username: {
                    pattern: "Only characters, numbers and this symols . - _ are allowed",
                    conflict: "Username already exists",
                },
                notFound: "Can not find user"
            },
            submit_button: "Create Profile"
        },
        login: {
            errorMessages: {
                email: "Couldn't find email address",
                password: "Incorrect password"
            },
            submit_button: "Einloggen"
        },
        apiRequestError: {
            responceError: "There has been a problem, we give our best to solve it asap"
        },
        register: {
            password: "Password",
            repeat_password: "Repeat Password",
            submit_button: "Sign Up",
            errorMessage: {
                password: "Both passwords should be equal",
                email: "This email address already exists"
            }
        },
        button: {
            save: "Save",
            cancel: "Cancel",
            delete: "Delete",
        },
        dateRangePreposition: "to",
        activity: {
            description: "Description",
            information: "Information",
            location: "Meeting Point",
            startTime: "Start",
            endTime: "End",
            hobbies: "Subjects",
            criteria: "Eligibility Criteria",
            visibility: "Visibility",
            maxApplications: "Max. Participations",
            applicationDeadline: "Application Deadline",
            reqLocation: "Location + Radius",
            reqSex: "Sex",
            reqAge: "Minimum Age",
            reqRelationshipState: "Relationship State",
            reqJob: "Employments",
            reqLanguage: "Language",
            members: "Member"
        }
    },
};
