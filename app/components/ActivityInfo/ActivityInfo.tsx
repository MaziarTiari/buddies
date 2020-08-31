import React, { useContext, useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, BackHandler } from 'react-native';
import useStyle from './ActivityInfo.style';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import Container from '../Container/Container';
import EditableSection from '../EditableSection/EditableSection';
import { Headline, IconButton } from 'react-native-paper';
import InfoItem from '../InfoItem/InfoItem';
import { SessionContext } from '../../context/SessionContext/SessionContext';
import { RouteName } from '../../navigation/Navigation.config';
import { ICategorizedInputListConfig } from '../CategorizedInputList/CategorizedInputList';
import CustomModal from '../CustomModal/CustomModal';
import InputField from '../InputField/InputField';
import {
    getResponsiveSize,
    fontsizes,
    getLineHeight,
    getResponsiveHeight
} from '../../utils/font/font';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import FormTextInput from '../FormTextInput/FormTextInput';
import { ActivityContext } from '../../context/ActivityContext/ActivityContext';
import { userProfileApi } from '../../api/ApiClient';
import { IUserAvatar } from '../../models/UserAvatar';
import {
    Menu,
    MenuTrigger,
    MenuOptions,
    MenuOption
} from 'react-native-popup-menu';
import useImagePicker from '../../hooks/useImagePicker';
import { CategoryContext } from '../../context/CategoryContext/CategoryContext';
import { ApplicantListProps } from '../ApplicantList/ApplicantList';
import { If, Then, Else } from 'react-if';
import EditApproval from '../EditApproval/EditApproval';
import { apiResources as apiPath } from '../../api/channels';
import { useDate } from '../../hooks/useDate';
import InfoWithIcon from '../InfoWithIcon/InfoWithIcon';
import useAppNavigation from '../../hooks/useAppNavigation';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const defaultImg = require('../../../assets/img/default-activity-img.jpg');

const MIN_TITLE_LENGTH = 10;

