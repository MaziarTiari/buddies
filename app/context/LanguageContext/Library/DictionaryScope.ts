export type Language = "de" | "en";

export interface DictionaryLibrary {
    de: Dictionary;
    en: Dictionary;
}

export interface Dictionary {
    menu_profile: string;
    menu_feed: string;
    menu_activities: string;
    menu_activities_favorites: string;
    menu_activities_participated: string;
    menu_map: string;
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