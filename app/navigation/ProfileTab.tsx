import React, { useContext } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProfileAbout from "../components/ProfileAbout/ProfileAbout";
import ProfileGallery from "../components/ProfileGallery/ProfileGallery";
import { useNavOption, RouteName } from "./Navigation.config";
import { LanguageContext } from "../context/LanguageContext/LanguageContext";
import { useRoute, useFocusEffect, useNavigation } from "@react-navigation/native";
import { SessionContext } from "../context/SessionContext/SessionContext";

const Tab = createMaterialTopTabNavigator();

const ProfileTab = () => {
    const tabBarOptions = useNavOption().tabBar;
    const { translations } = useContext(LanguageContext);
    const navigation = useNavigation();
    const route = useRoute();
    const { fetchUserProfile, user, userProfile } = useContext(SessionContext);

    useFocusEffect(() => {
        // fetch own profile when user clicks on profile in bottom tab
        if (route.name === RouteName.Profile.OwnTab) {
            fetchUserProfile(user.id)
            .then(userProfile => navigation.setOptions({ title: userProfile.username }));
        }
        navigation.setOptions({ title: userProfile.username })
    });

    return (
        <Tab.Navigator tabBarOptions={tabBarOptions}>
            <Tab.Screen
                name={RouteName.Profile.About}
                component={ProfileAbout}
                options={{ tabBarLabel: translations.profile }}
            />
            <Tab.Screen
                name={RouteName.Profile.Gallery}
                component={ProfileGallery}
                options={{ tabBarLabel: translations.gallery }}
            />
        </Tab.Navigator>
    );
}

export default ProfileTab;
