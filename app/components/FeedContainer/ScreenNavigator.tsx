import React from "react";
import translate from "../../utils/language/translate";
import FeedContainer from "./FeedContainer";
import StackNavigator from "../StackNavigator/StackNavigator";


const FeedScreenNavigator = () => {
    return (
        <StackNavigator 
            screenDefinitionList={[   
                {
                    name:"Feed",
                    component:FeedContainer,
                    options:{
                        headerTitle: translate("menu_feed"),
                    }
                }
            ]}
            />
    );
};

export default FeedScreenNavigator;
