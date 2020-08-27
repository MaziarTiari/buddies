import React, { useContext, useState, useEffect } from "react";
import { View, Text, ScrollView, Image, BackHandler } from "react-native";
import useStyle from "./ActivityInfo.style";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import Container from "../Container/Container";
import { useNavigation } from "@react-navigation/native";
import EditableSection from "../EditableSection/EditableSection";
import { Headline, IconButton } from "react-native-paper";
import InfoItem from "../InfoItem/InfoItem";
import moment from "moment";
import TouchableRippleCircle from "../TouchableRippleCircle/TouchableRippleCircle";
import Swiper from "react-native-swiper";
import { SessionContext } from "../../context/SessionContext/SessionContext";
import { RouteName } from "../../navigation/Navigation.config";
import { ICategorizedInputListConfig } from "../CategorizedInputList/CategorizedInputList";
import { ICategorizedInput } from "../../models/CategorizedInput";
import useCategories from "../../Hooks/useCategories";
import CustomModal from "../CustomModal/CustomModal";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import { getResponsiveSize } from "../../utils/font/font";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import FormTextInput from "../FormTextInput/FormTextInput";
import { ActivityContext } from "../../context/ActivityContext/ActivityContext";
import { ProfileListProps } from "../ProfileList/ProfileList";
import { userProfileApi } from "../../api/ApiClient";
import { IUserAvatar } from "../../models/UserAvatar";

const defaultImg = require("../../../assets/img/default-activity-img.jpg");
const MIN_TITLE_LENGTH = 10;

