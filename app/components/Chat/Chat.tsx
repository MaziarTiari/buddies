import React, { useState, useMemo, useEffect, useContext, useRef, MutableRefObject, useCallback } from "react";
import { FlatList, FlatListProps, View, KeyboardAvoidingView, Platform, Text, ActivityIndicator } from "react-native";
import styles from "./Chat.style";
import ChatInput from "../ChatInput/ChatInput";
import Container from "../Container/Container";
import { exampleResponse, IChatMessage } from "../../dev/example_data/ChatReponse";
import ChatItem from "../ChatItem/ChatItem";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getResponsiveSize } from "../../utils/font/font";
import { NavigationRoute } from "react-navigation";
import useAppNavigation from "../../hooks/useAppNavigation";
import { useRoute } from "@react-navigation/native";
import { ChatContext } from "../../context/ChatContext/ChatContext";
import { createMessageId, defaultSentAt, IAddMessageRequest, IChat, IMessage } from "../../models/Chat";
import { SessionContext } from "../../context/SessionContext/SessionContext";
import { useLocalDate } from "../../hooks/useLocalDate";
import moment from 'moment';
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { If } from "react-if";
export interface ChatRouteParams {
    memberIds: string[];
    displayName: string;
}

export default function Chat() {
    const 
        { navigation } = useAppNavigation(),
        route = useRoute(),
        { memberIds, displayName } = route.params as ChatRouteParams,
        { translations } = useContext(LanguageContext),
        { currentChat: chat, ...chatContext } = useContext(ChatContext),
        { user, setErrorMessage } = useContext(SessionContext),
        { getLocalDateString } = useLocalDate(),
        [isLoading, setIsLoading] = useState(false);

    useEffect(() => navigation.setOptions({title: displayName}), []);

    useEffect(() => {
        navigation.addListener("blur", () => chatContext.removeCurrentChat());
        return () => {
            navigation.removeListener("blur", () => chatContext.removeCurrentChat());
        }
    }, [navigation])

    const handleSend = async (body: string) => {
        if (body.trim().length === 0) {
            return;
        }
        const message: IAddMessageRequest = {
            id: createMessageId(user.id),
            body: body,
        }
        if (chat) {
            chatContext.addMessageToCurrentChat(message);
        } else {
            try {
                setIsLoading(true);
                await chatContext.createChat(message, memberIds);
            } catch (error) {
                setErrorMessage(translations.server_error);
                navigation.goBack();
            } finally {
                setIsLoading(false);
            }
        }
    };

    return (
        <Container type="screen" layout="root" style={styles.root} keyboardAvoiding>
                <FlatList
                    data={chat?.messages}
                    renderItem={({ item: message, index: i }) => renderMessage({
                            message, 
                            nextMessage: chat?.messages[i + 1],
                            getDateHandler: getLocalDateString,
                            userId: user.id
                    })}
                    style={styles.list}
                    keyExtractor={m => m.sentAt.toString() + m.authorUserId}
                    inverted
                    initialNumToRender={15}
                    refreshing={isLoading}
                />
                <ChatInput style={styles.inputField} onSend={handleSend} />
        </Container>
    );
};

interface RenderMessageParam {
    message: IMessage; 
    nextMessage: IMessage | undefined;
    userId: string;
    getDateHandler: (t: number) => string;
}

function renderMessage(params: RenderMessageParam) {
    const { message, nextMessage, getDateHandler, userId } = params;
    let showDate: boolean = false;
    const messageLocalDate = getDateHandler(message.sentAt).trim();
    
    if (nextMessage) {
        const nextMessageLocalDate = getDateHandler(nextMessage.sentAt).trim();
        showDate = messageLocalDate !== nextMessageLocalDate;
    } else {
        showDate = true;
    }

    const DateTitle = () => message.sentAt === defaultSentAt 
        ?
            null
        :
            <Text style={{color: "white", margin: getResponsiveSize(5)}}>
                    {messageLocalDate}
            </Text>
        ;
        
    return(
        <View key={message.authorUserId + message.sentAt} style={{alignItems: "center"}}>
            <If condition={showDate}>
                <View style={{marginTop: getResponsiveSize(5)}}><DateTitle /></View>
            </If>
            <ChatItem
                date={message.sentAt > 0 ? message.sentAt : undefined }
                message={message.body}
                self={message.authorUserId === userId}
            />
        </View>
    );
}