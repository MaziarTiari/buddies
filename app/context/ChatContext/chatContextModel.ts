import { IAddMessageRequest, IChat, IMessage } from "../../models/Chat";

export interface ChatContextModel {
    createChat: (message: IAddMessageRequest, participantIds: string[]) => Promise<IChat>;
    setupChatToRender: (participantIds: string[]) => Promise<void>;
    getChat: (participantIds: string[]) => Promise<IChat>;
    addMessageToCurrentChat: (message: IAddMessageRequest) => void;
    currentChat: IChat | undefined;
    removeCurrentChat: () => void;
    isLoading: boolean;
    setIsLoading: (state: boolean) => void;
    chats: IChat[];
}

const defaultChat: IChat = {
    id: "",
    members: [{isAdmin: false, lastTimeOnChat: 0, userId: ""}],
    messages: [],
    updatedAt: 0,
    createdAt: 0,
    messageListIndex: 0
}
export const initState: ChatContextModel = {
    createChat: async ({}, []) => { throw new Error("createChat not implemented") },
    addMessageToCurrentChat: ({}) => console.warn("addMessageToCurrentChat not implemented"),
    getChat: async () => defaultChat,
    setupChatToRender: async () => console.warn("showChat not implemented"),
    currentChat: undefined,
    removeCurrentChat: () => console.warn("setCurrentChatId not implemented"),
    isLoading: false,
    setIsLoading: () => console.warn("setIsLoading not implemented"),
    chats: [],
} 