import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { ChatRouteParams } from "../components/Chat/Chat";
import { ChatContext } from "../context/ChatContext/ChatContext";
import { RouteName } from "../navigation/Navigation.config";

export default function useAppNavigation() {
    const navigation = useNavigation();
    const { setupChatToRender } = useContext(ChatContext);

    const goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    }

    const navigateToChat = (params: ChatRouteParams) => {
        setupChatToRender(params.memberIds).finally(() => 
            navigation.navigate(RouteName.Messages.Chat, params)
        );
    }

    return {
        navigation: { ...navigation,  goBack, navigateToChat }
    }
}
