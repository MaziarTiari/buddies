import React, { useContext } from 'react'
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import moment from 'moment';
import { INewUserProfile } from '../../models/UserProfile';
import { SessionContext } from '../../context/SessionContext/SessionContext';
import Form, { IFormField, InputType } from '../Form/Form';
import { AuthState } from '../../context/SessionContext/sessionContextModel';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RouteName } from '../../navigation/Navigation.config';

// const SIXTEEN_YEARS_AGO = moment.utc().subtract(16, "years").unix();

const ProfileEditForm = () => {

    const { translations } = useContext(LanguageContext);
    
    const { 
        userProfile, 
        user, 
        authState, 
        createUserProfile, 
        setUserProfile 
    } = useContext(SessionContext);

    let navigation: NavigationProp<any>;

    if (authState === AuthState.AUTHORIZED) {
        navigation = useNavigation();
        navigation.setOptions({ title: translations.edit_profile });
    }

    enum Field { NICKNAME, FIRSTNAME, SURNAME, CITY, BIRTHDATE, SEX };

    const fieldList: IFormField[] = [];

    fieldList[Field.NICKNAME] = {
        inputType: InputType.TEXT,
        initialValue: userProfile.username,
        required: true,
        placeholder: translations.username,
    };

    fieldList[Field.FIRSTNAME] = {
        inputType: InputType.TEXT,
        initialValue: userProfile.firstname,
        required: true,
        placeholder: translations.firstname
    };

    fieldList[Field.SURNAME] = {
        inputType: InputType.TEXT,
        initialValue: userProfile.lastname,
        required: true,
        placeholder: translations.surname
    };

    fieldList[Field.CITY] = {
        inputType: InputType.TEXT,
        initialValue: userProfile.city,
        required: true,
        placeholder: translations.city,
    };

    fieldList[Field.BIRTHDATE] = {
        inputType: InputType.DATE,
        initialValue: moment.unix(userProfile.birthDate).toDate(),
        required: true,
        placeholder: translations.birthdate,
        icon: "calendar",
    };

    fieldList[Field.SEX] = {
        inputType: InputType.SELECTOR,
        initialValue: userProfile.sex,
        required: true,
        placeholder: translations.sex,
        items: [translations.female, translations.male, translations.diverse],
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
            heading={
                authState === AuthState.AUTHORIZED_WITHOUT_PROFILE
                    ? translations.create_your_profile
                    : undefined
            }
            buttonTitle={
                authState === AuthState.AUTHORIZED_WITHOUT_PROFILE
                    ? translations.create
                    : translations.apply_changes
            }
            onSubmit={onSubmit}
            fieldList={fieldList}
        />
    );
}

export default ProfileEditForm;
