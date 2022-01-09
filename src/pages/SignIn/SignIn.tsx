import React, { useRef, useState } from "react"
import {
    Animated,
    View
} from "react-native"
import DivalityForm from "../../components/DivalityForm/DivalityForm"
import { 
    formField 
} from "../../components/DivalityForm/DivalityFormTypes"
import LoadingHome from "@components/LoadingHome/LoadingHome"
import { signInStyles } from "./SignInStyle"
import ReactIf from "@components/ReactIf"
import LinearGradient from "react-native-linear-gradient"
import DivilityLogo from "@components/DivalityLogo/DivalityLogo"
import { Text } from "react-native-paper"
import SignInHttpService from "http-services/SignInHttpService"

type SignInProps = {
    navigation: any
}

const SignIn = ({navigation} : SignInProps) => {

    fetch("https://paul-pernalon.fr:5001/user/signin/aa/aa").then((res) => console.log(res)).catch(err => console.log(err))

    let fadeAnim = useRef(new Animated.Value(1)).current;
    const [isAnimated, setIsAnimated] = useState(true);
    if (isAnimated){
        SignIn.fadeOut(fadeAnim, setIsAnimated)
    }
    const formEntries = {
        formName: "Inscription",
        fields: [
            {
                id: "pseudo",
                label: "Pseudo", 
                type: "text",
                placeholder: "Pseudo"
            } as formField,
            {
                id: "password", 
                label: "Mot de passe", 
                type: "password",
                placeholder: "Mot de passe"
            } as formField
        ],
        onSubmit: (formState: any) => {
            let formStateApi={
                username: formState.pseudo.value,
                password: formState.password.value
            }
            navigation.navigate('Menu')
            // SignInHttpService
            // .signIn(formStateApi)
            // .then(res => {
            //     console.log(res)
            // })
            // .catch(err => {
            //     console.log(JSON.stringify(err),'error')
            // } )
        }
    }

    return (
        <LinearGradient 
            colors={['#49C5FF', '#8DD1EE']}
            style={signInStyles.container}
        >
            <ReactIf condition={isAnimated}>
                <View style={signInStyles.LoadingHomeContainer}>
                    <Animated.View style={{opacity: fadeAnim}}>
                        <LoadingHome/>
                    </Animated.View>
                </View>
            </ReactIf>
            <View style={signInStyles.DivalityFormContainer}>
                <DivilityLogo/>
                <DivalityForm 
                    formName={formEntries.formName}
                    formNameIsDisplay={false}
                    fields={formEntries.fields}
                    onSubmit={formEntries.onSubmit} 
                    submitButtonText={"Se connecter"} 
                />
                <View style={signInStyles.ContainerLink}>
                    <Text style={signInStyles.TextNoLink}>
                        Pas encore de compte ? 
                    </Text>
                    <Text style={signInStyles.TextLink}
                onPress={() => navigation.navigate('SignUp')}>
                     Inscrivez-vous 
                </Text>
                </View>
                
            </View>
        </LinearGradient>
    )
}

SignIn.fadeOut = (fadeAnim:any, setIsAnimated: any) => {
    Animated.timing(fadeAnim, {
        toValue: 0,
        delay: 2000,
        duration: 3000,
        useNativeDriver: true
      }).start(() => { setIsAnimated(false) });
}

export default SignIn