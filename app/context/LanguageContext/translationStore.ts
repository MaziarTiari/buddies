export interface IMultiLangLineList {
    menu_profile: string;
    menu_feed: string;
    menu_activities: string;
    menu_activities_favorites: string;
    menu_activities_participated: string;
    menu_chat: string;
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
    },
  }
  
  export type Language = 'de' | 'en';
  
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
        activities_tab_list: "Liste",
        activities_tab_map: "Karte",
        profile_tab_about: "Über mich",
        profile_tab_activity: "Aktivitäten",
        profile_tab_galery: "Galerie",
        mutual_friends : "gemeinsame Freunde",
        message_relation_friend: "mit dir befreundet",
        message_relation_stranger: "nicht befreundet",
        message_relation_blocked: "ist blockiert",
        message_relation_group: "in gemeinsamer Gruppe",
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
      },
      en: {
        menu_profile: "Profile",
        menu_feed: "Buddies",
        menu_activities: "Activities",
        menu_activities_favorites: "My Favorites",
        menu_activities_participated: "My Activities",
        menu_chat: "Messages",
        activities_tab_list: "List",
        activities_tab_map: "Map",
        profile_tab_about: "About",
        profile_tab_activity: "Activities",
        profile_tab_galery: "Galery",
        mutual_friends : "mutual friends",
        message_relation_friend: "you are friends",
        message_relation_stranger: "not your friend",
        message_relation_blocked: "is blocked",
        message_relation_group: "in same group",
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
      }
  };