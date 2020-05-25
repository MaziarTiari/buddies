import React, { useContext, useState } from "react";
import { View, FlatList, Text } from "react-native";
import Container from "../Container/Container";
import { ProfileContext } from "../../context/ProfileContext/ProfileContext";
import { CategorizedInput } from "../../models/User";
import { TouchableRipple } from "react-native-paper";
import useStyle from "./ProfileEditorTagList.style";
import ActionButton from "react-native-action-button";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import CategorizedInputEditor from "../CategorizedInputEditor/CategorizedInputEditor";

export interface IProfileEditorTagListConfig {
    categories: string[];
    type: "jobs" | "hobbies";
}

const ProfileEditorTagList = () => {
    const { profile, saveProfile } = useContext(ProfileContext);
    const { theme } = useContext(ThemeContext);
    const { translations } = useContext(LanguageContext);
    const style = useStyle();
    const route = useRoute();
    const navigation = useNavigation();
    const config = route.params as IProfileEditorTagListConfig;

    navigation.setOptions({
        title:
            config.type == "jobs"
                ? translations.profile_edit_employments
                : translations.profile_edit_hobbies,
    });

    const [editingItem, setEditingItem] = useState<CategorizedInput | undefined>();
    const [showEditor, setShowEditor] = useState<boolean>(false);

    const handleItemPressed = (item: CategorizedInput) => {
        setEditingItem(item);
        setShowEditor(true);
    };

    const handleAddPressed = () => {
        setShowEditor(true);
    };

    const handleCancelPressed = () => {
        setShowEditor(false);
        setEditingItem(undefined);
    };

    const handleSavePressed = (category: string, title: string, institution?: string) => {
        if (editingItem) {
            editingItem.category = category;
            editingItem.title = title;
            editingItem.institution = institution;
        } else {
            const addItem: CategorizedInput = {
                category: category,
                title: title,
                institution: institution,
            };
            switch (config.type) {
                case "hobbies":
                    if (!profile.hobbies) profile.hobbies = [];
                    profile.hobbies.push(addItem);
                    break;
                case "jobs":
                    if (!profile.jobs) profile.jobs = [];
                    profile.jobs.push(addItem);
                    break;
            }
        }
        setEditingItem(undefined);
        setShowEditor(false);
        saveProfile(profile);
    };

    const handleDeletePressed = () => {
        switch (config.type) {
            case "hobbies":
                profile.hobbies = profile.hobbies?.filter((item) => item !== editingItem);
            case "jobs":
                profile.jobs = profile.jobs?.filter((item) => item !== editingItem);
        }
        setShowEditor(false);
        setEditingItem(undefined);
        saveProfile(profile);
    };

    const renderItem = (item: CategorizedInput) => {
        return (
            <TouchableRipple onPress={() => handleItemPressed(item)}>
                <View style={style.container}>
                    <Text numberOfLines={1} style={style.textTitle}>
                        {item.category}
                    </Text>
                    <Text numberOfLines={1} style={style.text}>
                        {item.title}
                    </Text>
                    {item.institution && (
                        <Text numberOfLines={1} style={style.text}>
                            {item.institution}
                        </Text>
                    )}
                </View>
            </TouchableRipple>
        );
    };

    const getData = (): CategorizedInput[] | undefined => {
        switch (config.type) {
            case "jobs":
                return profile.jobs;
            case "hobbies":
                return profile.hobbies;
            default:
                return [];
        }
    };

    return (
        <Container layout="root" type="screen">
            <FlatList
                data={getData()}
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={(item, index) => index.toString()}
                style={style.list}
            />
            <ActionButton
                buttonColor={theme.App.primaryItem}
                onPress={handleAddPressed}
                fixNativeFeedbackRadius={true}
            />
            <CategorizedInputEditor
                visible={showEditor}
                categoryList={config.categories}
                onSave={handleSavePressed}
                onCancel={handleCancelPressed}
                onDelete={handleDeletePressed}
                categoryPlaceholder={
                    config.type === "jobs"
                        ? translations.profile_employment_category_placeholder
                        : translations.profile_hobby_category_placeholder
                }
                titlePlaceholder={
                    config.type === "jobs"
                        ? translations.profile_employment_title_placeholder
                        : translations.profile_hobby_title_placeholder
                }
                institutionPlaceholder={
                    config.type === "jobs"
                        ? translations.profile_employment_institution_placeholder
                        : translations.profile_hobby_institution_placeholder
                }
                headline={
                    config.type === "jobs"
                        ? editingItem
                            ? translations.profile_edit_employment
                            : translations.profile_add_employment
                        : editingItem
                        ? translations.profile_edit_hobby
                        : translations.profile_add_hobby
                }
                preselectedCategory={editingItem?.category}
                preselectedTitle={editingItem?.title}
                preselectedInstitution={editingItem?.institution}
                showDelete={editingItem !== undefined}
            />
        </Container>
    );
};

export default ProfileEditorTagList;
