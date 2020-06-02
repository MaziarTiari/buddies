import React, { useContext, useState } from "react";
import { View, FlatList, Text } from "react-native";
import Container from "../Container/Container";
import { SessionContext } from "../../context/SessionContext/SessionContext";
import { CategorizedInput } from "../../models/User/UserProfile";
import { TouchableRipple } from "react-native-paper";
import useStyle from "./ProfileEditorTagList.style";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { useRoute, useNavigation } from "@react-navigation/native";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import CategorizedInputEditor from "../CategorizedInputEditor/CategorizedInputEditor";
import ActionButton from "../ActionButton/ActionButton";

export interface IProfileEditorTagListConfig {
    categories: string[];
    type: "jobs" | "hobbies";
}

const ProfileEditorTagList = () => {
    const { userProfile: profile, saveProfile } = useContext(SessionContext);
    const { theme } = useContext(ThemeContext);
    const { translations } = useContext(LanguageContext);
    const style = useStyle();
    const route = useRoute();
    const navigation = useNavigation();
    const config = route.params as IProfileEditorTagListConfig;

    navigation.setOptions({
        title:
            config.type == "jobs"
                ? translations.profile.edit_employments
                : translations.profile.edit_hobbies,
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

    const handleSavePressed = (category: string, title: string, place?: string) => {
        if (editingItem) {
            editingItem.category = category;
            editingItem.title = title;
            editingItem.place = place;
        } else {
            const addItem: CategorizedInput = {
                category: category,
                title: title,
                place: place,
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
                profile.hobbies = profile.hobbies?.filter(
                    (hobby: CategorizedInput) => hobby !== editingItem);
            case "jobs":
                profile.jobs = profile.jobs?.filter(
                    (job: CategorizedInput) => job !== editingItem);
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
                    {item.place && (
                        <Text numberOfLines={1} style={style.text}>
                            {item.place}
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
            <ActionButton onPress={handleAddPressed} text="+" />
            <CategorizedInputEditor
                visible={showEditor}
                categoryList={config.categories}
                onSave={handleSavePressed}
                onCancel={handleCancelPressed}
                onDelete={handleDeletePressed}
                categoryPlaceholder={
                    config.type === "jobs"
                        ? translations.profile.category
                        : translations.profile.category
                }
                titlePlaceholder={
                    config.type === "jobs"
                        ? translations.profile.employment_title_placeholder
                        : translations.profile.hobby_title_placeholder
                }
                institutionPlaceholder={
                    config.type === "jobs"
                        ? translations.profile.employment_institution_placeholder
                        : translations.profile.hobby_institution_placeholder
                }
                headline={
                    config.type === "jobs"
                        ? editingItem
                            ? translations.profile.edit_employment
                            : translations.profile.add_employment
                        : editingItem
                        ? translations.profile.edit_hobby
                        : translations.profile.add_hobby
                }
                preselectedCategory={editingItem?.category}
                preselectedTitle={editingItem?.title}
                preselectedInstitution={editingItem?.place}
                showDelete={editingItem !== undefined}
            />
        </Container>
    );
};

export default ProfileEditorTagList;
