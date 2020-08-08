import React, { useContext, useState, useMemo } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import Container from "../Container/Container";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import useStyle from "./ProfileAbout.style";
import TouchableRippleCircle from "../TouchableRippleCircle/TouchableRippleCircle";
import { CategorizedInput } from "../../models/User/UserProfile";
import { SessionContext } from "../../context/SessionContext/SessionContext";
import Swiper from "react-native-swiper";
import moment from 'moment';
import InfoItem from "../InfoItem/InfoItem";
import EditableSection from '../EditableSection/EditableSection'
import { useNavigation } from '@react-navigation/native';
import { Headline } from "react-native-paper";
import { RouteName } from "../../navigation/Navigation.config";
import { ICategorizedInputListConfig } from '../CategorizedInputList/CategorizedInputList'
import SwiperPagination from "../SwiperPagination/SwiperPagination";
import CustomModal from "../CustomModal/CustomModal";
import InputField from "../InputField/InputField";
import { ApiClient } from "../../api/ApiClient";
import { ICategory } from "../../models/Category";
import { getServiceUrl } from "../../api/channels";

// TODO: Remove example_img Array and use Profile Context instead
const example_img: string[] = [
    "https://www.bootdey.com/img/Content/avatar/avatar1.png",
    "https://upload.wikimedia.org/wikipedia/commons/3/30/%C5%A0koda_Superb_III_at_IAA_2019_IMG_0397.jpg",
    "https://www.thesun.co.uk/wp-content/uploads/2020/01/NINTCHDBPICT000554673258.jpg",
];

