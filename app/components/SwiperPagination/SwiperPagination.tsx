import { View, Text } from "react-native";
import useStyle from "./SwiperPagination.style";

const SwiperPagination = (index: number, total: number): JSX.Element | undefined => {
    const style = useStyle();
    return total > 1 ? (
        <View style={style.paginationContainer}>
            <Text style={style.paginationText}>
                {index + 1}/{total}
            </Text>
        </View>
    ) : undefined;
};

export default SwiperPagination;