export interface IThemeStyle {
    App: {
        primaryText: string;
        secondaryText: string;
        primaryItem: string;
        layoutBackground: string;
        screenBackground: string;
        contentBasicButton: string;
        basicItem: string;
        profileIsOnlineDot: string;
    };
    ActivityListItem: {
        heartIconOn: string;
    };
    ChatItem: {
        sentMsgBackground: string;
        recievedMsgBackground: string;
    };
}

export type ITheme = 'dark' | 'light';

interface IThemeStore {
    dark: IThemeStyle;
    light: IThemeStyle;
}

export const themeStore: IThemeStore = {
    dark: {
        App: {
            primaryText: "#FFFFFF",
            secondaryText: "#B3B3B3",
            primaryItem: "#FFAD1E",
            layoutBackground: "#121618",
            screenBackground: "#1C2329",
            contentBasicButton: "#C7D0E5",
            basicItem: "#CAE6D8",
            profileIsOnlineDot: "#79C879",
        },
        ActivityListItem: {
            heartIconOn: "#FBCF07",
        },
        ChatItem: {
            sentMsgBackground: "#227E62",
            recievedMsgBackground: "#45535F"
        },
    },
    light: {
        App: {
            primaryText: "#FFFFFF",
            secondaryText: "#B3B3B3",
            primaryItem: "#FFAD1E",
            layoutBackground: "#121618",
            screenBackground: "#1C2329",
            contentBasicButton: "#C7D0E5",
            basicItem: "#CAE6D8",
            profileIsOnlineDot: "#79C879",
        },
        ActivityListItem: {
            heartIconOn: "#FBCF07",
        },
        ChatItem: {
            sentMsgBackground: "#227E62",
            recievedMsgBackground: "#45535F"
        },
    }
}