import React, { useContext, useState, useEffect } from 'react';
import { Text, View, ScrollView, Image, BackHandler, TextStyle } from 'react-native';
import Container from '../Container/Container';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import useProfileAboutStyle from './ProfileAbout.style';
import { SessionContext } from '../../context/SessionContext/SessionContext';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import InfoItem from '../InfoItem/InfoItem';
import EditableSection from '../EditableSection/EditableSection';
import { Headline } from 'react-native-paper';
import { RouteName } from '../../navigation/Navigation.config';
import { ICategorizedInputListConfig } from '../CategorizedInputList/CategorizedInputList';
import SwiperPagination from '../SwiperPagination/SwiperPagination';
import CustomModal from '../CustomModal/CustomModal';
import InputField from '../InputField/InputField';
import { ICategorizedInput } from '../../models/CategorizedInput';
import { CategoryContext } from '../../context/CategoryContext/CategoryContext';
import { useLocalDate } from '../../hooks/useLocalDate';
import { If, Then, Else } from 'react-if';
import InfoWithIcon from '../InfoWithIcon/InfoWithIcon';
import useAppNavigation from '../../hooks/useAppNavigation';
import { fontsizes, getResponsiveSize, getLineHeight, getResponsiveHeight } from '../../utils/font/font';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ProfileButton } from './components/ProfileButton';
import { ChatContext } from '../../context/ChatContext/ChatContext';

const defaultImage = require('../../../assets/img/defaultProfileImage.png');

