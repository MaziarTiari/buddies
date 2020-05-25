import React, { useContext } from "react";
import Container from "../Container/Container";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { RouteName } from "../../navigation/Navigation.config";
import { useNavigation } from "@react-navigation/native";
import ListMenu, { ListMenuItem } from "../ListMenu/ListMenu";
import { IProfileEditorTagListConfig } from "../ProfileEditorTagList/ProfileEditorTagList";

const JobParam: IProfileEditorTagListConfig = {
    type: "jobs",
    categories: ["Angestellter", "Student", "Schüler", "Aushilfskraft", "Auszubildender"],
};

const HobbyParam: IProfileEditorTagListConfig = {
    type: "hobbies",
    categories: ["Sport", "Technik", "Gaming"],
};

const ProfileEditorMenu = () => {
    const navigation = useNavigation();
    const { translations } = useContext(LanguageContext);

    const MenuItems: ListMenuItem[] = [
        {
            title: translations.profile_personal_info,
            navRoute: RouteName.Profile.Editor.Personal,
        },
        {
            title: translations.profile_employments,
            navRoute: RouteName.Profile.Editor.Taglist,
            navParam: JobParam,
        },
        {
            title: translations.profile_hobbies,
            navRoute: RouteName.Profile.Editor.Taglist,
            navParam: HobbyParam,
        },
    ];

    navigation.setOptions({ title: translations.menu_profile_editor });

    return (
        <Container type="screen" layout="root">
            <ListMenu items={MenuItems} />
        </Container>
    );
};

export default ProfileEditorMenu;
