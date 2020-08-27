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
import { SessionContext } from "../../context/SessionContext/SessionContext";
import { RouteName } from "../../navigation/Navigation.config";
import { ICategorizedInputListConfig } from "../CategorizedInputList/CategorizedInputList";
import { ICategorizedInput } from "../../models/CategorizedInput";
import CustomModal from "../CustomModal/CustomModal";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import { getResponsiveSize, fontsizes, getLineHeight } from "../../utils/font/font";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import FormTextInput from "../FormTextInput/FormTextInput";
import { Menu, MenuTrigger, MenuOptions, MenuOption } from "react-native-popup-menu";
import useImagePicker from "../../Hooks/useImagePicker";
import { CategoryContext } from "../../context/CategoryContext/CategoryContext";

const defaultImg = require("../../../assets/img/default-activity-img.jpg");
const MIN_TITLE_LENGTH = 10;

const ActivityInfo = () => {
    const style = useStyle();
    const navigation = useNavigation();
    const { translations } = useContext(LanguageContext);
    const { activity, setActivity, userIsEditingActivity, user } = useContext(SessionContext);
    const { hobbyCategories } = useContext(CategoryContext);
    const { theme } = useContext(ThemeContext);
    const { selectImage } = useImagePicker();

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

    const handleImagePicked = (base64: string, width: number, height: number) => {
        setActivity({ ...activity, image: { base64: base64, width: width, height: height } });
    };

    const handleDeleteImage = () => {
        setActivity({ ...activity, image: undefined });
    }

    const handleApplyActivity = (): void => {
        // TODO
    }

    const handleHideActivity = (): void => {
        // TODO
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
                <View style={style.galleryContainer}>
                    <Image style={style.image} source={imageSource} />
                    {userIsEditingActivity &&
                        <View style={style.imageEditContainer}>
                            <Menu>
                                <MenuTrigger>
                                    <IconButton icon="lead-pencil" color={theme.App.primaryText} />
                                </MenuTrigger>
                                <MenuOptions
                                    customStyles={{
                                        optionsWrapper: {
                                            backgroundColor: theme.App.menuBackground,
                                        },
                                        optionWrapper: {
                                            padding: getResponsiveSize(12),
                                        },
                                        optionText: {
                                            fontSize: fontsizes.small,
                                            lineHeight: getLineHeight(fontsizes.small),
                                            color: theme.App.primaryText,
                                        },
                                    }}
                                >
                                    <MenuOption
                                        onSelect={() => { selectImage("file", handleImagePicked) }}
                                        text={translations.upload_from_filesystem}
                                    />
                                    <MenuOption
                                        onSelect={() => { selectImage("camera", handleImagePicked) }}
                                        text={translations.upload_from_camera}
                                    />
                                    <MenuOption
                                        onSelect={handleDeleteImage}
                                        text={translations.remove_image}
                                    />
                                </MenuOptions>
                            </Menu>
                        </View>
                    }
                </View>

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
                    <TouchableRippleCircle onPress={() => { }}>
                        <View style={style.innerRippleContainer}>
                            <Text style={style.headline}>{activity.applicantUserIds.length}</Text>
                            <Text style={style.text}>{translations.applicants}</Text>
                        </View>
                    </TouchableRippleCircle>
                    <TouchableRippleCircle onPress={() => { }}>
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
