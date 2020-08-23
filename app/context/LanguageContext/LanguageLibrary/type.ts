export type Language = "de" | "en";

export interface DictionaryLibrary {
    de: Dictionary;
    en: Dictionary;
}

export interface Dictionary {

    // General
    please_wait: string;
    profile: string;
    feed: string;
    activities: string;
    my_activities: string;
    favorites: string;
    explore: string;
    messages: string;
    edit_profile: string;
    about: string;
    gallery: string;
    firstname: string;
    surname: string;
    email: string;
    phone: string;
    username: string;
    fullname: string;
    city: string;
    birthdate: string;
    friends: string;
    groups: string;
    sex: string;
    male: string;
    female: string;
    diverse: string;
    jobs: string;
    hobbies: string;
    biography: string;
    register: string;
    login: string;
    password: string;
    repeat_password: string;
    password_mismatch: string;
    create_your_profile: string;
    create_your_account: string;
    please_log_in: string;
    save: string;
    cancel: string;
    delete: string;
    description: string;
    category: string;
    personal: string;
    information: string;
    meeting_point: string;
    start_time: string;
    end_time: string;
    start_time_optional: string;
    end_time_optional: string;
    visibility: string;
    member: string;
    applicants: string;
    title: string;
    apply_changes: string;
    apply: string;
    hide: string;
    create: string;
    settings: string;
    theme: string;
    language: string;

    // Tags: Hobbies
    my_hobbies: string;
    add_hobby: string;
    edit_hobby: string;
    place_or_club_optional: string;

    // Tags: Jobs
    my_jobs: string;
    add_job: string;
    edit_job: string;
    company_or_institution_optional: string;

    // Tags: Subjects
    subjects: string;
    add_subject: string;
    edit_subject: string;

    // Relations
    is_friend: string;
    is_stranger: string;
    is_blocked: string;
    is_group: string;

    // Error Messages
    error_invalid_email: string;
    error_invalid_number: string;
    error_invalid_phone: string;

    // Prepositions
    date_range_preposition: string;
}