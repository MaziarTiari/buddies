import React, { useState, useContext, useEffect } from 'react'
import Container from '../Container/Container';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getResponsiveSize } from '../../utils/font/font';
import { Headline } from 'react-native-paper';
import Button from '../Button/Button';
import { LanguageContext } from '../../context/LanguageContext/LanguageContext';
import { useStyle } from './CreateProfileForm.style';
import FormInput from '../FormInput/FormInput';
import FormDatePicker from '../FormDatePicker/FormDatePicker';
import moment, { Moment } from 'moment';
import { Selector } from '../Selector/Selector';
import { isUndefinedOrEmpty } from '../../utils/generics';
import { ApiClient } from '../../api/ApiClient';
import { IUserProfile, INewUserProfile } from '../../models/User';
import { ProfileContext } from '../../context/ProfileContext/ProfileContext';
import { CONFLICT } from 'http-status-codes';

export const INITIAL_FORM_STATUS = {
    username: false,
    firstname: false,
    lastname: false,
    city: false,
    birthDate: false,
    gender: false,
}

interface ICreateProfileForm {
    username: string;
    firstname: string;
    lastname: string;
    city: string;
    birthDate: Moment;
    gender: string;
}

const SIXTEEN_YEARS_AGO = moment.utc().subtract(16, "years");
const NOW = moment();

const INITIAL_FORM: ICreateProfileForm = {
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

const CreateProfileForm = ({ onCreateUser }: {onCreateUser: () => void}) => {
    // const [username, setUsername] = useState("");
    // const [firstname, setFirstname] = useState("");
    // const [lastname, setLastname] = useState("");
    // const [city, setCity] = useState("");
    // const [birthDate, setBirthDate] = useState<Moment>(NOW);
    // const [gender, setGender] = useState("");
    const [form, setForm] = useState<typeof INITIAL_FORM>(INITIAL_FORM)
    const [verify, setVerify] = useState(false);
    const [showUsernameErrorMessage, setShowUsernameErrorMessage] = useState(false);
    
    const [usernameErrorStatus, setUsernameErrorStatus] = useState(false);
    const [firstnameErrorStatus, setFirstnameErrorStatus] = useState(false);
    const [lastnameErrorStatus, setLastnameErrorStatus] = useState(false);
    const [cityErrorStatus, setCityErrorStatus] = useState(false);
    const [genderErrorStatus, setGenderErrorStatus] = useState(false);
    const [birthDateErrorStatus, setBirthDateErrorStatus] = useState(false);

    const styles = useStyle();
    const { translations } = useContext(LanguageContext);
    const user = useContext(ProfileContext);

    const getGenderLabels = () => {
        const genders = translations.profile.gender_pick_labels as any;
        return Object.keys(genders).map(key => genders[key])
    }

    const validateInputs = () => {
        let isValid = true;
        if(usernameErrorStatus || birthDateErrorStatus || cityErrorStatus || 
                firstnameErrorStatus || lastnameErrorStatus || genderErrorStatus)
            isValid = false;
        if(!form.birthDate) isValid = false;
        setVerify(isValid);
        return isValid;
    }

    const onUsername = async (username: string) => {
        if(isUndefinedOrEmpty(username)) return;
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
        const birthDateTimstamp = moment(form.birthDate).unix();
        const newUserProfile: INewUserProfile = {
            username: form.username, birthDate: birthDateTimstamp, city: form.city, 
            firstname: form.firstname, lastname: form.lastname, sex: form.gender, 
            userId: user.user.id
        }
        await UserProfileApi.Post<IUserProfile, INewUserProfile>(newUserProfile)
        .then(res => {
            if(res.data && !res.error) {
                user.setUserProfile(res.data);
                onCreateUser();
            }
            else {
                if(res.error?.status === CONFLICT) {
                    setShowUsernameErrorMessage(true);
                } else console.error(res.error)
            }
        })
        .catch(err => console.error(err));
    }

    return (
        <Container type="screen" layout="root">
            <Container type="screen" layout="body">
                <KeyboardAwareScrollView 
                    resetScrollToCoords={{ x: 0, y: 0 }} enableOnAndroid
                    extraHeight={getResponsiveSize(20)} 
                    contentContainerStyle={styles.contentContainer}
                >
                    <Headline style={styles.heading}>
                        {translations.ScreenHeading.createProfile}
                    </Headline>
                    <FormInput
                        required errorStatusChange={setUsernameErrorStatus}
                        errorMessage={translations.createProfile.errorMessage.username.conflict}
                        showErrorMessage={showUsernameErrorMessage}
                        verify={verify}
                        onChangeText={onUsername}
                        placeholder={translations.profile.username}/>
                    <FormInput
                        required errorStatusChange={setFirstnameErrorStatus}
                        verify={verify}
                        onChangeText={txt => setForm({...form, firstname: txt})}
                        placeholder={translations.profile.firstname}/>
                    <FormInput 
                        required errorStatusChange={setLastnameErrorStatus}
                        verify={verify}
                        onChangeText={txt => setForm({...form, lastname: txt})}
                        placeholder={translations.profile.lastname}/>
                    <FormInput
                        required errorStatusChange={setCityErrorStatus}
                        verify={birthDateErrorStatus}
                        onChangeText={txt => setForm({...form, city: txt})}
                        placeholder={translations.profile.city}/>
                    <FormDatePicker
                        verify={verify}
                        inputPlaceholder={translations.profile.birthDate}
                        onChange={date => setForm({...form, birthDate: moment(date)})}
                        options={{
                            value: form.birthDate.toDate(), 
                            maximumDate: SIXTEEN_YEARS_AGO.toDate()
                        }}/>
                    <Selector
                        error={verify}
                        placeholder={translations.profile.gender}
                        onSelect={gender => setForm({...form, gender: gender})}
                        modalTitle={translations.profile.gender}
                        items={getGenderLabels()} selectedItem={""}/>
                    <Button 
                        onPress={onSubmit}
                        title={translations.createProfile.submit_button} 
                        style={styles.submitButton}/>
                </KeyboardAwareScrollView>
            </Container>
        </Container>
    );
}

export default CreateProfileForm