const ProfileAbout = () => {
    const { navigation } = useAppNavigation();
    const { styles, theme } = useProfileAboutStyle();
    const { translations } = useContext(LanguageContext);
    const { jobCategories, hobbyCategories } = useContext(CategoryContext);
    const { getLocalDateString } = useLocalDate();
    const { userProfile, setUserProfile, userIsEditingProfile, user } = useContext(
        SessionContext
    );

    const [showInfoEditor, setShowInfoEditor] = useState(false);
    const [profileInfo, setProfileInfo] = useState(userProfile.info || '');

    const onInfoEditorClose = () => {
        setShowInfoEditor(false);
        setProfileInfo(userProfile.info || '');
    };

    const onInfoEditorSubmit = () => {
        setShowInfoEditor(false);
        setUserProfile({ ...userProfile, info: profileInfo });
    };

    const handleJobItemsChanged = (items: ICategorizedInput[]): void => {
        setUserProfile({ ...userProfile, jobs: items });
    };

    const handleHobbyItemsChanged = (items: ICategorizedInput[]): void => {
        setUserProfile({ ...userProfile, hobbies: items });
    };

    // cancel when user navigates back to previous screen
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => userIsEditingProfile
        );
        return () => {
            backHandler.remove();
        };
    }, [userIsEditingProfile]);

    async function handleOnMessagePressed() {
        const memberIds = [user.id, userProfile.userId];
        navigation.navigateToChat({memberIds, displayName: userProfile.firstname})
    }

    return (
        <Container type="screen" layout="root">
            <ScrollView style={{ flex: 1, width: '100%' }}>
                {/* Profile Images */}
                <View style={{ position: 'relative' }}>
                    <Swiper
                        containerStyle={styles.galleryContainer}
                        renderPagination={(index, total) => (
                            <SwiperPagination index={index} total={total} />
                        )}
                    >
                        <Image style={styles.image} source={defaultImage} />
                        <Image style={styles.image} source={defaultImage} />
                    </Swiper>
                    <View style={styles.imageButtonContainer}>
                        <ProfileButton type="subscribe" onPress={() => {}} />
                        <ProfileButton type="message" onPress={handleOnMessagePressed} />
                    </View>
                </View>

                {/* Quick Info */}
                <View style={{marginHorizontal: getResponsiveSize(15)}}>
                    <If condition={!userIsEditingProfile}>
                        <>
                        <View style={styles.quickinfoContainer}>
                            <Text style={styles.headline}>
                                {userProfile.firstname + " " + userProfile.lastname}
                                <Text style={{fontSize: fontsizes.small, fontWeight: "500"}}>{
                                    " (" + userProfile.sex.toLowerCase().substr(0,1) + "/" + 
                                    getAge(userProfile.birthDate) + ")"
                                }</Text>
                            </Text>
                        </View>
                        <View style={styles.primaryInfoContainer}>
                            <View style={styles.innerInfoContainer}>
                                <InfoWithIcon 
                                    text={userProfile.username} 
                                    icon="account" 
                                />
                                <InfoWithIcon text={userProfile.city} icon="pin" />
                            </View>
                            {/** Groups and Friends */}
                            <View style={styles.userFriendsContainer}>
                                <TouchableOpacity 
                                    onPress={() => {}} 
                                    style={{marginRight: getResponsiveSize(10)}}
                                >
                                    <View style={styles.innerRippleContainer}>
                                        <View style={{flexDirection:"row"}}>
                                            <MaterialCommunityIcons
                                                style={{marginRight: getResponsiveSize(5)}}
                                                name="account-group"
                                                size={getLineHeight(fontsizes.small)}
                                                color={theme.App.secondaryInteractiveItem}
                                            />
                                            <Text 
                                                style={[
                                                    styles.linkText, 
                                                    {textAlignVertical: "center"}
                                                ]}
                                            >{
                                                userProfile.groups
                                                    ? userProfile.groups.length : 0
                                            }
                                            </Text>
                                        </View>
                                        <Text style={styles.linkText}>
                                            {translations.groups}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => {}} 
                                    style={{
                                        marginHorizontal: getResponsiveSize(10)
                                    }}
                                >
                                    <View style={styles.innerRippleContainer}>
                                        <View style={{flexDirection:"row"}}>
                                            <MaterialCommunityIcons
                                                style={{marginRight: getResponsiveSize(5)}}
                                                name="account-multiple"
                                                size={getLineHeight(fontsizes.small)}
                                                color={theme.App.secondaryInteractiveItem}
                                            />
                                            <Text 
                                                style={[
                                                    styles.linkText,
                                                    {textAlignVertical: "center"}
                                                ]}
                                            > { 
                                                userProfile.friends 
                                                    ? userProfile.friends.length : 0
                                            }
                                            </Text>
                                        </View>
                                        <Text style={styles.linkText}>
                                            {translations.friends}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </>
                    </If>

                    {/* Personell */}
                    <If condition={userIsEditingProfile}>
                        <EditableSection
                            noDevider
                            isEditing={userIsEditingProfile}
                            onEdit={() =>
                                navigation.navigate(RouteName.Profile.EditForm)
                            }
                        >
                            <Headline style={styles.headline}>
                                {translations.personal}
                            </Headline>
                            <InfoItem
                                keyText={translations.fullname}
                                valueText={
                                    userProfile.firstname + ' ' + userProfile.lastname
                                }
                            />
                            <InfoItem
                                keyText={translations.city}
                                valueText={userProfile.city}
                            />
                            <InfoItem
                                keyText={translations.birthdate}
                                valueText={getLocalDateString(userProfile.birthDate, false)}
                            />
                            <InfoItem
                                keyText={translations.sex}
                                valueText={userProfile.sex}
                            />
                        </EditableSection>
                    </If>

                    {/* About Text */}
                    {((userProfile.info && userProfile.info.trim().length > 0) ||
                        userIsEditingProfile) && (
                            <EditableSection
                                isEditing={userIsEditingProfile}
                                onEdit={() => setShowInfoEditor(true)}
                            >
                                <Text style={styles.headline}>
                                    {translations.about_me}
                                </Text>
                                {userProfile.info && (
                                    <Text style={styles.text}>{userProfile.info}</Text>
                                )}
                            </EditableSection>
                        )}

                    {/* Jobs */}
                    {((userProfile.jobs && userProfile.jobs.length > 0) ||
                        userIsEditingProfile) && (
                            <EditableSection
                                isEditing={userIsEditingProfile}
                                onEdit={() => {
                                    navigation.navigate(RouteName.Taglist, {
                                        categories: jobCategories,
                                        editorEditHeadline: translations.edit_job,
                                        editorAddHeadline: translations.add_job,
                                        editorInstitutionPlaceholder:
                                            translations.company_or_institution_optional,
                                        editorTitlePlaceholder:
                                            translations.description,
                                        editorCategoryPlaceholder:
                                            translations.category,
                                        items: userProfile.jobs,
                                        headerTitle: translations.my_jobs,
                                        onItemsChanged: handleJobItemsChanged
                                    } as ICategorizedInputListConfig);
                                }}
                            >
                                <Headline style={styles.headline}>
                                    {translations.jobs}
                                </Headline>
                                <If condition={userIsEditingProfile}>
                                    <Then>{
                                        userProfile.jobs &&
                                        renderCategorizedInputs(userProfile.jobs, true)
                                    }
                                    </Then>
                                    <Else>
                                        <Text>
                                            {userProfile.jobs?.map((job, i) => (
                                                <Text key={i} style={styles.text}>
                                                    {job.title}
                                                    {job.place &&
                                                        <Text style={styles.jobPlace}>
                                                            {" bei " + job.place}
                                                        </Text>
                                                    }
                                                    {i < userProfile.jobs!.length - 1 && ", "}
                                                </Text>
                                            ))}
                                        </Text>
                                    </Else>
                                </If>
                            </EditableSection>
                        )}

                    {/* Hobbies */}
                    {((userProfile.hobbies && userProfile.hobbies.length > 0) ||
                        userIsEditingProfile) && (
                            <EditableSection
                                isEditing={userIsEditingProfile}
                                onEdit={() => {
                                    navigation.navigate(RouteName.Taglist, {
                                        categories: hobbyCategories,
                                        editorEditHeadline: translations.edit_hobby,
                                        editorAddHeadline: translations.add_hobby,
                                        editorInstitutionPlaceholder:
                                            translations.place_or_club_optional,
                                        editorTitlePlaceholder:
                                            translations.description,
                                        editorCategoryPlaceholder:
                                            translations.category,
                                        items: userProfile.hobbies,
                                        headerTitle: translations.my_hobbies,
                                        onItemsChanged: handleHobbyItemsChanged
                                    } as ICategorizedInputListConfig);
                                }}
                            >
                                <Headline style={styles.headline}>
                                    {translations.hobbies}
                                </Headline>
                                {userProfile.hobbies && (
                                    <View>{
                                        renderCategorizedInputs(
                                            userProfile.hobbies,
                                            userIsEditingProfile,
                                            styles.text
                                        )
                                    }
                                    </View>
                                )}
                            </EditableSection>
                        )}
                </View>

                <CustomModal
                    onSubmit={onInfoEditorSubmit}
                    onCloseModal={onInfoEditorClose}
                    showModal={showInfoEditor}
                >
                    <InputField
                        value={profileInfo || ''}
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
    let diff = moment().diff(_birthDate, 'years');
    return diff;
};

