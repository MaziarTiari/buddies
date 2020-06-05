import React, { useContext } from "react";
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
import SwiperPagination from "../SwiperPagination/SwiperPagination";
import { SessionContext } from "../../context/SessionContext/SessionContext";

// TODO: Remove example_img Array and use Session Context instead
const example_img: string[] = [
    "https://www.bootdey.com/img/Content/avatar/avatar1.png",
    "https://upload.wikimedia.org/wikipedia/commons/3/30/%C5%A0koda_Superb_III_at_IAA_2019_IMG_0397.jpg",
    "https://www.thesun.co.uk/wp-content/uploads/2020/01/NINTCHDBPICT000554673258.jpg",
];

const ActivityInfo = () => {
    const style = useStyle();
    const navigation = useNavigation();
    const { translations } = useContext(LanguageContext);
    const { activity } = useContext(SessionContext);

    navigation.setOptions({ title: activity.title });

    return (
        <Container layout="root" type="screen">
            <ScrollView style={{ flex: 1, alignSelf: "stretch" }}>

                {/* Images */}
                <Swiper
                    containerStyle={style.galleryContainer}
                    renderPagination={(index, total) => <SwiperPagination index={index} total={total} />}
                >
                    {example_img.length > 0
                        ? (example_img.map((url, index) => (
                            <Image key={index} style={style.image} source={{ uri: url }} />)))
                        : (<Image
                            style={style.image}
                            source={require("../../../assets/img/defaultProfileImage.png")}
                        />)}
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
                            {moment.unix(activity.startDate).format("L")}
                        </Text>
                    </View>
                    <TouchableRippleCircle onPress={() => { }}>
                        <View style={style.innerRippleContainer}>
                            <Text style={style.headline}>
                                {(activity.memberUserIds ? activity.memberUserIds.length : 0) + (activity.maxApplications ? " / " + activity.maxApplications : "")}
                            </Text>
                            <Text style={style.text}>{translations.activity.members}</Text>
                        </View>
                    </TouchableRippleCircle>
                </View>

                {/* Description */}
                <EditableSection editable={true} onEdit={() => { }}>
                    <Headline style={style.headline}>{translations.activity.description}</Headline>
                    <Text style={style.text}>{activity.description}</Text>
                </EditableSection>

                {/* Information */}
                <EditableSection editable={true} onEdit={() => { }}>
                    <Headline style={style.headline}>{translations.activity.information}</Headline>
                    <InfoItem keyText={translations.activity.location} valueText={activity.location} />
                    <InfoItem keyText={translations.activity.startTime} valueText={moment.unix(activity.startDate).format("LLL")} />
                    {activity.endDate !== undefined &&
                        <InfoItem keyText={translations.activity.endTime} valueText={moment.unix(activity.endDate).format("LLL")} />}
                    {activity.hobbies && activity.hobbies.length > 0 &&
                        <InfoItem keyText={translations.activity.hobbies} valueText={activity.hobbies.map(hobby => hobby.title + " (" + hobby.category + ")").join(", ")} />}
                </EditableSection>

                {/* Criteria */}
                <EditableSection editable={true} onEdit={() => { }}>
                    <Headline style={style.headline}>{translations.activity.criteria}</Headline>
                    <InfoItem keyText={translations.activity.visibility} valueText={activity.visibility} />
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

            </ScrollView>
        </Container>
    );
};

export default ActivityInfo;