import React, { useContext, useState, useEffect } from "react";
import { Text, View, ScrollView, Image, BackHandler } from "react-native";
import Container from "../Container/Container";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import useStyle from "./ProfileAbout.style";
import TouchableRippleCircle from "../TouchableRippleCircle/TouchableRippleCircle";
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
import { ICategorizedInput } from "../../models/CategorizedInput";
import { CategoryContext } from "../../context/CategoryContext/CategoryContext";

// TODO: Remove example_img Array and use Profile Context instead
const example_img: string[] = [
    "https://www.bootdey.com/img/Content/avatar/avatar1.png",
    "https://upload.wikimedia.org/wikipedia/commons/3/30/%C5%A0koda_Superb_III_at_IAA_2019_IMG_0397.jpg",
    "https://www.thesun.co.uk/wp-content/uploads/2020/01/NINTCHDBPICT000554673258.jpg",
];

const ProfileAbout = () => {
    const navigation = useNavigation();
    const style = useStyle();
    const { userProfile, setUserProfile, userIsEditingProfile, cancelEditingProfile } = useContext(SessionContext);
    const { translations } = useContext(LanguageContext);
    const { jobCategories, hobbyCategories } = useContext(CategoryContext);

    const [showInfoEditor, setShowInfoEditor] = useState(false);
    const [profileInfo, setProfileInfo] = useState(userProfile.info || "");

    const onInfoEditorClose = () => {
        setShowInfoEditor(false);
        setProfileInfo(userProfile.info || "");
    }

    const onInfoEditorSubmit = () => {
        setShowInfoEditor(false);
        setUserProfile({ ...userProfile, info: profileInfo });
    }

    const handleJobItemsChanged = (items: ICategorizedInput[]): void => {
        setUserProfile({ ...userProfile, jobs: items });
    }

    const handleHobbyItemsChanged = (items: ICategorizedInput[]): void => {
        setUserProfile({ ...userProfile, hobbies: items });
    }

    // cancel when user navigates back to previous screen
    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => userIsEditingProfile);
        return () => backHandler.remove();
    }, [userIsEditingProfile]);

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
                    <TouchableRippleCircle onPress={() => { }}>
                        <View style={style.innerRippleContainer}>
                            <Text style={style.headline}>
                                {userProfile.friends ? userProfile.friends.length : 0}
                            </Text>
                            <Text style={style.text}>{translations.friends}</Text>
                        </View>
                    </TouchableRippleCircle>
                    <TouchableRippleCircle onPress={() => { }}>
                        <View style={style.innerRippleContainer}>
                            <Text style={style.headline}>
                                {userProfile.groups ? userProfile.groups.length : 0}
                            </Text>
                            <Text style={style.text}>{translations.groups}</Text>
                        </View>
                    </TouchableRippleCircle>
                </View>

                {/* Personell */}
                <EditableSection
                    editable={userIsEditingProfile}
                    onEdit={() => navigation.navigate(RouteName.Profile.EditForm)}>
                    <Headline style={style.headline}>
                        {translations.personal}
                    </Headline>
                    <InfoItem
                        keyText={translations.fullname}
                        valueText={
                            userProfile.firstname + " " +
                            userProfile.lastname} />
                    <InfoItem
                        keyText={translations.city}
                        valueText={userProfile.city} />
                    <InfoItem
                        keyText={translations.birthdate}
                        valueText={
                            moment.unix(userProfile.birthDate).format('L')
                        } />
                    <InfoItem
                        keyText={translations.sex}
                        valueText={userProfile.sex} />
                </EditableSection>

                {/* Jobs */}
                {((userProfile.jobs && userProfile.jobs.length > 0) || userIsEditingProfile) &&
                    <EditableSection
                        editable={userIsEditingProfile}
                        onEdit={() => {
                            navigation.navigate(
                                RouteName.Taglist,
                                {
                                    categories: jobCategories,
                                    editorEditHeadline: translations.edit_job,
                                    editorAddHeadline: translations.add_job,
                                    editorInstitutionPlaceholder: translations.company_or_institution_optional,
                                    editorTitlePlaceholder: translations.description,
                                    editorCategoryPlaceholder: translations.category,
                                    items: userProfile.jobs,
                                    headerTitle: translations.my_jobs,
                                    onItemsChanged: handleJobItemsChanged,
                                } as ICategorizedInputListConfig)
                        }}>
                        <Headline style={style.headline}>
                            {translations.jobs}
                        </Headline>
                        {userProfile.jobs?.map((job, i) =>
                            <InfoItem
                                key={i}
                                keyText={job.category}
                                valueText={job.title + (job.place ? " (" + job.place + ")" : "")}
                            />
                        )}
                    </EditableSection>
                }

                {/* Hobbies */}
                {((userProfile.hobbies && userProfile.hobbies.length > 0) || userIsEditingProfile) &&
                    <EditableSection
                        editable={userIsEditingProfile}
                        onEdit={() => {
                            navigation.navigate(
                                RouteName.Taglist,
                                {
                                    categories: hobbyCategories,
                                    editorEditHeadline: translations.edit_hobby,
                                    editorAddHeadline: translations.add_hobby,
                                    editorInstitutionPlaceholder: translations.place_or_club_optional,
                                    editorTitlePlaceholder: translations.description,
                                    editorCategoryPlaceholder: translations.category,
                                    items: userProfile.hobbies,
                                    headerTitle: translations.my_hobbies,
                                    onItemsChanged: handleHobbyItemsChanged,
                                } as ICategorizedInputListConfig)
                        }}
                    >
                        <Headline style={style.headline}>
                            {translations.hobbies}
                        </Headline>
                        {userProfile.hobbies && (
                            <View>
                                {renderHobbies(userProfile.hobbies, style)}
                            </View>
                        )}
                    </EditableSection>
                }

                {/* About Text */}
                {((userProfile.info && userProfile.info.trim().length > 0) || userIsEditingProfile) &&
                    <EditableSection editable={userIsEditingProfile} onEdit={() => setShowInfoEditor(true)}>
                        <Text style={style.headline}>{translations.biography}</Text>
                        {userProfile.info && <Text style={style.text}>{userProfile.info}</Text>}
                    </EditableSection>
                }

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

const renderHobbies = (hobbies: ICategorizedInput[], style: any): JSX.Element[] => {
    const categories: string[] = [];
    hobbies.forEach((hobby) => {
        if (categories.indexOf(hobby.category) === -1) categories.push(hobby.category);
    });
    return categories.map((category, index) => (
        <InfoItem
            keyText={category}
            valueText={hobbies
                .filter((hobby) => hobby.category === category)
                .map((hobby) => hobby.title + (hobby.place ? " (" + hobby.place + ")" : ""))
                .join(", ")}
            key={index}
        />

    ));
};

export default ProfileAbout;
