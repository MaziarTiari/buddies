import React, { useContext } from 'react'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import moment from 'moment';
import { INewUserProfile } from '../../models/UserProfile';
import { SessionContext } from '../../context/SessionContext/SessionContext';
import Form, { IFormField, InputType } from '../Form/Form';
import { AuthState } from '../../context/SessionContext/stateFrame';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RouteName } from '../../navigation/Navigation.config';

// const SIXTEEN_YEARS_AGO = moment.utc().subtract(16, "years").unix();

const ProfileEditForm = () => {

    const { translations } = useContext(LanguageContext);
    const { userProfile, user, authState, createUserProfile, setUserProfile, createUserProfileError } = useContext(SessionContext);

    let navigation: NavigationProp<any>;

    if (authState === AuthState.AUTHORIZED) {
        navigation = useNavigation();
        navigation.setOptions({ title: translations.menu_profile_editor });
    }

    const getGenderLabels = () => {
        const genders = translations.profile.gender_pick_labels as any;
        return Object.keys(genders).map(key => genders[key])
    }

    enum Field { NICKNAME, FIRSTNAME, SURNAME, CITY, BIRTHDATE, SEX };

    const fieldList: IFormField[] = [];

    fieldList[Field.NICKNAME] = {
        inputType: InputType.TEXT,
        initialValue: userProfile.username,
        required: true,
        placeholder: translations.profile.username,
    };

    fieldList[Field.FIRSTNAME] = {
        inputType: InputType.TEXT,
        initialValue: userProfile.firstname,
        required: true,
        placeholder: translations.profile.firstname
    };

    fieldList[Field.SURNAME] = {
        inputType: InputType.TEXT,
        initialValue: userProfile.lastname,
        required: true,
        placeholder: translations.profile.lastname
    };

    fieldList[Field.CITY] = {
        inputType: InputType.TEXT,
        initialValue: userProfile.city,
        required: true,
        placeholder: translations.profile.city,
    };

    fieldList[Field.BIRTHDATE] = {
        inputType: InputType.DATE,
        initialValue: moment.unix(userProfile.birthDate).toDate(),
        required: true,
        placeholder: translations.profile.birthDate,
        icon: "calendar",
    };

    fieldList[Field.SEX] = {
        inputType: InputType.SELECTOR,
        initialValue: userProfile.sex,
        required: true,
        placeholder: translations.profile.gender,
        items: getGenderLabels(),
    };

    const onSubmit = (data: any[]) => {
        if (authState === AuthState.AUTHORIZED_WITHOUT_PROFILE) {
            const createdUserProfile: INewUserProfile = {
                username: data[Field.NICKNAME],
                birthDate: moment(data[Field.BIRTHDATE] as Date).unix(),
                city: data[Field.CITY],
                firstname: data[Field.FIRSTNAME],
                lastname: data[Field.SURNAME],
                sex: data[Field.SEX],
                userId: user.id
            };
            createUserProfile(createdUserProfile)
        } else if (authState === AuthState.AUTHORIZED) {
            setUserProfile({
                ...userProfile,
                username: data[Field.NICKNAME],
                birthDate: moment(data[Field.BIRTHDATE] as Date).unix(),
                city: data[Field.CITY],
                firstname: data[Field.FIRSTNAME],
                lastname: data[Field.SURNAME],
                sex: data[Field.SEX],
            });
            navigation.navigate(RouteName.Profile.About);
        }
    }

    return (
        <Form
            errorMessage={createUserProfileError}
            heading={
                authState === AuthState.AUTHORIZED_WITHOUT_PROFILE
                    ? translations.createProfile.submit_button
                    : undefined
            }
            buttonTitle={"CHANGE"}
            onSubmit={onSubmit}
            fieldList={fieldList}
        />
    );
}

export default ProfileEditForm;
