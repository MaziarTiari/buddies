import moment from 'moment';

export interface IChatMember {
    userId: string;
    isAdmin: boolean;
    lastTimeOnChat: number;
}

interface IWithChatMembers {
    members: IChatMember[];
}

interface IChatMeta extends IWithChatMembers {
    updatedAt: number;
}

export interface IChat extends IChatMeta {
    id: string;
    messages: IMessage[];
    createdAt: number;
    messageListIndex: number;
}

export interface IChatUpdateRequest {
    chatId: string;
    lastAuthorUserId: string;
    lastMessageSentAt: number
}

export interface IGetChatRequest {
    chatId: string;
    messageListIndex: number;
}

export interface ICreateChatRequest extends IWithChatMembers {
    firstMessage: IAddMessageRequest;
}

export interface IAddMessageRequest {
    id: string;
    body: string;
}

export interface IMessage extends IAddMessageRequest {
    authorUserId: string;
    sentAt: number;
}

export interface INewMessage {
    chatId: string;
    message: IMessage;
}

export interface IGetMinimumChatRequest {
    memberUserIds: string[];
}

export const defaultSentAt = 0;

export const createMessageId = (userId: string) => userId + moment().valueOf().toString();