const ProfileAbout = () => {
    const navigation = useNavigation();
    const style = useStyle();
    const { userProfile, user, updateUserProfile } = useContext(SessionContext);
    const { translations, language } = useContext(LanguageContext);

    const [showInfoEditor, setShowInfoEditor] = useState(false);
    const [profileInfo, setProfileInfo] = useState(userProfile.info || "");
    const [jobCategories, setJobCategories] = useState<string[]>([]);
    const [hobbyCategories, setHobbyCategories] = useState<string[]>([]);

    const isEditable = userProfile.userId === user.id;

    const categoryApi = new ApiClient<ICategory>(
        { baseURL: getServiceUrl("Categories") }
    );

    useMemo(async () => {
        try {
            const jobCategoriesFromApi = await categoryApi.Get<ICategory>("jobs");
            const hobbyCategoriesFromApi = await categoryApi.Get<ICategory>("hobbies");
            setJobCategories(jobCategoriesFromApi.categories[language]);
            setHobbyCategories(hobbyCategoriesFromApi.categories[language]);
        } catch (error) {
            console.error(error);
            setJobCategories(["sonstige"]); // TODO
            setHobbyCategories(["sonstige"]); // TODO
        }
    }, []);

    const onInfoEditorClose = () => {
        setShowInfoEditor(false);
        setProfileInfo(userProfile.info || "");
    }

    const onInfoEditorSubmit = () => {
        setShowInfoEditor(false);
        updateUserProfile({ ...userProfile, info: profileInfo });
    }

    // useEffect(() => {
    //     navigation.addListener("blur", () => setIsOnEdit(false));
    //     return () => navigation.removeListener("blur", () => setIsOnEdit(false));
    // }, [])

    const handleJobItemsChanged = (items: CategorizedInput[]): void => {
        updateUserProfile({ ...userProfile, jobs: items });
    }

    const handleHobbyItemsChanged = (items: CategorizedInput[]): void => {
        updateUserProfile({ ...userProfile, hobbies: items });
    }

    return (
        <Container type="screen" layout="root">
            <ScrollView style={{ flex: 1, width: "100%" }}>
                {/* Profile Images */}
                <View style={{ position: "relative" }}>
                    <Swiper
                        containerStyle={style.galleryContainer}
                        renderPagination={(index, total) => <SwiperPagination index={index} total={total} />}
                    >
                        {example_img.length > 0
                            ? (example_img.map((url, index) => (
                                <Image key={index} style={style.image} source={{ uri: url }} />)))
                            : (<Image
                                style={style.image}
                                source={require("../../../assets/img/defaultProfileImage.png")}
                            />)}
                    </Swiper>
                </View>

                {/* Quick Info */}
                <View style={style.primaryInfoContainer}>
                    <View style={style.innerInfoContainer}>
                        <Text numberOfLines={1} style={style.headline}>
                            {userProfile.firstname} ({getAge(userProfile.birthDate)})
                        </Text>
                        <Text numberOfLines={1} style={style.text}>
                            {userProfile.city}
                        </Text>
                        <Text numberOfLines={1} style={style.text}>
                            {userProfile.username}
                        </Text>
                    </View>
                    <TouchableRippleCircle
                        onPress={() => navigation.navigate("FriendList")}
                    >
                        <View style={style.innerRippleContainer}>
                            <Text style={style.headline}>
                                {userProfile.friends ? userProfile.friends.length : 0}
                            </Text>
                            <Text style={style.text}>{translations.profile.friends}</Text>
                        </View>
                    </TouchableRippleCircle>
                    <TouchableRippleCircle onPress={() => { }}>
                        <View style={style.innerRippleContainer}>
                            <Text style={style.headline}>
                                {userProfile.groups ? userProfile.groups.length : 0}
                            </Text>
                            <Text style={style.text}>{translations.profile.groups}</Text>
                        </View>
                    </TouchableRippleCircle>
                </View>

                {/* Personell */}
                <EditableSection
                    editable={isEditable}
                    onEdit={() => navigation.navigate(RouteName.Profile.Editor.Personal)}>
                    <Headline style={style.headline}>
                        {translations.profile.personal_info}
                    </Headline>
                    <InfoItem
                        keyText={translations.profile.name}
                        valueText={
                            userProfile.firstname + " " +
                            userProfile.lastname} />
                    <InfoItem
                        keyText={translations.profile.city}
                        valueText={userProfile.city} />
                    <InfoItem
                        keyText={translations.profile.birthDate}
                        valueText={
                            moment.unix(userProfile.birthDate).format('L')
                        } />
                    <InfoItem
                        keyText={translations.profile.gender}
                        valueText={userProfile.sex} />
                </EditableSection>

                {/* Jobs */}
                <EditableSection
                    editable={isEditable}
                    onEdit={() => {
                        navigation.navigate(
                            RouteName.Profile.Editor.Taglist,
                            {
                                categories: jobCategories,
                                editorEditHeadline: translations.profile.edit_employment,
                                editorAddHeadline: translations.profile.add_employment,
                                editorInstitutionPlaceholder: translations.profile.employment_institution_placeholder,
                                editorTitlePlaceholder: translations.profile.employment_title_placeholder,
                                editorCategoryPlaceholder: translations.profile.category,
                                items: userProfile.jobs,
                                headerTitle: translations.profile.edit_employments,
                                onItemsChanged: handleJobItemsChanged,
                            } as ICategorizedInputListConfig)
                    }}>
                    <Headline style={style.headline}>
                        {translations.profile.employments}
                    </Headline>
                    {userProfile.jobs?.map((job, i) =>
                        <InfoItem
                            key={i}
                            keyText={job.category}
                            valueText={job.title + (job.place ? " (" + job.place + ")" : "")}
                        />
                    )}
                </EditableSection>

                {/* Hobbies */}
                <EditableSection
                    editable={isEditable}
                    onEdit={() => {
                        navigation.navigate(
                            RouteName.Profile.Editor.Taglist,
                            {
                                categories: hobbyCategories,
                                editorEditHeadline: translations.profile.editor.hobbies.heading_when_edit,
                                editorAddHeadline: translations.profile.editor.hobbies.heading_when_add,
                                editorInstitutionPlaceholder: translations.profile.editor.hobbies.place_label,
                                editorTitlePlaceholder: translations.profile.editor.hobbies.hobbie_title_label,
                                editorCategoryPlaceholder: translations.profile.category,
                                items: userProfile.hobbies,
                                headerTitle: translations.profile.editor.hobbies.editor_heading,
                                onItemsChanged: handleHobbyItemsChanged,
                            } as ICategorizedInputListConfig)
                    }}
                >
                    <Headline style={style.headline}>
                        {translations.profile.hobbies}
                    </Headline>
                    {userProfile.hobbies && (
                        <View>
                            {renderHobbies(userProfile.hobbies, style)}
                        </View>
                    )}
                </EditableSection>

                {/* About Text */}
                <EditableSection editable={isEditable} onEdit={() => setShowInfoEditor(true)}>
                    <Text style={style.headline}>{translations.profile.about_me}</Text>
                    {userProfile.info && <Text style={style.text}>{userProfile.info}</Text>}
                </EditableSection>
                <CustomModal
                    onSubmit={onInfoEditorSubmit}
                    onCloseModal={onInfoEditorClose}
                    showModal={showInfoEditor}
                >
                    <InputField
                        value={profileInfo || ""}
                        multiline
                        dynamicHeight={{ min: 150, max: 200 }}
                        onChangeText={setProfileInfo}
                    />
                </CustomModal>
            </ScrollView>
        </Container>
    );
};

const getAge = (birthDate: number): number => {
    const _birthDate = moment.unix(birthDate);
    let diff = moment().diff(_birthDate, "years");
    return diff;
};

const renderHobbies = (hobbies: CategorizedInput[], style: any): JSX.Element[] => {
    const categories: string[] = [];
    hobbies.forEach((hobby) => {
        if (categories.indexOf(hobby.category) === -1) categories.push(hobby.category);
    });
    return categories.map((category, index) => (
        <View style={style.columnContainer} key={index}>
            <Text style={[style.smallHeadline, style.column, { width: "30%" }]}>
                {category + ":"}
            </Text>
            <Text style={[style.text, style.column, { width: "70%" }]}>
                {hobbies
                    .filter((hobby) => hobby.category == category)
                    .map((hobby) => hobby.title)
                    .join(", ")}
            </Text>
        </View>
    ));
};

export default ProfileAbout;
