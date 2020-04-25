import React from "react";
import translate from "../../utils/language/translate";
import ChatListScreen from "./MessageContainer";
import Color from "../../utils/theme/color";
import StackNavigator from "../StackNavigator/StackNavigator";

const ChatStack = () => {
    return (
        <StackNavigator 
            screenDefinitionList= {[
                {
                    name:"Chatlist",
                    component:ChatListScreen,
                    options:{
                        headerTitle: translate("menu_chat"),
                    }
                }
            ]}
        />
    );
};

export default ChatStack;
