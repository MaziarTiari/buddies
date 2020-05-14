import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Container from '../Container/Container'
import { useForm } from 'react-hook-form'
import InputField, { InputFieldProps } from '../InputField/InputField'
import { Headline } from 'react-native-paper'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Button from '../Button/Button'

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
    
    // TODO fix android
    return (
        <Container keyboardAwareScrollView type="screen" layout="root">
            <Container 
                type="component" layout="root_center" style={{justifyContent:"center"}}
            >
                <Headline style={{color:"#fff", fontWeight:"700"}}>Register</Headline>
                <LoginInputField iconName="face-profile" placeholder="Username"/>
                <LoginInputField iconName="email" placeholder="Email"/>
                <LoginInputField iconName="cellphone" placeholder="Phone"/>
                <LoginInputField iconName="calendar" placeholder="Birth date"/>
                <LoginInputField iconName="city" placeholder="City"/>
                <LoginInputField iconName="onepassword" secureTextEntry placeholder="Password"/>
                <LoginInputField iconName="onepassword" secureTextEntry 
                                 placeholder="Repeat password"/>
                <Button onPress={()=>{}} title="Register" style={{marginVertical:"5%"}}/>
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
                    {...this.props} style={{color:"#000000"}}
                    containerStyle={
                        {borderRadius:8, marginVertical:"5%", paddingHorizontal: 9,}}
                    leftComponent={
                        <MaterialCommunityIcons 
                            style={{marginRight:10}} name={this.props.iconName} 
                            size={22}/>
                    }
                />
    }
}

export default LoginForm