const ActivityInfo = () => {
    const style = useStyle();
    const navigation = useNavigation();
    const { translations } = useContext(LanguageContext);
    const { hobbyCategories } = useCategories();
    const { theme } = useContext(ThemeContext);
    const { hideActivity, applyToActivity } = useContext(ActivityContext);
    const { activity, setActivity, userIsEditingActivity, user } = useContext(SessionContext);

    navigation.setOptions({ title: activity.title });

    const imageSource = activity.image ? { uri: "data:image/gif;base64," + activity.image.base64 } : defaultImg;

    const [showDescriptionEditor, setShowDescriptionEditor] = useState<boolean>(false);
    const [showTitleEditor, setShowTitleEditor] = useState<boolean>(userIsEditingActivity && activity.title === "");
    const [activityDescription, setActivityDescription] = useState<string>(activity.description || "");
    const [activityTitle, setActivityTitle] = useState<string>(activity.title);
    const [showError, setShowError] = useState<boolean>(false);

    const handleTagItemsChanged = (tags: ICategorizedInput[]): void => {
        setActivity({ ...activity, tags: tags });
    };

    const handleDescriptionEditorSubmit = (): void => {
        setShowDescriptionEditor(false);
        setActivity({ ...activity, description: activityDescription })
    };

    const handleDescriptionEditorClose = (): void => {
        setShowDescriptionEditor(false);
        setActivityDescription(activity.description || "");
    };

    const handleTitleEditorSubmit = (): void => {
        if (activityTitle.length < MIN_TITLE_LENGTH) {
            setShowError(true);
            return;
        }
        setShowTitleEditor(false);
        setActivity({ ...activity, title: activityTitle });
    };

    const handleTitleEditorClose = (): void => {
        if (activityTitle.length < MIN_TITLE_LENGTH) {
            setShowError(true);
            return;
        }
        setShowTitleEditor(false);
        setActivityTitle(activity.title);
    };

    const handleApplyActivity = (): void => {
        applyToActivity(activity.id)
    }

    const handleHideActivity = (): void => {
        applyToActivity(activity.id);
    }

    const onApplicants = () => {
        userProfileApi.Post<Array<IUserAvatar>, Array<string>>(
            "getUserAvatars", activity.applicantUserIds
        ).then(avatars => {
            navigation.navigate(
                RouteName.Profile.ProfileList,
                {
                    avatars: avatars,
                    getAvatarsRightComponent: avatar => (
                        <View style={{display: "flex"}}>
                            <IconButton
                                color={theme.App.primaryText}
                                style={{marginRight: 4, backgroundColor: "green"}}
                                icon="hand-okay" 
                                onPress={() => alert("on accept")}
                            />
                            <IconButton
                                color={theme.App.primaryText}
                                style={{marginRight: 4, backgroundColor: "red"}}
                                icon="account-remove" 
                                onPress={() => alert("on accept")}
                            />
                        </View>
                    )
                } as ProfileListProps
            )
        })
    }

    // cancel when user navigates back to previous screen
    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => userIsEditingActivity);
        return () => backHandler.remove();
    }, [userIsEditingActivity]);

    return (
        <Container layout="root" type="screen">
            <ScrollView style={{ flex: 1, alignSelf: "stretch" }} >

                {/* Image */}
                <Swiper containerStyle={style.galleryContainer}>
                    <Image style={style.image} source={imageSource} />
                </Swiper>

                {/* Hide and Apply Buttons */}
                {activity.userId !== user.id &&
                    <View style={style.buttonContainer}>
                        <Button
                            title={translations.hide}
                            style={style.button}
                            textStyle={{ fontWeight: "normal" }}
                            onPress={handleHideActivity}
                        />
                        <Button
                            title={translations.apply}
                            style={[style.button, { borderLeftWidth: 0 }]}
                            textStyle={{ fontWeight: "normal" }}
                            onPress={handleApplyActivity}
                        />
                    </View>
                }

                {/* Quick Info */}
                <View style={style.primaryInfoContainer}>
                    <View style={style.innerInfoContainer}>
                        <View style={{ flexDirection: "row" }}>

                            <Text numberOfLines={1} style={style.headline}>
                                {activity.title}
                            </Text>
                            {userIsEditingActivity &&
                                <IconButton
                                    icon="lead-pencil"
                                    size={getResponsiveSize(26)}
                                    style={{ margin: getResponsiveSize(-6) }}
                                    color={theme.App.primaryText}
                                    onPress={() => setShowTitleEditor(true)}
                                />
                            }

                        </View>
                        <Text numberOfLines={1} style={style.text}>
                            {activity.location}
                        </Text>
                        <Text numberOfLines={1} style={style.text}>
                            {activity.visibility.toString()}
                        </Text>
                    </View>
                    <TouchableRippleCircle onPress={() => onApplicants()}>
                        <View style={style.innerRippleContainer}>
                            <Text style={style.headline}>{activity.applicantUserIds.length}</Text>
                            <Text style={style.text}>{translations.applicants}</Text>
                        </View>
                    </TouchableRippleCircle>
                    <TouchableRippleCircle onPress={() => alert("on members")}>
                        <View style={style.innerRippleContainer}>
                            <Text style={style.headline}>
                                {activity.memberUserIds.length + (activity.maxMember ? " / " + activity.maxMember : "")}
                            </Text>
                            <Text style={style.text}>{translations.member}</Text>
                        </View>
                    </TouchableRippleCircle>
                </View>

                {/* Description */}
                {((activity.description && activity.description.trim().length > 0) || userIsEditingActivity) &&
                    <EditableSection editable={userIsEditingActivity} onEdit={() => setShowDescriptionEditor(true)}>
                        <Headline style={style.headline}>{translations.description}</Headline>
                        <Text style={style.text}>{activity.description}</Text>
                    </EditableSection>
                }

                {/* Information */}
                <EditableSection editable={userIsEditingActivity} onEdit={() => navigation.navigate(RouteName.Activity.EditForm)}>
                    <Headline style={style.headline}>{translations.information}</Headline>
                    <InfoItem keyText={translations.meeting_point} valueText={activity.location} />
                    {activity.startDate !== undefined &&
                        <InfoItem keyText={translations.start_time} valueText={moment.unix(activity.startDate).format("LLL")} />}
                    {activity.endDate !== undefined &&
                        <InfoItem keyText={translations.end_time} valueText={moment.unix(activity.endDate).format("LLL")} />}
                    <InfoItem keyText={translations.visibility} valueText={activity.visibility.toString()} />
                </EditableSection>

                {/* Tags */}
                {((activity.tags && activity.tags.length > 0) || userIsEditingActivity) &&
                    <EditableSection editable={userIsEditingActivity} onEdit={() => {
                        navigation.navigate(RouteName.Taglist, {
                            categories: hobbyCategories,
                            editorEditHeadline: translations.edit_subject,
                            editorAddHeadline: translations.add_subject,
                            editorTitlePlaceholder: translations.description,
                            editorCategoryPlaceholder: translations.category,
                            items: activity.tags,
                            headerTitle: translations.subjects,
                            onItemsChanged: handleTagItemsChanged,
                        } as ICategorizedInputListConfig)
                    }}>
                        <Headline style={style.headline}>{translations.subjects}</Headline>
                        {activity.tags?.map((tag, index) => (
                            <InfoItem key={index} keyText={tag.category} valueText={tag.title} />
                        ))}
                    </EditableSection>
                }

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
                    <Text style={[style.text, { marginBottom: getResponsiveSize(10) }]}>
                        {translations.activity_title_hint}
                    </Text>
                    <FormTextInput
                        value={activityTitle}
                        onChangeText={setActivityTitle}
                        placeholder={translations.title}
                        hasError={showError && activityTitle.length < MIN_TITLE_LENGTH}
                    />
                </CustomModal>

            </ScrollView>
        </Container >
    );
};

export default ActivityInfo;
