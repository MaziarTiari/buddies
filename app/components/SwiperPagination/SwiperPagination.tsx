import React from "react";
import { View, Text } from "react-native";
import useSwiperPaginationStyle from "./SwiperPagination.style";

export interface SwiperPaginationProps {
    index: number;
    total: number;
}

const SwiperPagination = ({ index, total }: SwiperPaginationProps): JSX.Element => {
    const style = useSwiperPaginationStyle();
    return total > 1 ? (
        <View style={style.paginationContainer}>
            <Text style={style.paginationText}>
                {index + 1}/{total}
            </Text>
        </View>
    ) : <View></View>;
};

export default SwiperPagination;