import React, { useEffect, useState } from 'react'
import { 
    StyleSheet, NativeSyntheticEvent, TextInputFocusEventData 
} from 'react-native'
import Container from '../Container/Container'
import { useForm } from 'react-hook-form'
import InputField, { InputFieldProps } from '../InputField/InputField'
import { Headline } from 'react-native-paper'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from '../Button/Button'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getResponsiveSize, fontsizes } from '../../utils/font/font'

const LoginForm = () => {
    const {register, handleSubmit, setValue} = useForm();

    useEffect(() => {
        register("username");
        register("password");
        register("email");
        register("phone");
        register("city")
        register("birthDate")
    },[register]);

    const onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        
    }
    
    // TODO fix android
    return (
        <Container type="screen" layout="root" style={{paddingTop:"10%"}}>
            <Container type="component" layout="root_center" style={{alignSelf:"stretch", justifyContent:"center",}}>
            <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }} enableOnAndroid
                style={{alignSelf:"stretch"}} extraHeight={getResponsiveSize(20)}>
                <Headline style={{color:"#fff", fontWeight:"700"}}>Register</Headline>
                <LoginInputField onFocus={onFocus} iconName="face-profile" placeholder="Username"/>
                <LoginInputField iconName="email" placeholder="Email"/>
                <LoginInputField iconName="cellphone" placeholder="Phone"/>
                <LoginInputField iconName="calendar" placeholder="Birth date"/>
                <LoginInputField iconName="city" placeholder="City"/>
                <LoginInputField iconName="onepassword" secureTextEntry placeholder="Password"/>
                <LoginInputField iconName="onepassword" secureTextEntry 
                                placeholder="Repeat password"/>
                <Button onPress={()=>{}} title="Register" style={{marginVertical:"5%"}}/>
                </KeyboardAwareScrollView>
            </Container>
        </Container>

    )
}

const styles = StyleSheet.create({
    root: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        alignContent:"center"
    }
});

interface LoginInputFieldProps extends InputFieldProps{
    iconName: string;
}
class LoginInputField extends React.Component<LoginInputFieldProps> {
    render() {
        return <InputField 
                    {...this.props} style={{color:"#000000", fontSize:fontsizes.medium}}
                    containerStyle={
                        {borderRadius:getResponsiveSize(8), marginVertical:getResponsiveSize(10), paddingHorizontal: getResponsiveSize(9),}}
                    leftComponent={
                        <MaterialCommunityIcons 
                            style={{marginRight:10}} name={this.props.iconName} 
                            size={getResponsiveSize(24)}/>
                    }
                />
    }
}

export default LoginForm
