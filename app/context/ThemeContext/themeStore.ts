export interface ITheme {
    App: {
        primaryText: string;
        secondaryText: string;
        defaultInputFontColor: string;
        primaryItem: string;
        layoutBackground: string;
        screenBackground: string;
        menuBackground: string;
        contentBasicButton: string;
        basicItem: string;
        profileIsOnlineDot: string;
        invalidInputBoarder: string;
        devider: string;
        buttonBackground: string;
        labelLinkColor: string;
        errorColor: string;
    };
    ActivityListItem: {
        heartIconOn: string;
    };
    ChatItem: {
        sentMsgBackground: string;
        recievedMsgBackground: string;
    };
    Button: {
        dangerousColor: string;
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
            defaultInputFontColor: "#000000",
            primaryItem: "#FFAD1E",
            layoutBackground: "#121618",
            screenBackground: "#1C2329",
            menuBackground: "#26303A",
            contentBasicButton: "#C7D0E5",
            basicItem: "#CAE6D8",
            profileIsOnlineDot: "#79C879",
            invalidInputBoarder: "#DC143C",
            devider: "#374758",
            buttonBackground: "#C2821F",
            labelLinkColor: "#20FEC8",
            errorColor: "#FF7573"
        },
        ActivityListItem: {
            heartIconOn: "#FBCF07",
        },
        ChatItem: {
            sentMsgBackground: "#227E62",
            recievedMsgBackground: "#45535F",
        },
        Button: {
            dangerousColor: "#DC143C",
        },
    },
    light: {
        App: {
            defaultInputFontColor: "#000000",
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
            devider: "#374758",
            buttonBackground: "#C2821F",
            labelLinkColor: "#20FEC8",
            errorColor: "#FF322F"
        },
        ActivityListItem: {
            heartIconOn: "#FBCF07",
        },
        ChatItem: {
            sentMsgBackground: "#227E62",
            recievedMsgBackground: "#45535F",
        },
        Button: {
            dangerousColor: "red",
        },
    },
};
