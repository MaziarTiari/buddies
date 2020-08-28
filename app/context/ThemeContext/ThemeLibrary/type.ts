export type IThemeType = "dark" | "light";

export interface IThemeLibrary {
    dark: ITheme;
    light: ITheme;
}

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
        acceptColor: string;
        rejectColor: string;
        errorColor: string;
        secondaryAcceptColor: string;
        secondaryRejectColor: string;
        interactiveItem: string;
        secondaryInteractiveItem: string;
        inputBackground: string;
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