import React, { useContext, useState, useEffect } from "react";
import { View, Text, ScrollView, Image } from "react-native";
import useStyle from "./ActivityInfo.style";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import Container from "../Container/Container";
import { useNavigation } from "@react-navigation/native";
import EditableSection from "../EditableSection/EditableSection";
import { Headline } from "react-native-paper";
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

const defaultImg = require("../../../assets/img/default-activity-img.jpg");

const ActivityInfo = () => {
    const style = useStyle();
    const navigation = useNavigation();
    const { translations } = useContext(LanguageContext);
    const { activity, setActivity, userIsEditingActivity, cancelEditingActivity } = useContext(SessionContext);
    const { hobbyCategories } = useCategories();

    navigation.setOptions({ title: activity.title });

    const imageSource = activity.image ? { uri: "data:image/gif;base64," + activity.image.base64 } : defaultImg;

    const [showDescriptionEditor, setShowDescriptionEditor] = useState<boolean>(false);
    const [activityDescription, setActivityDescription] = useState<string>(activity.description || "");

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

    // cancels edit when user navigates back to previous screen
    useEffect(() => {
        const unsubscribe = navigation.addListener("blur", () => {
            if (userIsEditingActivity) cancelEditingActivity();
        });
        return unsubscribe;
    }, [navigation, userIsEditingActivity]);

    return (
        <Container layout="root" type="screen">
            <ScrollView style={{ flex: 1, alignSelf: "stretch" }} >

                {/* Image */}
                <Swiper containerStyle={style.galleryContainer}>
                    <Image style={style.image} source={imageSource} />
                </Swiper>

                {/* Quick Info */}
                <View style={style.primaryInfoContainer}>
                    <View style={style.innerInfoContainer}>
                        <Text numberOfLines={1} style={style.headline}>
                            {activity.title}
                        </Text>
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
                <EditableSection editable={userIsEditingActivity} onEdit={() => navigation.navigate(RouteName.Activity.Editor)}>
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
                        navigation.navigate(RouteName.Profile.Editor.Taglist, {
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

            </ScrollView>
        </Container >
    );
};

export default ActivityInfo;
