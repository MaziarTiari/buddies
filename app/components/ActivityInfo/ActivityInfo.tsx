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
import CustomModal from "../CustomModal/CustomModal";
import InputField from "../InputField/InputField";
import Button from "../Button/Button";
import { getResponsiveSize, fontsizes, getLineHeight, getResponsiveHeight } from "../../utils/font/font";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import FormTextInput from "../FormTextInput/FormTextInput";
import { ActivityContext } from "../../context/ActivityContext/ActivityContext";
import { userProfileApi } from "../../api/ApiClient";
import { IUserAvatar } from "../../models/UserAvatar";
import { Menu, MenuTrigger, MenuOptions, MenuOption } from "react-native-popup-menu";
import useImagePicker from "../../Hooks/useImagePicker";
import { CategoryContext } from "../../context/CategoryContext/CategoryContext";
import { ApplicantListProps } from "../ApplicantList/ApplicantList";
import { If } from "react-if";
const defaultImg = require("../../../assets/img/default-activity-img.jpg");
// end imports ........................................................................ //

const MIN_TITLE_LENGTH = 10;

const ActivityInfo = () => {

    // States ------------------------------------------------------------------------- \\

    const style = useStyle();
    const navigation = useNavigation();
    const { translations } = useContext(LanguageContext);
    const { hobbyCategories } = useContext(CategoryContext);
    const { theme, themeType } = useContext(ThemeContext);
    const { selectImage } = useImagePicker();

    const { 
        hideActivity, 
        applyToActivity, 
    } = useContext(ActivityContext);

    const { 
        activity, 
        setActivity, 
        userIsEditingActivity, 
        user,
        setAvatarList,
        setIsLoading,
        cancelEditingActivity,
    } = useContext(SessionContext);



    // end States ..................................................................... //

    navigation.setOptions({ title: activity.title });

    const imageSource = activity.image 
        ? { 
            uri: "data:image/gif;base64," + 
            activity.image.base64 
        } 
        : defaultImg;

    const [showDescriptionEditor, setShowDescriptionEditor] = useState<boolean>(false);
    const [showTitleEditor, setShowTitleEditor] = useState<boolean>(
        userIsEditingActivity && activity.title === ""
    );
    const [activityDescription, setActivityDescription] = useState<string>(
        activity.description || ""
    );
    const [activityTitle, setActivityTitle] = useState<string>(activity.title);
    const [showError, setShowError] = useState<boolean>(false);

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
            if (activity.title.length === 0) {
                cancelEditingActivity();
                if (navigation.canGoBack()) {
                    navigation.goBack();
                }
            } else {
                setShowError(true);
                return;
            }
        }
        setShowTitleEditor(false);
        setActivityTitle(activity.title);
    };

    const handleImagePicked = (base64: string, width: number, height: number) => {
        setActivity({ 
            ...activity, 
            image: { 
                base64: base64, 
                width: width, 
                height: height 
            } 
        });
    };

    function handleOnApplicants() {
        if (activity.applicantUserIds.length === 0 || activity.userId !== user.id) {
            return;
        }
        setIsLoading(true);
        userProfileApi.Post<Array<IUserAvatar>, Array<string>>(
            "getUserAvatars", activity.applicantUserIds
        ).then(avatars => {
            setAvatarList(avatars);
            navigation.navigate(
                RouteName.Activity.ApplicantList,
                {
                    activity: activity,
                } as ApplicantListProps
            )
        }).finally(() => setIsLoading(false)); // TODO catch
    }

    function handleOnMemebers() {
        if (activity.memberUserIds.length === 0) {
            return;
        }
        setIsLoading(true);
        userProfileApi.Post<Array<IUserAvatar>, Array<string>>(
            "getUserAvatars", activity.memberUserIds
        ).then(avatars => {
            setAvatarList(avatars);
            navigation.navigate(
                RouteName.Profile.ProfileList,
                {
                    activity: activity,
                } as ApplicantListProps
            )
        }).finally(() => setIsLoading(false)); // TODO catch
    }

    // cancel when user navigates back to previous screen
    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress", () => userIsEditingActivity
        );
        return () => backHandler.remove();
    }, [userIsEditingActivity]);

    return (
      <Container layout="root" type="screen">
        <ScrollView style={{ flex: 1, alignSelf: "stretch" }}>
          {/* Image */}
          <View style={style.galleryContainer}>
            <Image style={style.image} source={imageSource} />
            {userIsEditingActivity && (
              <View style={style.imageEditContainer}>
                <Menu>
                  <MenuTrigger>
                    <View
                      style={{
                        backgroundColor: theme.App.screenBackground,
                        borderRadius: 50,
                        marginRight: getResponsiveSize(15),
                        marginBottom: getResponsiveHeight(15),
                      }}
                    >
                      <IconButton
                        icon="lead-pencil"
                        color={theme.App.interactiveItem}
                        style={{ margin: 2 }}
                      />
                    </View>
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
                      onSelect={() => {
                        selectImage("file", handleImagePicked);
                      }}
                      text={translations.upload_from_filesystem}
                    />
                    <MenuOption
                      onSelect={() => {
                        selectImage("camera", handleImagePicked);
                      }}
                      text={translations.upload_from_camera}
                    />
                    <MenuOption
                      onSelect={() =>
                        setActivity({ ...activity, image: undefined })
                      }
                      text={translations.remove_image}
                    />
                  </MenuOptions>
                </Menu>
              </View>
            )}
          </View>

          {/* Quick Info */}
          <EditableSection
            isEditing={userIsEditingActivity}
            noDevider
            onEdit={() => setShowTitleEditor(true)}
          >
            <Text
              numberOfLines={1}
              style={[
                style.headline,
                userIsEditingActivity && { marginRight: getResponsiveSize(50) },
              ]}
            >
              {activity.title}
            </Text>
            <View style={style.primaryInfoContainer}>
              {!userIsEditingActivity && (
                <>
                  <TouchableRippleCircle onPress={() => handleOnApplicants()}>
                    <View style={style.innerRippleContainer}>
                      <Text
                        style={[
                          style.headline,
                          activity.applicantUserIds.length > 0 &&
                            activity.userId === user.id && {
                              color: theme.App.rejectColor,
                            },
                        ]}
                      >
                        {activity.applicantUserIds.length}
                      </Text>
                      <Text
                        style={[
                          style.text,
                          activity.applicantUserIds.length > 0 &&
                            activity.userId === user.id && {
                              color: theme.App.rejectColor,
                            },
                        ]}
                      >
                        {translations.applicants}
                      </Text>
                    </View>
                  </TouchableRippleCircle>
                  <TouchableRippleCircle onPress={() => handleOnMemebers()}>
                    <View style={style.innerRippleContainer}>
                      <Text style={style.linkHeadline}>
                        {activity.memberUserIds.length +
                          (activity.maxMember
                            ? " / " + activity.maxMember
                            : "")}
                      </Text>
                      <Text style={style.linkText}>{translations.member}</Text>
                    </View>
                  </TouchableRippleCircle>
                </>
              )}
            </View>
          </EditableSection>

          {/* Description */}
          {((activity.description && activity.description.trim().length > 0) ||
            userIsEditingActivity) && (
                <EditableSection
                    isEditing={userIsEditingActivity}
                    onEdit={() => setShowDescriptionEditor(true)}
                >
                    <Headline style={style.headline}>
                        {translations.description}
                    </Headline>
                    <Text style={style.text}>{activity.description}</Text>
                </EditableSection>
          )}

          {/* Information */}
          {(userIsEditingActivity ||
            activity.location ||
            activity.startDate ||
            activity.endDate) && (
            <EditableSection
              isEditing={userIsEditingActivity}
              onEdit={() => navigation.navigate(RouteName.Activity.EditForm)}
            >
              <Headline style={style.headline}>
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
                  keyText={translations.start_time}
                  valueText={moment.unix(activity.startDate).format("LLL")}
                />
              )}
              {activity.endDate && (
                <InfoItem
                  keyText={translations.end_time}
                  valueText={moment.unix(activity.endDate).format("LLL")}
                />
              )}
              {/* <InfoItem 
                                keyText={translations.visibility} 
                                valueText={activity.visibility.toString()} 
                            /> */}
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
                  editorTitlePlaceholder: translations.description,
                  editorCategoryPlaceholder: translations.category,
                  items: activity.tags,
                  headerTitle: translations.subjects,
                  onItemsChanged: (tags) =>
                    setActivity({ ...activity, tags: tags }),
                } as ICategorizedInputListConfig);
              }}
            >
              <Headline style={style.headline}>
                {translations.subjects}
              </Headline>
              {activity.tags?.map((tag, index) => (
                <InfoItem
                  key={index}
                  keyText={tag.category}
                  valueText={tag.title}
                />
              ))}
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
        <If condition={activity.userId !== user.id}>
          <View
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              flexDirection: "row",
              backgroundColor: theme.App.layoutBackground,
              borderTopWidth: themeType === "light" ? 2.5 : 0,
              borderColor: "#ECECEC",
            }}
          >
            <IconButton
              icon="eye-off"
              size={getResponsiveSize(50)}
              onPress={() => hideActivity(activity.id)}
              color={theme.App.rejectColor}
            />
            <IconButton
              icon="hand"
              size={getResponsiveSize(50)}
              onPress={() => applyToActivity(activity.id)}
              color={theme.App.acceptColor}
            />
          </View>
        </If>
      </Container>
    );
};

export default ActivityInfo;
