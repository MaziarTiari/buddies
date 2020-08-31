export type Language = "de" | "en";

export interface DictionaryLibrary {
    de: Dictionary;
    en: Dictionary;
}

export interface Dictionary {

    // General
    please_wait: string;
    feed: string;
    activities: string;
    my_activities: string;
    favorites: string;
    explore: string;
    messages: string;
    message: string;
    edit_profile: string;
    about_me: string;
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
    profile: string;
    register: string;
    login: string;
    logout: string;
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
    start_date: string;
    end_date: string;
    visibility: string;
    member: string;
    applicants: string;
    sent_application: string;
    application_is_hidden: string;
    title: string;
    apply_changes: string;
    apply: string;
    hide: string;
    create: string;
    settings: string;
    theme: string;
    language: string;
    activity_title_hint: string;
    upload_from_filesystem: string;
    upload_from_camera: string;
    remove_image: string;
    error: string;
    continue: string;
    open: string;
    from: string;
    until: string;

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
    wrong_login: string;
    wrong_date_range: string;

    // Prepositions
    job_preposition: string;
}