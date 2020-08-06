import { Dictionary } from "../DictionaryScope";

export const germanDictionary: Dictionary = {
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
}