import { useNavigation } from "@react-navigation/native";

export default function useAppNavigation() {
    const navigation = useNavigation();

    const goBack = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    }
    return {
        navigation: { ...navigation,  goBack: goBack }
    }
}
