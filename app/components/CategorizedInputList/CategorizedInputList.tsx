import React, { useState } from "react";
import { View, FlatList, Text } from "react-native";
import Container from "../Container/Container";
import { CategorizedInput } from "../../models/User/UserProfile";
import { TouchableRipple } from "react-native-paper";
import useStyle from "./CategorizedInputList.style";
import { useRoute, useNavigation } from "@react-navigation/native";
import CategorizedInputEditor from "../CategorizedInputEditor/CategorizedInputEditor";
import ActionButton from "../ActionButton/ActionButton";

export interface ICategorizedInputListConfig {
    categories: string[];
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
    const style = useStyle();
    const route = useRoute();
    const navigation = useNavigation();
    const config = route.params as ICategorizedInputListConfig;

    navigation.setOptions({ title: config.headerTitle });

    const [editingItem, setEditingItem] = useState<CategorizedInput | undefined>();
    const [showEditor, setShowEditor] = useState<boolean>(false);
    const [items, setItems] = useState<CategorizedInput[]>(config.items ? config.items : []);

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
        let updatedItems = [];
        if (editingItem) {
            updatedItems = items.map(item => item === editingItem ? categorizedInput : item);
        } else {
            updatedItems = [...items, categorizedInput];
        }
        setItems(updatedItems);
        setEditingItem(undefined);
        setShowEditor(false);
        config.onItemsChanged(updatedItems);
    };

    const handleDeletePressed = () => {
        const updatedItems = items.filter(item => item !== editingItem);
        setItems(updatedItems);
        setShowEditor(false);
        setEditingItem(undefined);
        config.onItemsChanged(updatedItems);
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
            <ActionButton onPress={handleAddPressed} icon="plus" />
            <CategorizedInputEditor
                visible={showEditor}
                categoryList={config.categories}
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