const ActivityInfo = () => {
    const styles = useStyle();
    const { navigation } = useAppNavigation();
    const { translations } = useContext(LanguageContext);
    const { hobbyCategories } = useContext(CategoryContext);
    const { theme } = useContext(ThemeContext);
    const { selectImage } = useImagePicker();

    const { hideActivity, applyToActivity } = useContext(ActivityContext);

    const { 
        getTimeRange, 
        getLocalDateRange, 
        getLocalDateString, 
        getTimeString 
    } = useDate();

    const {
        activity,
        setActivity,
        userIsEditingActivity,
        user,
        setAvatarList,
        setIsLoading,
        cancelEditingActivity
    } = useContext(SessionContext);

    navigation.setOptions({ title: activity.title });

    const [showDescriptionEditor, setShowDescriptionEditor] = useState<boolean>(false);

    const [showTitleEditor, setShowTitleEditor] = useState<boolean>(
        userIsEditingActivity && activity.title === ''
    );

    const [activityDescription, setActivityDescription] = useState<string>(
        activity.description || ''
    );

    const [activityTitle, setActivityTitle] = useState<string>(activity.title);
    const [showError, setShowError] = useState<boolean>(false);

    const imageSource = activity.image
        ? { uri: 'data:image/gif;base64,' + activity.image.base64 }
        : defaultImg;

    const isOwnActivity = activity.userId === user.id;

    function handleDescriptionEditorSubmit() {
        setShowDescriptionEditor(false);
        setActivity({ ...activity, description: activityDescription });
    };

    function handleDescriptionEditorClose() {
        setShowDescriptionEditor(false);
        setActivityDescription(activity.description || '');
    };

    function handleTitleEditorSubmit() {
        if (activityTitle.length < MIN_TITLE_LENGTH) {
            return setShowError(true);
        }
        setShowTitleEditor(false);
        setActivity({ ...activity, title: activityTitle });
    };

    function handleTitleEditorClose() {
        if (activityTitle.length < MIN_TITLE_LENGTH) {
            if (activity.title.length === 0) {
                cancelEditingActivity();
                navigation.goBack();
            } else {
                return setShowError(true);
            }
        }
        setShowTitleEditor(false);
        setActivityTitle(activity.title);
    };

    function handleImagePicked(base64: string, width: number, height: number) {
        setActivity({
            ...activity,
            image: {
                base64: base64,
                width: width,
                height: height
            }
        });
    }

    function handleOnApplicants() {
        if (activity.applicantUserIds.length === 0 || !isOwnActivity) {
            return;
        }
        setIsLoading(true);
        userProfileApi
            .Post<Array<IUserAvatar>, Array<string>>(
                apiPath.user.getAvatars,
                activity.applicantUserIds
            )
            .then((avatars) => {
                setAvatarList(avatars);
                navigation.navigate(RouteName.Activity.ApplicantList, {
                    activity: activity
                } as ApplicantListProps);
            })
            //.then(() =>)
            .finally(() => setIsLoading(false)); // TODO catch
    }

    function handleOnMembers() {
        if (activity.memberUserIds.length === 0) {
            return;
        }
        setIsLoading(true);
        userProfileApi
            .Post<Array<IUserAvatar>, Array<string>>(
                apiPath.user.getAvatars,
                activity.memberUserIds
            )
            .then((avatars) => {
                setAvatarList(avatars);
                navigation.navigate(RouteName.Profile.ProfileList, {
                    activity: activity
                } as ApplicantListProps);
            })
            .finally(() => setIsLoading(false)); // TODO catch
    }

    // cancel when user navigates back to previous screen
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => userIsEditingActivity
        );
        return () => {
            backHandler.remove();
        };
    }, [userIsEditingActivity]);

    function handleOnApply() {
        applyToActivity(activity.id)
        navigation.goBack();
    }

    function handleOnHide() {
        hideActivity(activity.id)
        navigation.goBack();
    }

    return (
        <Container layout="root" type="screen">
            <ScrollView style={styles.root}>
                {/* Image */}
                <View style={styles.galleryContainer}>
                    <Image style={styles.image} source={imageSource} />
                    {userIsEditingActivity && (
                        <View style={styles.imageEditContainer}>
                            <Menu>
                                <MenuTrigger>
                                    <View style={styles.imageEditIconContainer}>
                                        <IconButton
                                            icon="lead-pencil"
                                            color={theme.App.interactiveItem}
                                            style={styles.imageEditIcon}
                                        />
                                    </View>
                                </MenuTrigger>
                                <MenuOptions
                                    customStyles={{
                                        optionsWrapper: {
                                            backgroundColor:
                                                theme.App.screenBackground
                                        },
                                        optionWrapper: {
                                            padding: getResponsiveSize(12),
                                        },
                                        optionText: {
                                            fontSize: fontsizes.small,
                                            lineHeight: getLineHeight(
                                                fontsizes.small
                                            ),
                                            color: theme.App.primaryText,
                                        }
                                    }}
                                >
                                    <MenuOption
                                        onSelect={() => {
                                            selectImage('file', handleImagePicked);
                                        }}
                                        text={
                                            translations.upload_from_filesystem
                                        }
                                    />
                                    <MenuOption
                                        onSelect={() => {
                                            selectImage('camera', handleImagePicked);
                                        }}
                                        text={translations.upload_from_camera}
                                    />
                                    <MenuOption
                                        onSelect={() =>
                                            setActivity({
                                                ...activity,
                                                image: undefined
                                            })
                                        }
                                        text={translations.remove_image}
                                    />
                                </MenuOptions>
                            </Menu>
                        </View>
                    )}

                    {/* Applicants and Members */}
                    {!userIsEditingActivity && (
                        <View style={styles.activityUsersIconContainer}>
                            <TouchableHighlight
                                underlayColor={"rgba(0,0,0,0.3)"}
                                onPress={handleOnApplicants}
                                style={styles.foreignMemberListContainer}
                            >
                                <View style={styles.foreignMemberListContainer}>
                                    <MaterialCommunityIcons
                                        name="hand"
                                        color={theme.App.secondaryInteractiveItem}
                                        style={{
                                            marginRight: getResponsiveSize(2)
                                        }}
                                        size={getResponsiveSize(30)}
                                    />
                                    <Text
                                        style={[
                                            styles.iconLabel,
                                            {
                                                color:
                                                    isOwnActivity &&
                                                    activity.applicantUserIds.length > 0
                                                        ? theme.App.rejectColor
                                                        : theme.App
                                                              .secondaryInteractiveItem
                                            }
                                        ]}
                                    >
                                        {activity.applicantUserIds.length}
                                    </Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                underlayColor={"rgba(0,0,0,0.3)"}
                                onPress={handleOnMembers}
                                style={styles.foreignMemberListContainer}
                            >
                                <View style={styles.foreignMemberListContainer}>
                                    <MaterialCommunityIcons
                                        name="account-group"
                                        color={theme.App.secondaryInteractiveItem}
                                        style={{
                                            marginRight: getResponsiveSize(2)
                                        }}
                                        size={getResponsiveSize(30)}
                                    />
                                    <Text style={styles.iconLabel}>
                                        {activity.memberUserIds.length}
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    )}
                </View>

                {/* Quick Info */}
                <EditableSection
                    isEditing={userIsEditingActivity}
                    noDevider
                    onEdit={() => setShowTitleEditor(true)}
                >
                    <View>
                        <View
                            style={[
                                styles.quickInfoContainer,
                                !isOwnActivity && {
                                    marginBottom: getResponsiveHeight(5)
                                }
                            ]}
                        >
                            <Text
                                numberOfLines={2}
                                style={[
                                    styles.headline,
                                    userIsEditingActivity && {
                                        marginRight: getResponsiveSize(50)
                                    }
                                ]}
                            >
                                {activity.title}
                            </Text>
                        </View>
                    </View>

                    <If condition={!userIsEditingActivity}>
                        <Then>
                            {activity.location && (
                                <InfoWithIcon
                                    icon="pin"
                                    text={activity.location}
                                />
                            )}
                            {(activity.startDate || activity.endDate) && (
                                <InfoWithIcon
                                    icon="calendar"
                                    text={getLocalDateRange(
                                        activity.startDate,
                                        activity.endDate
                                    )}
                                />
                            )}
                            {(activity.startTime || activity.endTime) && (
                                <InfoWithIcon
                                    icon="clock"
                                    text={getTimeRange(
                                        activity.startTime,
                                        activity.endTime
                                    )}
                                />
                            )}
                        </Then>
                    </If>
                </EditableSection>

                {/* Description */}
                {((activity.description &&
                    activity.description.trim().length > 0) ||
                    userIsEditingActivity) && (
                    <EditableSection
                        isEditing={userIsEditingActivity}
                        onEdit={() => setShowDescriptionEditor(true)}
                    >
                        <Headline style={styles.headline}>
                            {translations.description}
                        </Headline>
                        <Text style={styles.text}>{activity.description}</Text>
                    </EditableSection>
                )}

                {/* Information */}
                {userIsEditingActivity &&
                    (userIsEditingActivity ||
                        activity.location ||
                        activity.startDate ||
                        activity.endDate) && (
                        <EditableSection
                            isEditing={userIsEditingActivity}
                            onEdit={() =>
                                navigation.navigate(RouteName.Activity.EditForm)
                            }
                        >
                            <Headline style={styles.headline}>
                                {translations.information}
                            </Headline>
                            {activity.location && (
                                <InfoItem
                                    keyText={translations.meeting_point}
                                    valueText={activity.location}
                                />
                            )}
                            {activity.startDate && (
                                <InfoItem
                                    keyText={translations.start_date}
                                    valueText={getLocalDateString(
                                        activity.startDate
                                    )}
                                />
                            )}
                            {activity.endDate && (
                                <InfoItem
                                    keyText={translations.end_date}
                                    valueText={getLocalDateString(
                                        activity.endDate
                                    )}
                                />
                            )}
                            {activity.startTime && (
                                <InfoItem
                                    keyText={translations.from}
                                    valueText={getTimeString(
                                        activity.startTime
                                    )}
                                />
                            )}
                            {activity.endTime && (
                                <InfoItem
                                    keyText={translations.end_date}
                                    valueText={getTimeString(activity.endTime)}
                                />
                            )}
                        </EditableSection>
                    )}

                {/* Tags */}
                {((activity.tags && activity.tags.length > 0) ||
                    userIsEditingActivity) && (
                    <EditableSection
                        isEditing={userIsEditingActivity}
                        onEdit={() => {
                            navigation.navigate(RouteName.Taglist, {
                                categories: hobbyCategories,
                                editorEditHeadline: translations.edit_subject,
                                editorAddHeadline: translations.add_subject,
                                editorTitlePlaceholder:
                                    translations.description,
                                editorCategoryPlaceholder:
                                    translations.category,
                                items: activity.tags,
                                headerTitle: translations.subjects,
                                onItemsChanged: (tags) =>
                                    setActivity({ ...activity, tags: tags })
                            } as ICategorizedInputListConfig);
                        }}
                    >
                        <Headline style={styles.headline}>
                            {translations.subjects}
                        </Headline>
                        <If condition={userIsEditingActivity}>
                            <Then>
                                {activity.tags?.map((tag, index) => (
                                    <InfoItem
                                        key={index}
                                        keyText={tag.category}
                                        valueText={tag.title}
                                    />
                                ))}
                            </Then>
                            <Else>
                                <Text style={styles.text}>
                                    {activity.tags?.map((t) => t.title).join()}
                                </Text>
                            </Else>
                        </If>
                    </EditableSection>
                )}

                {/* Criteria */}
                {/*
                <EditableSection editable={isEditable} onEdit={() => { }}>
                    <Headline style={style.headline}>{translations.activity.criteria}</Headline>
                    
                    {activity.applicationDeadline !== undefined &&
                        <InfoItem keyText={translations.activity.applicationDeadline} valueText={moment.unix(activity.applicationDeadline).format("LLL")} />}
                    {activity.reqLocation !== undefined &&
                        <InfoItem keyText={translations.activity.reqLocation} valueText={activity.reqLocation + (activity.reqLocationRadius ? " (+" + activity.reqLocationRadius + "km)" : "")} />}
                    {activity.reqLanguage !== undefined &&
                        <InfoItem keyText={translations.activity.reqLanguage} valueText={activity.reqLanguage.join(", ")} />}
                    {activity.reqSex !== undefined &&
                        <InfoItem keyText={translations.activity.reqSex} valueText={activity.reqSex} />}
                    {activity.reqAge !== undefined &&
                        <InfoItem keyText={translations.activity.reqAge} valueText={activity.reqAge.toString()} />}
                    {activity.reqRelationshipState !== undefined &&
                        <InfoItem keyText={translations.activity.reqRelationshipState} valueText={activity.reqRelationshipState} />}
                    {activity.reqJob !== undefined && activity.reqJob.length > 0 &&
                        <InfoItem keyText={translations.activity.reqJob} valueText={activity.reqJob.map(job => job.title + " (" + job.category + ")").join(",")} />} 
                </EditableSection>
                */}

                {/* Modal for description */}
                <CustomModal
                    onSubmit={handleDescriptionEditorSubmit}
                    onCloseModal={handleDescriptionEditorClose}
                    showModal={showDescriptionEditor}
                >
                    <InputField
                        value={activityDescription}
                        multiline
                        dynamicHeight={{ min: 150, max: 300 }}
                        onChangeText={setActivityDescription}
                    />
                </CustomModal>

                {/* Modal for title */}
                <CustomModal
                    onSubmit={handleTitleEditorSubmit}
                    onCloseModal={handleTitleEditorClose}
                    showModal={showTitleEditor}
                >
                    <Text
                        style={[
                            styles.text,
                            { marginBottom: getResponsiveSize(10) }
                        ]}
                    >
                        {translations.activity_title_hint}
                    </Text>
                    <FormTextInput
                        value={activityTitle}
                        onChangeText={setActivityTitle}
                        placeholder={translations.title}
                        hasError={
                            showError && activityTitle.length < MIN_TITLE_LENGTH
                        }
                    />
                </CustomModal>
            </ScrollView>
            <If condition={!isOwnActivity}>
                <EditApproval
                    cancelIconName="eye-off"
                    submitIconName="hand"
                    onSubmit={handleOnApply}
                    onCancel={handleOnHide}
                />
            </If>
        </Container>
    );
};

export default ActivityInfo;
