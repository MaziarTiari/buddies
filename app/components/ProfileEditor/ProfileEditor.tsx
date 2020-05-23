import React, { useContext, useState } from "react";
import { Text, ScrollView, View } from "react-native";
import Container from "../Container/Container";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import InputField from "../InputField/InputField";
import { getResponsiveSize } from "../../utils/font/font";
import TagItem, { TagItemProps, ICategory } from "../TagItem/TagItem";
import TagEditor from "../TagEditor/TagEditor";
import useStyle from "./ProfileEditor.style";
import { IconButton } from "react-native-paper";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

const uuidGenerator = require("react-native-uuid");

const employmentCategoryList: ICategory[] = [
    { id: 1, text: "Angestellter" },
    { id: 2, text: "Student" },
    { id: 3, text: "Schüler" },
    { id: 4, text: "Aushilfskraft" },
    { id: 5, text: "Auszubildender" },
];

const hobbyCategoryList: ICategory[] = [
    { id: 1, text: "Sport" },
    { id: 2, text: "Gaming" },
    { id: 3, text: "Ausflug" },
    { id: 4, text: "Technik" },
];

const ProfileEditor = ({ navigation }: any) => {
    const style = useStyle();
    const { theme } = useContext(ThemeContext);
    const { translations } = useContext(LanguageContext);
    navigation.setOptions({ title: translations.menu_profile_editor });

    const [employmentItems, setEmploymentItems] = useState<TagItemProps[]>([]);
    const [employmentEditorVisible, setEmploymentEditorVisible] = useState<boolean>(
        false
    );
    const [editingEmploymentUUID, setEditingEmploymentUUID] = useState<
        string | undefined
    >();

    const [hobbyItems, setHobbyItems] = useState<TagItemProps[]>([]);
    const [hobbyEditorVisible, setHobbyEditorVisible] = useState<boolean>(false);
    const [editingHobbyUUID, setEditingHobbyUUID] = useState<string | undefined>();

    const handleAddEmployment = () => {
        setEmploymentEditorVisible(true);
        setEditingEmploymentUUID(undefined);
    };

    const handleAddHobby = () => {
        setHobbyEditorVisible(true);
        setEditingHobbyUUID(undefined);
    };

    const handleEditEmployment = (uuid: string) => {
        setEmploymentEditorVisible(true);
        setEditingEmploymentUUID(uuid);
    };

    const handleEditHobby = (uuid: string) => {
        setHobbyEditorVisible(true);
        setEditingHobbyUUID(uuid);
    };

    const handleDeleteEmployment = (uuid: string) => {
        setEmploymentItems((employmentItems) =>
            employmentItems.filter((employmentItem) => employmentItem.uuid !== uuid)
        );
    };

    const handleDeleteHobby = (uuid: string) => {
        setHobbyItems((hobbyItems) =>
            hobbyItems.filter((hobbyItem) => hobbyItem.uuid !== uuid)
        );
    };

    const handleSaveEmploymentEditor = (
        selectedCategory: ICategory,
        selectedText: string
    ): void => {
        if (editingEmploymentUUID) {
            setEmploymentItems((employmentItems) =>
                employmentItems.map((employmentItem) => {
                    if (employmentItem.uuid === editingEmploymentUUID) {
                        employmentItem.category = selectedCategory;
                        employmentItem.text = selectedText;
                    }
                    return employmentItem;
                })
            );
        } else {
            setEmploymentItems((employmentItems) => [
                ...employmentItems,
                {
                    uuid: uuidGenerator.v4(),
                    category: selectedCategory,
                    text: selectedText,
                    onEdit: handleEditEmployment,
                    onDelete: handleDeleteEmployment,
                    getText: (category: ICategory, text: string) =>
                        [
                            category.text,
                            translations.profile_employment_preposition,
                            text,
                        ].join(" "),
                },
            ]);
        }
        setEmploymentEditorVisible(false);
        setEditingEmploymentUUID(undefined);
    };

    const handleSaveHobbyEditor = (
        selectedCategory: ICategory,
        selectedText: string
    ): void => {
        if (editingHobbyUUID) {
            setHobbyItems((hobbyItems) =>
                hobbyItems.map((hobbyItem) => {
                    if (hobbyItem.uuid === editingHobbyUUID) {
                        hobbyItem.category = selectedCategory;
                        hobbyItem.text = selectedText;
                    }
                    return hobbyItem;
                })
            );
        } else {
            setHobbyItems((hobbyItems) => [
                ...hobbyItems,
                {
                    uuid: uuidGenerator.v4(),
                    category: selectedCategory,
                    text: selectedText,
                    onEdit: handleEditHobby,
                    onDelete: handleDeleteHobby,
                    getText: (category: ICategory, text: string) =>
                        text + " (" + category.text + ")",
                },
            ]);
        }
        setHobbyEditorVisible(false);
        setEditingHobbyUUID(undefined);
    };

    const handleCancelEmploymentEditor = () => {
        setEmploymentEditorVisible(false);
        setEditingEmploymentUUID(undefined);
    };

    const handleCancelHobbyEditor = () => {
        setHobbyEditorVisible(false);
        setEditingHobbyUUID(undefined);
    };

    const editingItem = editingEmploymentUUID
        ? employmentItems.find(
              (employmentItem) => employmentItem.uuid === editingEmploymentUUID
          )
        : editingHobbyUUID
        ? hobbyItems.find((hobbyItem) => hobbyItem.uuid === editingHobbyUUID)
        : undefined;

    return (
        <Container type="screen" layout="root">
            <ScrollView style={{ width: "100%" }}>
                {/* Personal Information */}
                <View style={style.container}>
                    <Text style={style.headline}>
                        {translations.profile_personal_info}
                    </Text>
                    {/* TODO Input Fields ? */}
                </View>

                {/* Employment Tags */}
                <View style={style.container}>
                    <View style={style.header}>
                        <Text style={style.headline}>
                            {translations.profile_employments}
                        </Text>
                        <IconButton
                            icon="plus"
                            style={{ margin: 0 }}
                            size={getResponsiveSize(20)}
                            color={theme.App.secondaryText}
                            onPress={handleAddEmployment}
                        />
                    </View>
                    {employmentItems.map((item) => (
                        <TagItem key={item.uuid} {...item} />
                    ))}
                </View>

                {/* Hobby Tags */}
                <View style={style.container}>
                    <View style={style.header}>
                        <Text style={style.headline}>{translations.profile_hobbies}</Text>
                        <IconButton
                            icon="plus"
                            style={{ margin: 0 }}
                            size={getResponsiveSize(20)}
                            color={theme.App.secondaryText}
                            onPress={handleAddHobby}
                        />
                    </View>
                    {hobbyItems.map((item) => (
                        <TagItem key={item.uuid} {...item} />
                    ))}
                </View>

                {/* About Me */}
                <View style={style.container}>
                    <Text style={style.headline}>{translations.profile_about_me}</Text>
                    <InputField multiline={true} />
                </View>
            </ScrollView>

            {/* Modal Editor for Employments */}
            <TagEditor
                visible={employmentEditorVisible}
                categoryList={employmentCategoryList}
                onSave={handleSaveEmploymentEditor}
                onCancel={handleCancelEmploymentEditor}
                categoryPlaceholder={translations.profile_employment_category_placeholder}
                textPlaceholder={translations.profile_employment_text_placeholder}
                headline={
                    editingEmploymentUUID
                        ? translations.profile_edit_employment
                        : translations.profile_add_employment
                }
                preselectedCategory={editingItem?.category}
                preselectedText={editingItem?.text}
            />

            {/* Modal Editor for Hobbies */}
            <TagEditor
                visible={hobbyEditorVisible}
                categoryList={hobbyCategoryList}
                onSave={handleSaveHobbyEditor}
                onCancel={handleCancelHobbyEditor}
                categoryPlaceholder={translations.profile_hobby_category_placeholder}
                textPlaceholder={translations.profile_hobby_text_placeholder}
                headline={
                    editingHobbyUUID
                        ? translations.profile_edit_hobby
                        : translations.profile_add_hobby
                }
                preselectedCategory={editingItem?.category}
                preselectedText={editingItem?.text}
            />
        </Container>
    );
};

export default ProfileEditor;
