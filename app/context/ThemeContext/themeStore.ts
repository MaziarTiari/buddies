export interface ITheme {
    App: {
        primaryText: string;
        secondaryText: string;
        primaryItem: string;
        layoutBackground: string;
        screenBackground: string;
        menuBackground: string;
        contentBasicButton: string;
        basicItem: string;
        profileIsOnlineDot: string;
        invalidInputBoarder: string;
    };
    ActivityListItem: {
        heartIconOn: string;
    };
    ChatItem: {
        sentMsgBackground: string;
        recievedMsgBackground: string;
    };
}

export type IThemeType = "dark" | "light";

interface IThemeStore {
    dark: ITheme;
    light: ITheme;
}

export const themeStore: IThemeStore = {
    dark: {
        App: {
            primaryText: "#FFFFFF",
            secondaryText: "#B3B3B3",
            primaryItem: "#FFAD1E",
            layoutBackground: "#121618",
            screenBackground: "#1C2329",
            menuBackground: "#26303A",
            contentBasicButton: "#C7D0E5",
            basicItem: "#CAE6D8",
            profileIsOnlineDot: "#79C879",
            invalidInputBoarder: "#DC143C",
        },
        ActivityListItem: {
            heartIconOn: "#FBCF07",
        },
        ChatItem: {
            sentMsgBackground: "#227E62",
            recievedMsgBackground: "#45535F",
        },
    },
    light: {
        App: {
            primaryText: "#000000",
            secondaryText: "#757575",
            primaryItem: "#FFAD1E",
            layoutBackground: "#1CAB7F",
            screenBackground: "#FFFFFF",
            menuBackground: "#222222",
            contentBasicButton: "#979797",
            basicItem: "#645D64",
            profileIsOnlineDot: "#79C879",
            invalidInputBoarder: "red",
        },
        ActivityListItem: {
            heartIconOn: "#FBCF07",
        },
        ChatItem: {
            sentMsgBackground: "#227E62",
            recievedMsgBackground: "#45535F",
        },
    },
};
