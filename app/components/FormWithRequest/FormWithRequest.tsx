import React, { useContext, ReactNode } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Container from '../Container/Container'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getResponsiveSize, fontsizes } from '../../utils/font/font'
import { ThemeContext } from '../../context/ThemeContext/ThemeContext'
import { Headline } from 'react-native-paper'
import Button from '../Button/Button'
import LinkLabel from '../LinkLabel/LinkLabel'
import { isUndefinedOrEmpty } from '../../utils/generics'

interface FormWithRequestProps {
    heading?: string;
    responseError?: string;
    children: ReactNode;
    buttonTitle: string;
    onSubmit: () => void;
    linkLabel?: string;
    onLink?: () => void;
}

const FormWithRequest = (Props: FormWithRequestProps) => {
    const { theme } = useContext(ThemeContext);
    const styles = StyleSheet.create({
        contentContainer: {
            marginHorizontal: getResponsiveSize(30),
            paddingVertical: getResponsiveSize(30),
        },
        heading: {
            color: theme.App.primaryText,
            fontWeight: "700",
            marginBottom: getResponsiveSize(20),
        },
        responceError: {
            color: theme.App.errorColor,
            fontSize: fontsizes.medium
        },
        submitButton: {
            marginVertical: getResponsiveSize(20),
            alignSelf: "center"
        },
    });
    return (
        <Container type="screen" layout="root">
            <Container type="screen" layout="body">
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }} enableOnAndroid
                    extraHeight={getResponsiveSize(20)}
                    contentContainerStyle={styles.contentContainer}
                >
                    {Props.heading &&
                        <Headline style={styles.heading}>
                            {Props.heading}
                        </Headline>
                    }
                    {!isUndefinedOrEmpty(Props.responseError) &&
                        <Text style={styles.responceError}>
                            {Props.responseError}
                        </Text>
                    }
                    {Props.children}
                    <Button
                        onPress={Props.onSubmit} title={Props.buttonTitle}
                        style={styles.submitButton} />
                    {(Props.linkLabel && Props.linkLabel !== "") &&
                        <LinkLabel label={Props.linkLabel} onPress={Props.onLink} />}
                </KeyboardAwareScrollView>
            </Container>
        </Container>
    )
}

export default FormWithRequest
