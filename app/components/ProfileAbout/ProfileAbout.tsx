import React, { useContext } from "react";
import { Text, View, ScrollView } from "react-native";
import Container from "../Container/Container";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import useStyle from "./ProfileAbout.style";
import TouchableRippleCircle from "../TouchableRippleCircle/TouchableRippleCircle";
import GallerySwiperWithIndicator from "../GallerySwiperWithIndicator/GallerySwiperWithIndicator";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { getResponsiveSize } from "../../utils/font/font";
import { CategorizedInput } from "../../models/User";
import { ProfileContext } from "../../context/ProfileContext/ProfileContext";

const ProfileAbout = ({ navigation }: any) => {
    const style = useStyle();
    const { profile } = useContext(ProfileContext);
    const { translations } = useContext(LanguageContext);
    const { theme } = useContext(ThemeContext);

    return (
        <Container type="screen" layout="root">
            <ScrollView style={{ flex: 1, width: "100%" }}>
                {/* Profile Images */}
                <View style={style.galleryContainer}>
                    <GallerySwiperWithIndicator
                        images={
                            /*profile.profile_pictures
                                ? profile.profile_pictures.map(
                                      (profile_picture): ImageObj => ({
                                          url: profile_picture,
                                      })
                                  )
                                :*/ [
                                {
                                    // using default image if no image is provided:
                                    source: require("../../../assets/img/defaultProfileImage.png"),
                                    dimensions: { width: 100, height: 100 },
                                },
                            ]
                        }
                        resizeMode="contain"
                        enableTranslate={false}
                        enableScale={false}
                        showIndicator={true}
                        indicatorBackground={theme.App.screenBackground}
                        indicatorForeground={theme.App.primaryText}
                        indicatorMargin={getResponsiveSize(15)}
                        indicatorPosition="topright"
                    />
                </View>

                {/* Quick Info */}
                <View style={style.primaryInfoContainer}>
                    <View style={style.innerInfoContainer}>
                        <Text numberOfLines={1} style={style.headline}>
                            {profile.firstname} ({getAge(profile.birthDate)})
                        </Text>
                        <Text numberOfLines={1} style={style.text}>
                            {profile.city}
                        </Text>
                        <Text numberOfLines={1} style={style.text}>
                            {profile.username}
                        </Text>
                    </View>
                    <TouchableRippleCircle
                        onPress={() => navigation.navigate("FriendList")}
                    >
                        <View style={style.innerRippleContainer}>
                            <Text style={style.headline}>
                                {profile.friends ? profile.friends.length : 0}
                            </Text>
                            <Text style={style.text}>{translations.profile_friends}</Text>
                        </View>
                    </TouchableRippleCircle>
                    <TouchableRippleCircle onPress={() => {}}>
                        <View style={style.innerRippleContainer}>
                            <Text style={style.headline}>
                                {profile.groups ? profile.groups.length : 0}
                            </Text>
                            <Text style={style.text}>{translations.profile_groups}</Text>
                        </View>
                    </TouchableRippleCircle>
                </View>

                {/* Personal Information */}
                <View style={style.secondaryInfoContainer}>
                    <Text style={style.headline}>
                        {translations.profile_personal_info}
                    </Text>
                    <View style={style.columnContainer}>
                        <View style={style.column}>
                            <Text style={style.smallHeadline}>
                                {translations.profile_name}:
                            </Text>
                            <Text style={style.smallHeadline}>
                                {translations.profile_location}:
                            </Text>
                            <Text style={style.smallHeadline}>
                                {translations.profile_birthday}:
                            </Text>
                            <Text style={style.smallHeadline}>
                                {translations.profile_sex}:
                            </Text>
                            {profile.relationshipState && (
                                <Text style={style.smallHeadline}>
                                    {translations.profile_relationshipstate}:
                                </Text>
                            )}
                            {profile.languages && (
                                <Text style={style.smallHeadline}>
                                    {translations.profile_languages}:
                                </Text>
                            )}
                        </View>
                        <View style={style.column}>
                            <Text style={style.text}>
                                {profile.firstname + " " + profile.lastname}
                            </Text>
                            <Text style={style.text}>{profile.city}</Text>
                            <Text style={style.text}>
                                {new Date(profile.birthDate).toLocaleDateString()}
                            </Text>
                            <Text style={style.text}>{profile.sex}</Text>
                            {profile.relationshipState && (
                                <Text style={style.text}>
                                    {profile.relationshipState}
                                </Text>
                            )}
                            {profile.languages && (
                                <Text style={style.text}>
                                    {profile.languages.join(", ")}
                                </Text>
                            )}
                        </View>
                    </View>
                </View>

                {/* Employments */}
                {profile.jobs && (
                    <View style={style.secondaryInfoContainer}>
                        <Text style={style.headline}>
                            {translations.profile_employments}
                        </Text>
                        {profile.jobs.map((job: CategorizedInput, index: number) => (
                            <Text style={style.text} key={index}>
                                {job.category} {job.title}
                                {job.institution ? " (" + job.institution + ")" : ""}
                            </Text>
                        ))}
                    </View>
                )}

                {/* Hobbies */}
                {profile.hobbies && (
                    <View style={style.secondaryInfoContainer}>
                        <Text style={style.headline}>{translations.profile_hobbies}</Text>
                        {renderHobbies(profile.hobbies, style)}
                    </View>
                )}

                {/* About Text */}
                {profile.info && (
                    <View style={style.secondaryInfoContainer}>
                        <Text style={style.headline}>
                            {translations.profile_about_me}
                        </Text>
                        <Text style={style.text}>{profile.info}</Text>
                    </View>
                )}
            </ScrollView>
        </Container>
    );
};

const getAge = (birthDate: number): number => {
    const today = new Date();
    const _birthDate = new Date(birthDate);
    const monthDiff = today.getMonth() - _birthDate.getMonth();
    let age = today.getFullYear() - _birthDate.getFullYear();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < _birthDate.getDate()))
        age--;
    return age;
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
