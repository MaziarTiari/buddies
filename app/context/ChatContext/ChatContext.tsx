import React, { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { useChatClient } from '../../api/chatClient';
import { IChat, IMessage, IAddMessageRequest, defaultSentAt, createMessageId, INewMessage } from '../../models/Chat';
import { Utilities } from '../../utils/AppUtilities';
import { SessionContext } from '../SessionContext/SessionContext';
import { ChatContextModel, initState } from './chatContextModel';
import { AuthState } from '../SessionContext/sessionContextModel';
import { HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { baseUrl, hubs } from '../../api/channels';
import { ProfileContext } from '../ProfileContext/ProfileContext';
import moment from 'moment';
import { useLocalDate } from '../../hooks/useLocalDate';

export const ChatContext = createContext<ChatContextModel>(initState);

export default function ChatContextProvider(props: {children: ReactNode}) {
    
    const { 
        accessTokenFactory, 
        token,
        authenticate, 
        authState, 
        user, 
        setErrorMessage } = useContext(SessionContext);
    
    const chatApiClient = useChatClient(token, authenticate);
    
    const [chats, setChats] = useState<IChat[]>([]);

    const [currentChat, setCurrentChat] = useState<IChat|undefined>();

    const [
        lastMessageListIndex, 
        setLastMessageListIndex ] = useState<number|undefined>(undefined);

    const [isLoading, setIsLoading] = useState(initState.isLoading);

    const { fetchAvatars } = useContext(ProfileContext);

    const [subscribedChatIds, setSubscribedChatIds] = useState<string[]>([]);

    const { getLocalTimeString } = useLocalDate();

    const chatHubConnection = useMemo(() => {
        if (authState === AuthState.AUTHENTICATED) {
            const connection = new HubConnectionBuilder()
            .withUrl(baseUrl + hubs.chat.connection, { accessTokenFactory })
            .withAutomaticReconnect()
            .build();
            
            connection
            .start()
            .then(() => console.log('Chat-Hub connection started!'))
            .catch((error: Error) => setErrorMessage(error.message))

            return connection;
        }
    }, [authState]);

    useEffect(() => {
        if (!chatHubConnection) {
            return;
        }
        chatHubConnection.onclose((error) => {
            let notConnected = true;
            let waitingPeriod = 0;
            const userInfo = "Please wait while we are are trying to reconnect."
            if (error) {
                setErrorMessage(error.message + "\n" + userInfo);
            } else {
                setErrorMessage("We have websocket-connection problems. " + userInfo);
            }
            const timeoutIds: NodeJS.Timeout[] = [];
            while (notConnected) {
                timeoutIds.push(setTimeout(() => {
                    chatHubConnection
                        .start()
                        .then(() => {
                            alert("Success: we are connected again!");
                            notConnected = false;
                            timeoutIds.forEach(t => clearTimeout(t));
                        })
                        .catch(() => waitingPeriod = Math.pow(waitingPeriod, 1.1));
                }, waitingPeriod));
            }
        });
        return () => {
            chatHubConnection.stop();
        }
    }, [chatHubConnection]);
    
    useEffect(() => {
        if (authState === AuthState.AUTHENTICATED) {
            chatApiClient.getAllMinimumChats().then(res => {
                setChats(res);
                const memberUserIds: string[] = [];
                res.forEach(c => {
                    const cm = getMemberUserIs(c);
                    cm.forEach(m => memberUserIds.push(m));
                });
                fetchAvatars(memberUserIds);
            });
        }
    }, [authState])

    const createChat = (
        message: IAddMessageRequest, 
        participantIds: string[]
        ): Promise<IChat> => (
        chatApiClient
            .createChat(message, participantIds)
            .then(chat => {
                setChats([...chats, chat]);
                setCurrentChat(chat);
                return chat;
            })
    );

    function upsertChat(chat: IChat) {
        const index = chats.findIndex(c => c.id === chat.id);
        if (index < 0) {
            setChats([chat]);
            return;
        }
        const newChats = [...chats];
        newChats[index] = chat;
        setChats(newChats)
    }

    const getUpdatedChat = (chatToUpdate: IChat, update: IChat): IChat => {
        for (let i = update.messages.length - 1; i >= 0; i--) {
            chatToUpdate.messages.unshift(update.messages[i]);
        }
        return ({
            id: chatToUpdate.id,
            members: update.members,
            updatedAt: update.updatedAt,
            messages: chatToUpdate.messages,
            createdAt: chatToUpdate.createdAt,
            messageListIndex: chatToUpdate.messageListIndex
        });
    };

    function addMessageToCurrentChat(req: IAddMessageRequest) {
        if (!currentChat) {
            return
        }
        const message: IMessage = {
            id: req.id,
            body: req.body,
            authorUserId: user.id,
            sentAt: defaultSentAt
        }
        currentChat.messages.unshift(message);
        setCurrentChat({...currentChat});
        chatApiClient.addMessage(req, currentChat.id);
    }

    function getRecentUpdates(chat: IChat): Promise<IChat> {
        const lastMessage = chat.messages[0];
        return chatApiClient.getRecentUpdates({
            chatId: chat.id,
            lastAuthorUserId: lastMessage.authorUserId,
            lastMessageSentAt: chat.updatedAt,
        })
            .then(res => {
                if (res) {
                    const newChat = getUpdatedChat(chat, res);
                    upsertChat(newChat);
                    return newChat;
                }
                return chat;
            });
    }

    function getMemberUserIs(chat: IChat) {
        const memberUserIds: string[] = [];
        chat.members.forEach(m => {
            if (m.userId !== user.id) {
                memberUserIds.push(m.userId);
            }
        })
        return memberUserIds;
    }

    async function getChat(memberIds: string[]): Promise<IChat>{
        let _chat = chats.find(c => 
            Utilities.arraysEqual(c.members.map(m => m.userId), memberIds));
        if (_chat) {
            return getRecentUpdates(_chat);
        }
        let memberUserIds: string[] = [];
        const chat = chatApiClient.getMinimumChat({memberUserIds: memberIds})
            .then(c => {
                setChats(chats => [...chats, c]);
                memberUserIds = getMemberUserIs(c);
                return c;
            });
        if (memberUserIds.length > 0) {
            fetchAvatars(memberUserIds);
        }
        return chat;
    }

    useEffect(() => {
        if (!currentChat) {
            return;
        } else if (currentChat.messages.length < 20) {
            getFurtherMessages(currentChat);
        }
    }, [currentChat]);

    async function getFurtherMessages(chat: IChat) {
        if (chat.messageListIndex === lastMessageListIndex) {
            return;
        }
        const nextIndex = chat.messageListIndex + 1;
        chatApiClient.getChat({chatId: chat.id, messageListIndex: nextIndex })
            .then(c => {
                setCurrentChat({ 
                    ...chat,
                    messageListIndex: nextIndex,
                    messages: [...chat.messages, ...c.messages]
                })
            }).catch(() => setLastMessageListIndex(chat.messageListIndex));
    }

    async function setupChatToRender(memberIds: string[]) {
        return getChat(memberIds).then(c => {
            setCurrentChat(c);
        }).catch(() => {
            setCurrentChat(undefined);
        });
    }

    function removeCurrentChat() {
        if (!currentChat) {
            return;
        }
        currentChat.members.find(m => m.userId === user.id)!.lastTimeOnChat = moment().unix();
        upsertChat(currentChat);
        chatApiClient.userOnChat(currentChat.id);
        setCurrentChat(undefined);
    }

    useEffect(() => {
        chatHubConnection?.on("newChat", (newChat: IChat) => {
            setChats(chats => [...chats, newChat]);
            chatHubConnection.invoke(hubs.chat.subscribeChat, newChat.id);
            fetchAvatars(getMemberUserIs(newChat));
        });
        return () => {
            chatHubConnection?.off("newChat");
        }
    }, [chatHubConnection]);

    function upsertMessage(chat: IChat, message: IMessage): IChat {
        const index = chat.messages.findIndex(m => m.id === message.id);
        if (index < 0) {
            chat.messages.unshift(message);
        } else {
            chat.messages[index] = message;
        }
        return { ...chat };
    }

    useEffect(() => {
        chatHubConnection?.on("newMessage", (newMessage: INewMessage) => {
            console.log("FOR USER WITH ID: ", user.id);
            console.log('MESSAGE: ', newMessage.message);
            if (currentChat?.id === newMessage.chatId) {
                const newChat = upsertMessage(currentChat, newMessage.message);
                setCurrentChat(newChat);
            } else {
                const index = chats.findIndex(c => c.id === newMessage.chatId);
                if (index >= 0) {
                    const newChat = upsertMessage(chats[index], newMessage.message);
                    chats[index] = newChat;
                    setChats([...chats]);
                }
            }
        });
        return () => {
            chatHubConnection?.off("newMessage");
        }
    }, [chatHubConnection, chats, currentChat]);

    useEffect(() => {
        const chatIds: string[] = [];
        if (chatHubConnection) {
            chats.forEach(c => {
                if (!subscribedChatIds.includes(c.id)) {
                    chatIds.push(c.id);
                }
            });
            chatHubConnection.invoke(hubs.chat.subscribeChats, chatIds)
                .then(() => setSubscribedChatIds(ids => [...ids, ...chatIds]));
        }
        return () => {
            if (chatHubConnection) {
                chatHubConnection.invoke(hubs.chat.unsubscribeChats, chatIds);
            }
        }
    }, [chatHubConnection, chats])

    const value: ChatContextModel = {
        createChat,
        addMessageToCurrentChat,
        getChat,
        currentChat,
        removeCurrentChat,
        setupChatToRender,
        isLoading,
        setIsLoading,
        chats
    }
    
    return (
        <ChatContext.Provider value={value}>
            {props.children}
        </ChatContext.Provider>
    );
}