const renderCategorizedInputs = (
    inputList: ICategorizedInput[],
    editMode: boolean,
    textStyle?: TextStyle
): JSX.Element[] => {
    const categories: string[] = [];
    inputList.forEach((hobby) => {
        if (!categories.includes(hobby.category)) {
            categories.push(hobby.category);
        }
    });

    return categories.map((category, index) => editMode 
        ? (
            <View 
                key={index + category} 
                style={{ marginTop: getResponsiveHeight(5) }}
            >
                <InfoItem
                    keyText={category}
                    valueText={inputList
                        .filter((hobby) => hobby.category === category)
                        .map(
                            (hobby) =>
                                hobby.title +
                                (hobby.place ? ' (' + hobby.place + ')' : '')
                        )
                        .join(',\n')}
                />
            </View>
        ) : (
            <Text 
                key={index + category} 
                style={[textStyle,{marginBottom: getResponsiveHeight(3)}]}
            >
                {category + ": "}
                <Text style={{ fontStyle: "italic" }}>{
                    inputList
                        .filter((hobby) => hobby.category === category)
                        .map((hobby, i) =>
                            hobby.title +
                            (hobby.place ? ' (' + hobby.place + ')' : '')
                        ).join(', ')
                }
                </Text>
            </Text>
        )
    );
};

export default ProfileAbout;
