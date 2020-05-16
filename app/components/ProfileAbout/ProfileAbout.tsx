import React, { useContext, useState } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import Container from "../Container/Container";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import useStyle from "./ProfileAbout.style";
import GallerySwiper, { ImageObj } from "react-native-gallery-swiper";
import { TouchableRipple } from "react-native-paper";
import { IHobby, IProfile } from "../../dev/example_data/FetchedProfile";
import { users } from "../../dev/example_data/users";

const ProfileAbout = ({ navigation }: any) => {
    const style = useStyle();
    const [profile, setProfile] = useState<IProfile>(users[3]);
    const { translations } = useContext(LanguageContext);
    return (
        <Container type="screen" layout="root">
            <ScrollView style={{ flex: 1, width: "100%" }}>
                {/* Profile Images */}
                <View style={style.galleryContainer}>
                    <GallerySwiper
                        images={
                            profile.profile_pictures
                                ? profile.profile_pictures.map(
                                      (profile_picture): ImageObj => ({
                                          url: profile_picture,
                                      })
                                  )
                                : [
                                      {
                                          // using default image if no image is provided:
                                          source: require("../../../assets/img/defaultProfileImage.png"),
                                      },
                                  ]
                        }
                        resizeMode="contain"
                        enableTranslate={false}
                        enableScale={false}
                    />
                </View>

                {/* Quick Info */}
                <View style={style.primaryInfoContainer}>
                    <View style={style.innerInfoContainer}>
                        <Text numberOfLines={1} style={style.headline}>
                            {profile.firstname} ({getAge(profile.birthday)})
                        </Text>
                        <Text numberOfLines={1} style={style.text}>
                            {profile.location}
                        </Text>
                        <Text numberOfLines={1} style={style.text}>
                            {profile.employments && profile.employments[0].position}
                        </Text>
                    </View>
                    <View style={style.outerRippleContainer}>
                        <TouchableRipple
                            style={style.rippleContainer}
                            onPress={() => navigation.navigate("FriendList")}
                        >
                            <View style={style.innerRippleContainer}>
                                <Text style={style.headline}>
                                    {profile.friends ? profile.friends.length : 0}
                                </Text>
                                <Text style={style.text}>
                                    {translations.profile_friends}
                                </Text>
                            </View>
                        </TouchableRipple>
                    </View>
                    <View style={style.outerRippleContainer}>
                        <TouchableRipple style={style.rippleContainer} onPress={() => {}}>
                            <View style={style.innerRippleContainer}>
                                <Text style={style.headline}>
                                    {profile.groups ? profile.groups.length : 0}
                                </Text>
                                <Text style={style.text}>
                                    {translations.profile_groups}
                                </Text>
                            </View>
                        </TouchableRipple>
                    </View>
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
                            <Text style={style.text}>{profile.location}</Text>
                            <Text style={style.text}>
                                {profile.birthday.toLocaleDateString()}
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
                {profile.employments && (
                    <View style={style.secondaryInfoContainer}>
                        <Text style={style.headline}>
                            {translations.profile_employments}
                        </Text>
                        {profile.employments.map((employment) => (
                            <Text style={style.text}>
                                {employment.position}{" "}
                                {translations.profile_employment_preposition}{" "}
                                {employment.institution}
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

const getAge = (birthDate: Date): number => {
    const today = new Date();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()))
        age--;
    return age;
};

const renderHobbies = (hobbies: IHobby[], style: any): JSX.Element[] => {
    const categories: string[] = [];
    hobbies.forEach((hobby) => {
        if (categories.indexOf(hobby.category) === -1) categories.push(hobby.category);
    });
    return categories.map((category) => (
        <View style={style.columnContainer}>
            <Text style={[style.smallHeadline, style.column, { width: "30%" }]}>
                {category + ":"}
            </Text>
            <Text style={[style.text, style.column, { width: "70%" }]}>
                {hobbies
                    .filter((hobby) => hobby.category == category)
                    .map((hobby) => hobby.name)
                    .join(", ")}
            </Text>
        </View>
    ));
};

export default ProfileAbout;
