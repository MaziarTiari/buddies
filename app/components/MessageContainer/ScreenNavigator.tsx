import React from "react";
import translate from "../../utils/language/translate";
import MessageContainer from "./MessageContainer";
import StackNavigator from "../StackNavigator/StackNavigator";

const MessageStack = () => {
    return (
        <StackNavigator
            screenDefinitionList={[
                {
                    name: "Chatlist",
                    component: MessageContainer,
                    options: {
                        headerTitle: translate("menu_chat"),
                    },
                },
            ]}
        />
    );
};

export default MessageStack;
