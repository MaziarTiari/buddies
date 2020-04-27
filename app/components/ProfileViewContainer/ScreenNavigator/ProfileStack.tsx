import React from "react";
import IconButton from "../../IconButton/IconButton";
import translate from "../../../utils/language/translate";
import { ProfileTab } from "./ProfileTab";
import Color from "../../../utils/theme/color";
import StackNavigator from "../../StackNavigator/StackNavigator";
import ProfileInformation from '../ProfileInformation/ProfileInformation'
import FriedListContainer from "../../FriendListContainer/FriendListContainer";

const ProfileStack = () =>
    <StackNavigator initialRouteName="ProfileInformation"
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
            },
            { name:"ProfileInformation", component: ProfileInformation },
            { name:"FriendListContainer", component: FriedListContainer }
        ]} />

export default ProfileStack;
