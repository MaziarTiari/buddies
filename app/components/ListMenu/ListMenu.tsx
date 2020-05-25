import React from "react";
import { View, FlatList, Text } from "react-native";
import { TouchableRipple } from "react-native-paper";
import { getResponsiveSize } from "../../utils/font/font";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useStyle from "./ListMenu.style";
import { useNavigation, CommonActions } from "@react-navigation/native";

export interface ListMenuItem {
    title: string;
    icon?: string;
    navRoute: string;
    navParam?: any;
}

export interface ListMenuProps {
    items: ListMenuItem[];
}

const ListMenu = (Props: ListMenuProps) => {
    const style = useStyle();
    const navigation = useNavigation();

    const renderItem = (item: ListMenuItem) => {
        return (
            <TouchableRipple
                onPress={() =>
                    navigation.dispatch(
                        CommonActions.navigate({
                            name: item.navRoute,
                            params: item.navParam,
                        })
                    )
                }
            >
                <View style={style.container}>
                    {item.icon && (
                        <MaterialCommunityIcons
                            name={item.icon}
                            size={getResponsiveSize(24)}
                        />
                    )}
                    <Text style={style.text}>{item.title}</Text>
                </View>
            </TouchableRipple>
        );
    };

    return (
        <FlatList
            data={Props.items}
            renderItem={({ item }) => renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
            style={style.list}
        />
    );
};

export default ListMenu;
