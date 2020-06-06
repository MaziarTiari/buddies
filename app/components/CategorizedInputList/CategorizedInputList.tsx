import React, { useState, useEffect, useContext, useMemo } from "react";
import { View, FlatList, Text } from "react-native";
import Container from "../Container/Container";
import { CategorizedInput } from "../../models/User/UserProfile";
import { TouchableRipple } from "react-native-paper";
import useStyle from "./CategorizedInputList.style";
import { useRoute, useNavigation } from "@react-navigation/native";
import CategorizedInputEditor from "../CategorizedInputEditor/CategorizedInputEditor";
import ActionButton from "../ActionButton/ActionButton";
import { ApiClient } from "../../api/ApiClient";
import { ICategory } from "../../models/Category";
import { getServiceUrl } from "../../api/channels";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { SessionContext } from "../../context/SessionContext/SessionContext";

export interface ICategorizedInputListConfig {
    categories: string[];
    type: "jobs" | "hobbies";
    items: CategorizedInput[] | undefined;
    headerTitle: string;
    editorCategoryPlaceholder: string;
    editorTitlePlaceholder: string;
    editorInstitutionPlaceholder: string;
    editorAddHeadline: string;
    editorEditHeadline: string;
    onItemsChanged: (items: CategorizedInput[]) => void;
}

const CategorizedInputList = () => {
    const session = useContext(SessionContext);
    const lang = useContext(LanguageContext);
    const style = useStyle();
    const route = useRoute();
    const navigation = useNavigation();
    const config = route.params as ICategorizedInputListConfig;
    const categoryApi = new ApiClient<ICategory>(
        {baseURL: getServiceUrl("Categories")}
    );
    navigation.setOptions({ title: config.headerTitle });

    const [editingItem, setEditingItem] = useState<CategorizedInput | undefined>();
    const [showEditor, setShowEditor] = useState<boolean>(false);
    const [items, setItems] = useState<CategorizedInput[]>(config.items ? config.items : []);
    const [categories, setCategories] = useState<string[]>([]);

    useMemo( async () => {
        try {
            const category = await categoryApi.Get<ICategory>(config.type);
            setCategories(category.categories[lang.language]);
        } catch (error) {
            setCategories(["sonstige"]);
        }
    },[])

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
        const categorizedInput = {
            category: category,
            title: title,
            place: place,
        }
        if (editingItem) {
            setItems(items => items.map(
                item => item === editingItem ? categorizedInput : item));
        } else {
            let user = { ...session.userProfile };
            setItems(items => [...items, categorizedInput]);
            config.type === "jobs"
                ? user.jobs = user.jobs ? [...user.jobs, categorizedInput] 
                                        : [categorizedInput]
                : user.hobbies = user.hobbies ? [...user.hobbies, categorizedInput]
                                            : [categorizedInput];
            session.updateUserProfile(user);
        }
        setEditingItem(undefined);
        setShowEditor(false);
    };

    const handleDeletePressed = () => {
        setItems(items => items.filter(item => item !== editingItem));
        setShowEditor(false);
        setEditingItem(undefined);
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

    return (
        <Container layout="root" type="screen">
            <FlatList
                data={items}
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={(item, index) => index.toString()}
                style={style.list}
            />
            <ActionButton onPress={handleAddPressed} text="+" />
            <CategorizedInputEditor
                visible={showEditor}
                categoryList={categories}
                onSave={handleSavePressed}
                onCancel={handleCancelPressed}
                onDelete={handleDeletePressed}
                categoryPlaceholder={config.editorCategoryPlaceholder}
                titlePlaceholder={config.editorTitlePlaceholder}
                institutionPlaceholder={config.editorInstitutionPlaceholder}
                headline={editingItem ? config.editorEditHeadline : config.editorAddHeadline}
                preselectedCategory={editingItem?.category}
                preselectedTitle={editingItem?.title}
                preselectedInstitution={editingItem?.place}
                showDelete={editingItem !== undefined}
            />
        </Container>
    );
};

export default CategorizedInputList;
