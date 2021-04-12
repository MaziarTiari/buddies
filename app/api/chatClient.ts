import { MutableRefObject } from "react";
import { IAddMessageRequest, IChat, IChatMember, IChatUpdateRequest, ICreateChatRequest, IGetChatRequest, IGetMinimumChatRequest, IMessage } from "../models/Chat";
import { apiRoutes } from "./channels";
import useHttpClient from "./httpClient";

interface ReturnValue {
    getChat: (req: IGetChatRequest) => Promise<IChat>;
    createChat: (message: IAddMessageRequest, participantIds: string[]) => Promise<IChat>;
    addMessage: (request: IAddMessageRequest, chatId: string) => Promise<void>;
    getRecentUpdates: (req: IChatUpdateRequest) => Promise<IChat>;
    getAllMinimumChats: () => Promise<IChat[]>;
    getMinimumChat: (req: IGetMinimumChatRequest) => Promise<IChat>;
    userOnChat: (chatId: string) => Promise<void>;
}

export function useChatClient(
    token: MutableRefObject<string>, 
    onExpiredToken: () => Promise<string>
) : ReturnValue {
    
    const httpClient = useHttpClient<IChat>({
        config: {baseURL: apiRoutes.chat()}, 
        token,
        onExpiredToken
    });

    const getChat = (req: IGetChatRequest): Promise<IChat> => 
        httpClient.post<IChat, IGetChatRequest>(apiRoutes.chat("getChat/"), req);

    const createChat = (
        firstMessage: IAddMessageRequest, 
        memberUserIds: string[]
    ): Promise<IChat> => (
        httpClient.create<IChat, ICreateChatRequest>({
            members: memberUserIds.map((id): IChatMember => ({
                isAdmin: false,
                lastTimeOnChat: 0,
                userId: id
            })),
            firstMessage,
        })
    );

    const addMessage = (request: IAddMessageRequest, chatId: string): Promise<void> => (
        httpClient.post<void, IAddMessageRequest>(
            apiRoutes.chat("addMessage/") + chatId, request)
    );

    const getRecentUpdates = (req: IChatUpdateRequest) => (
        httpClient.post<IChat, IChatUpdateRequest>(
            apiRoutes.chat("recentUpdates"),
            req
        )
    );

    const getAllMinimumChats = () => httpClient.get<IChat[]>();

    const getMinimumChat = (req: IGetMinimumChatRequest) => (
        httpClient.post<IChat, IGetMinimumChatRequest>(
            apiRoutes.chat("getMinimumChat"),
            req
        )
    );

    const userOnChat = (chatId: string) => (
        httpClient.get<void>(apiRoutes.chat("userOnChat/") + chatId)
    );

    return ({
        getChat,
        addMessage,
        createChat,
        getRecentUpdates,
        getAllMinimumChats,
        getMinimumChat,
        userOnChat
    })
}
