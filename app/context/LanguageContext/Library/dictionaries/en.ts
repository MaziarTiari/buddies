import { Dictionary } from "../DictionaryScope";

export const englishDictionary: Dictionary = {
    menu_profile: "Profile",
    menu_feed: "Buddies",
    menu_activities: "Activities",
    menu_activities_favorites: "My Favorites",
    menu_activities_participated: "My Activities",
    menu_map: "Explore",
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
        members: "Member",
        applicants: "Applicants",
    }
}