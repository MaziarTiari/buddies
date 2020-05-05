import React, { useState, useMemo } from "react";
import { FlatList } from "react-native";
import { 
    exampleResponse, IChatPartner, Relation,
} from "../../dev/example_data/MessageListQueryResponse";
import { RouteName } from "../../utils/function/navigation/configuration";
import { ChatListItem } from "../ChatListItem/ChatListItem";
import Container from "../Container/Container";

const ChatList = ({ navigation }: any) => {
    const [chatPartners, setChatPartners] = useState<IChatPartner[]>(exampleResponse);
    const sortedChatPartners = useMemo<IChatPartner[]>(
        () => chatPartners.sort((a, b) => (b.lastMessage > a.lastMessage ? 1 : -1)),
        [chatPartners]
    );

    const handlePress = (chatPartner: IChatPartner) => {
        navigation.navigate(RouteName.Chat.Chat, {
            isGroup: chatPartner.relation == Relation.GROUP,
            displayName: chatPartner.displayName,
        });
    };

    const handleLongPress = (chatPartner: IChatPartner) => {
        // TODO Open Modal Menu
        console.log("Long Pressed: ", chatPartner.displayName);
    };

    return (
        <Container type="screen" layout="root">
            <Container  type='screen' layout='body'>
                <FlatList
                    data={sortedChatPartners}
                    renderItem={({ item: chatPartner }) => (
                        <ChatListItem
                            chatPartner={chatPartner}
                            onPress={() => handlePress(chatPartner)}
                            onLongPress={() => handleLongPress(chatPartner)}
                        />
                    )}
                    keyExtractor={(chatPartner) => chatPartner.uuid}
                />
            </Container>
        </Container>
    );
};

export default ChatList;
