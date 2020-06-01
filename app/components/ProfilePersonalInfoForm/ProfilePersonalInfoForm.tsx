import React, { useState, useContext, useEffect } from 'react'
import Container from '../Container/Container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getResponsiveSize } from '../../utils/font/font';
import { Headline } from 'react-native-paper';
import Button from '../Button/Button';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { useStyle } from './ProfilePersonalInfoForm.style';
import FormInput from '../FormInput/FormInput';
import FormDatePicker from '../FormDatePicker/FormDatePicker';
import moment from 'moment';
import { Selector } from '../Selector/Selector';
import { isUndefinedOrEmpty } from '../../utils/generics';
import { ApiClient } from '../../api/ApiClient';
import { IUserProfile, INewUserProfile } from '../../models/User';
import { SessionContext } from '../../context/SessionContext/SessionContext';

export const INITIAL_FORM_STATUS = {
    username: false,
    firstname: false,
    lastname: false,
    city: false,
    birthDate: false,
    gender: false,
}

const SIXTEEN_YEARS_AGO = moment.utc().subtract(16, "years").unix();
const NOW = moment();

const INITIAL_FORM = {
    username: "",
    firstname: "",
    lastname: "",
    birthDate: SIXTEEN_YEARS_AGO,
    city: "",
    gender: "",
}

const UserProfileApi = new ApiClient<IUserProfile>(
    {baseURL: "http://localhost:5000/api/userprofiles/"}
);



interface CreateProfileFormProps {
    onSubmit: (form: INewUserProfile) => void; 
    title: string;
    submitTitle: string;
    defaultValues?: typeof INITIAL_FORM;
}

const CreateProfileForm = (Props: CreateProfileFormProps) => {
    const defaultBirthDateValue = Props.defaultValues 
        ? moment.unix(Props.defaultValues.birthDate).format('L') : ""
    const [form, setForm] = useState<typeof INITIAL_FORM>(Props.defaultValues || INITIAL_FORM)
    const [verify, setVerify] = useState(false);
    const [showUsernameErrorMessage, setShowUsernameErrorMessage] = useState(false);
    
    const [birthDateInputValue, setBirthDateInputValue] = useState(defaultBirthDateValue);
    const [usernameErrorStatus, setUsernameErrorStatus] = useState(false);
    const [firstnameErrorStatus, setFirstnameErrorStatus] = useState(false);
    const [lastnameErrorStatus, setLastnameErrorStatus] = useState(false);
    const [cityErrorStatus, setCityErrorStatus] = useState(false);
    const [genderErrorStatus, setGenderErrorStatus] = useState(false);
    const [birthDateErrorStatus, setBirthDateErrorStatus] = useState(false);

    const styles = useStyle();
    const { translations } = useContext(LanguageContext);
    const user = useContext(SessionContext);

    const getGenderLabels = () => {
        const genders = translations.profile.gender_pick_labels as any;
        return Object.keys(genders).map(key => genders[key])
    }

    const validateInputs = () => {
        let isValid = true;
        if(usernameErrorStatus || birthDateErrorStatus || cityErrorStatus || 
                firstnameErrorStatus || lastnameErrorStatus || genderErrorStatus || 
                showUsernameErrorMessage) {
            isValid = false;
        }
        Object.keys(form).forEach(i => {
            if( isUndefinedOrEmpty((form as any)[i]) ) {
                isValid = false;
                setVerify(!isValid);
                return isValid;
            }
        })
        if(isUndefinedOrEmpty(birthDateInputValue)) isValid = false;
        setVerify(!isValid);
        return isValid;
    }

    const onUsername = async (username: string) => {
        if(username === Props.defaultValues?.username || "") return;
        setForm({...form, username: username});
        await UserProfileApi.Get("username/" + username)
        .then(res => {
            if(res.data) setShowUsernameErrorMessage(true);
            else if(showUsernameErrorMessage) setShowUsernameErrorMessage(false);
        })
        .catch(err => console.log(err))
    }

    const onSubmit = async () => {
        const formIsValid = validateInputs();
        if(!formIsValid) return;
        const newUserProfile: INewUserProfile = {
            username: form.username, birthDate: form.birthDate, city: form.city, 
            firstname: form.firstname, lastname: form.lastname, sex: form.gender, 
            userId: user.user.id
        }
        Props.onSubmit(newUserProfile);
    }

    return (
        <Container type="screen" layout="root">
            <Container type="screen" layout="body">
                <KeyboardAwareScrollView 
                    resetScrollToCoords={{ x: 0, y: 0 }} enableOnAndroid
                    extraHeight={getResponsiveSize(20)} 
                    contentContainerStyle={styles.contentContainer}
                >
                    <Headline style={styles.heading}>{Props.title}</Headline>
                    <FormInput
                        defaultValue={Props.defaultValues?.username}
                        required errorStatusChange={setUsernameErrorStatus}
                        errorMessage={translations.createProfile.errorMessage.username.conflict}
                        showErrorMessage={showUsernameErrorMessage}
                        verify={verify}
                        onChangeText={onUsername}
                        placeholder={translations.profile.username}/>
                    <FormInput
                        defaultValue={Props.defaultValues?.firstname}
                        required errorStatusChange={setFirstnameErrorStatus}
                        verify={verify}
                        onChangeText={txt => setForm({...form, firstname: txt})}
                        placeholder={translations.profile.firstname}/>
                    <FormInput 
                        defaultValue={Props.defaultValues?.lastname}
                        required errorStatusChange={setLastnameErrorStatus}
                        verify={verify}
                        onChangeText={txt => setForm({...form, lastname: txt})}
                        placeholder={translations.profile.lastname}/>
                    <FormInput
                        defaultValue={Props.defaultValues?.city}
                        required errorStatusChange={setCityErrorStatus}
                        verify={birthDateErrorStatus}
                        onChangeText={txt => setForm({...form, city: txt})}
                        placeholder={translations.profile.city}/>
                    <FormDatePicker
                        verify={verify} defaultInputValue={defaultBirthDateValue}
                        inputPlaceholder={translations.profile.birthDate} required
                        onChangeText={setBirthDateInputValue}
                        onChange={date => setForm({...form, birthDate: moment(date).unix()})}
                        options={{ value: moment.unix(form.birthDate).toDate(),
                            maximumDate: moment.unix(SIXTEEN_YEARS_AGO).toDate()
                        }}/>
                    <Selector
                        error={verify} selectedItem={Props.defaultValues?.gender}
                        placeholder={translations.profile.gender}
                        onSelect={gender => setForm({...form, gender: gender})}
                        modalTitle={translations.profile.gender}
                        items={getGenderLabels()} />
                    <Button 
                        onPress={onSubmit}
                        title={Props.submitTitle} 
                        style={styles.submitButton}/>
                </KeyboardAwareScrollView>
            </Container>
        </Container>
    );
}

export default CreateProfileForm
