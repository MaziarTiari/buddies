import React from "react";
import IconButton from "../../IconButton/IconButton";
import translate from "../../../utils/language/translate";
import { ProfileTab } from "./ProfileTab";
import Color from "../../../utils/theme/color";
import StackNavigator from "../../StackNavigator/StackNavigator";

const ProfileStack = () =>
    <StackNavigator 
        screenDefinitionList= {[
            {
                name:"Profile",
                component:ProfileTab,
                options:{
                    headerRight: () =>
                        <IconButton
                            color={Color.secondaryText}
                            icon="dots-vertical-circle-outline"
                            onPress={() => {}}
                        />
                    ,
                headerTitle: translate("menu_profile"),
                }
            }
        ]} />

export default ProfileStack;
