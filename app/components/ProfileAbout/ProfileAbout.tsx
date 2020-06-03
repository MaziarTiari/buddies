import React, { useContext, useState, useEffect } from "react";
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
import ProfileAboutMenu from "./Menu";
import { RouteName } from "../../navigation/Navigation.config";
import { IProfileEditorTagListConfig } from '../ProfileEditorTagList/ProfileEditorTagList'
import SwiperPagination from "../SwiperPagination/SwiperPagination";

// TODO: Remove example_img Array and use Profile Context instead
const example_img: string[] = [
    "https://www.bootdey.com/img/Content/avatar/avatar1.png",
    "https://upload.wikimedia.org/wikipedia/commons/3/30/%C5%A0koda_Superb_III_at_IAA_2019_IMG_0397.jpg",
    "https://www.thesun.co.uk/wp-content/uploads/2020/01/NINTCHDBPICT000554673258.jpg",
];

const ProfileAbout = () => {
    const navigation = useNavigation();
    const style = useStyle();
    const { userProfile } = useContext(SessionContext);
    const { translations } = useContext(LanguageContext);
    const [isOnEdit, setIsOnEdit] = useState(false);

    useEffect(() => {
        navigation.addListener("blur", () => setIsOnEdit(false));
        return () => navigation.removeListener("blur", () => setIsOnEdit(false));
    }, [])

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
                    <ProfileAboutMenu
                        isOnEdit={isOnEdit}
                        onEdit={state => setIsOnEdit(state)}
                        style={{
                            position: "absolute", alignSelf: "flex-end",
                            top: "88%", margin: 0, right: "2%"
                        }} />
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
                    editable={isOnEdit}
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
                    editable={isOnEdit}
                    onEdit={() => {
                        navigation.navigate(
                            RouteName.Profile.Editor.Taglist,
                            {
                                categories: ["IT", "Design", "Ingeneuer"],
                                type: "jobs",
                            } as IProfileEditorTagListConfig)
                    }}>
                    <Headline style={style.headline}>
                        {translations.profile.employments}
                    </Headline>
                    {userProfile.jobs?.map((job: CategorizedInput) =>
                        <InfoItem
                            keyText={job.category}
                            valueText={
                                job.title + job.place ? " (" +
                                    job.place + ")" : ""}
                        />
                    )}
                </EditableSection>

                {/* Hobbies */}
                <EditableSection editable={isOnEdit} onEdit={() => alert("On Edit")}>
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
                <EditableSection editable={isOnEdit} onEdit={() => alert("On Edit")}>
                    <Text style={style.headline}>{translations.profile.about_me}</Text>
                    {userProfile.info && <Text style={style.text}>{userProfile.info}</Text>}
                </EditableSection>
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
