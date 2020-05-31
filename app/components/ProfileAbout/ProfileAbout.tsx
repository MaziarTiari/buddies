import React, { useContext } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import Container from "../Container/Container";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import useStyle from "./ProfileAbout.style";
import TouchableRippleCircle from "../TouchableRippleCircle/TouchableRippleCircle";
import { CategorizedInput } from "../../models/User";
import { ProfileContext } from "../../context/ProfileContext/ProfileContext";
import Swiper from "react-native-swiper";
import moment from 'moment';

// TODO: Remove example_img Array and use Profile Context instead
const example_img: string[] = [
    "https://www.bootdey.com/img/Content/avatar/avatar1.png",
    "https://upload.wikimedia.org/wikipedia/commons/3/30/%C5%A0koda_Superb_III_at_IAA_2019_IMG_0397.jpg",
    "https://www.thesun.co.uk/wp-content/uploads/2020/01/NINTCHDBPICT000554673258.jpg",
];

const ProfileAbout = ({ navigation }: any) => {
    const style = useStyle();
    const { userProfile } = useContext(ProfileContext);
    const { translations } = useContext(LanguageContext);

    const renderPagination = (index: number, total: number): JSX.Element | undefined => {
        return total > 1 ? (
            <View style={style.paginationContainer}>
                <Text style={style.paginationText}>
                    {index + 1}/{total}
                </Text>
            </View>
        ) : undefined;
    };

    return (
        <Container type="screen" layout="root">
            <ScrollView style={{ flex: 1, width: "100%" }}>
                {/* Profile Images */}
                <Swiper
                    containerStyle={style.galleryContainer}
                    renderPagination={renderPagination}
                >
                    {example_img.length > 0 ? (
                        example_img.map((url, index) => (
                            <Image
                                key={index}
                                style={style.image}
                                source={{ uri: url }}
                            />
                        ))
                    ) : (
                        <Image
                            style={style.image}
                            source={require("../../../assets/img/defaultProfileImage.png")}
                        />
                    )}
                </Swiper>

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
                    <TouchableRippleCircle onPress={() => {}}>
                        <View style={style.innerRippleContainer}>
                            <Text style={style.headline}>
                                {userProfile.groups ? userProfile.groups.length : 0}
                            </Text>
                            <Text style={style.text}>{translations.profile.groups}</Text>
                        </View>
                    </TouchableRippleCircle>
                </View>

                {/* Personal Information */}
                <View style={style.secondaryInfoContainer}>
                    <Text style={style.headline}>
                        {translations.profile.personal_info}
                    </Text>
                    <View style={style.columnContainer}>
                        <View style={style.column}>
                            <Text style={style.smallHeadline}>
                                {translations.profile.name}:
                            </Text>
                            <Text style={style.smallHeadline}>
                                {translations.profile.city}:
                            </Text>
                            <Text style={style.smallHeadline}>
                                {translations.profile.birthDate}:
                            </Text>
                            <Text style={style.smallHeadline}>
                                {translations.profile.gender}:
                            </Text>
                            {userProfile.relationshipState && (
                                <Text style={style.smallHeadline}>
                                    {translations.profile.relationshipstate}:
                                </Text>
                            )}
                            {userProfile.languages && (
                                <Text style={style.smallHeadline}>
                                    {translations.profile.languages}:
                                </Text>
                            )}
                        </View>
                        <View style={style.column}>
                            <Text style={style.text}>
                                {userProfile.firstname + " " + userProfile.lastname}
                            </Text>
                            <Text style={style.text}>{userProfile.city}</Text>
                            <Text style={style.text}>
                                {moment.unix(userProfile.birthDate).format('L')}
                            </Text>
                            <Text style={style.text}>{userProfile.sex}</Text>
                            {userProfile.relationshipState && (
                                <Text style={style.text}>
                                    {userProfile.relationshipState}
                                </Text>
                            )}
                            {userProfile.languages && (
                                <Text style={style.text}>
                                    {userProfile.languages.join(", ")}
                                </Text>
                            )}
                        </View>
                    </View>
                </View>

                {/* Employments */}
                {userProfile.jobs && (
                    <View style={style.secondaryInfoContainer}>
                        <Text style={style.headline}>
                            {translations.profile.employments}
                        </Text>
                        {userProfile.jobs.map((job: CategorizedInput, index: number) => (
                            <Text style={style.text} key={index}>
                                {job.category} {job.title}
                                {job.institution ? " (" + job.institution + ")" : ""}
                            </Text>
                        ))}
                    </View>
                )}

                {/* Hobbies */}
                {userProfile.hobbies && (
                    <View style={style.secondaryInfoContainer}>
                        <Text style={style.headline}>{translations.profile.hobbies}</Text>
                        {renderHobbies(userProfile.hobbies, style)}
                    </View>
                )}

                {/* About Text */}
                {userProfile.info && (
                    <View style={style.secondaryInfoContainer}>
                        <Text style={style.headline}>
                            {translations.profile.about_me}
                        </Text>
                        <Text style={style.text}>{userProfile.info}</Text>
                    </View>
                )}
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
