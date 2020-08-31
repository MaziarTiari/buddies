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
import { useNavigation } from '@react-navigation/native';
import { Headline, IconButton, TouchableRipple } from 'react-native-paper';
import { RouteName } from '../../navigation/Navigation.config';
import { ICategorizedInputListConfig } from '../CategorizedInputList/CategorizedInputList';
import SwiperPagination from '../SwiperPagination/SwiperPagination';
import CustomModal from '../CustomModal/CustomModal';
import InputField from '../InputField/InputField';
import { ICategorizedInput } from '../../models/CategorizedInput';
import { CategoryContext } from '../../context/CategoryContext/CategoryContext';
import { useDate } from '../../hooks/useDate';
import { If, Then, Else } from 'react-if';
import InfoWithIcon from '../InfoWithIcon/InfoWithIcon';
import useAppNavigation from '../../hooks/useAppNavigation';
import { themeContextModel } from '../../context/ThemeContext/themeContextModel';
import { fontsizes, getResponsiveSize, getLineHeight, getResponsiveHeight } from '../../utils/font/font';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const defaultImage = require('../../../assets/img/defaultProfileImage.png');

// TODO: Remove example_img Array and use Profile Context instead
const example_img: string[] = [
    'https://www.bootdey.com/img/Content/avatar/avatar1.png',
    'https://upload.wikimedia.org/wikipedia/commons/3/30/%C5%A0koda_Superb_III_at_IAA_2019_IMG_0397.jpg',
    'https://www.thesun.co.uk/wp-content/uploads/2020/01/NINTCHDBPICT000554673258.jpg'
];

const ProfileAbout = () => {
    const { navigation } = useAppNavigation();
    const { styles, theme } = useProfileAboutStyle();
    const { translations } = useContext(LanguageContext);
    const { jobCategories, hobbyCategories } = useContext(CategoryContext);
    const { getLocalDateString } = useDate();
    const { userProfile, setUserProfile, userIsEditingProfile } = useContext(
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
                        {example_img.length > 0 
                        ? (
                            example_img.map((url, index) => (
                                <Image
                                    key={index}
                                    style={styles.image}
                                    source={{ uri: url }}
                                />
                            ))
                        ) 
                        : <Image style={styles.image} source={defaultImage} />
                        }
                    </Swiper>
                </View>

                {/* Quick Info */}
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
                                        >
                                            {userProfile.groups
                                                ? userProfile.groups.length
                                                : 0}
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
                                    <Text style={[styles.linkText]}>
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

    return categories.map((category, index) => (
        <If condition={editMode}>
            <Then>
                <View key={index} style={{marginTop: getResponsiveHeight(5)}}>
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
            </Then>
            <Else>
                <Text 
                    key={index + category} 
                    style={[textStyle,{marginBottom: getResponsiveHeight(3)}]}
                >
                    {category + ": "}
                    <Text style={{fontStyle:"italic"}}>{
                        inputList
                        .filter((hobby) => hobby.category === category)
                        .map((hobby, i) => 
                            hobby.title +
                                (hobby.place ? ' (' + hobby.place + ')' : '')
                        ).join(', ')
                    }
                    </Text>
                </Text>
            </Else>
        </If>
    ));
};

export default ProfileAbout;
