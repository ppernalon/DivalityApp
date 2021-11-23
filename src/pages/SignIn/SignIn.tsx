import React, { useRef, useState } from "react"
import {
    Animated,
    View
} from "react-native"
import DivalityForm from "../../components/DivalityForm/DivalityForm"
import DivalityButtonTextured from "../../components/DivalityButtonTextured/DivalityButtonTextured"
import { 
    formField 
} from "../../components/DivalityForm/DivalityFormTypes"
import LoadingHome from "@components/LoadingHome/LoadingHome"
import { signInStyles } from "./SignInStyle"
import ReactIf from "@components/ReactIf"

type SignInProps = {
    navigation: any
}

const SignIn = ({navigation} : SignInProps) => {
    
    let fadeAnim = useRef(new Animated.Value(1)).current;
    const [isAnimated, setIsAnimated] = useState(true);
    SignIn.fadeOut(fadeAnim, setIsAnimated)
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
        onSubmit: (formState: any) => (navigation.navigate('Logo'))
    }

    return (
        <View style={signInStyles.container}>
            <ReactIf condition={isAnimated}>
                <View style={signInStyles.LoadingHomeContainer}>
                    <Animated.View
                        style={{opacity: fadeAnim}}>
                        <LoadingHome/>
                    </Animated.View>
                </View>
            </ReactIf>
            <View style={signInStyles.DivalityFormContainer}>
                <DivalityForm 
                    formName={formEntries.formName}
                    formNameIsDisplay={false}
                    fields={formEntries.fields}
                    onSubmit={formEntries.onSubmit} 
                    submitButtonText={"Se connecter"} 
                />
            </View>
        </View>
    )
}

SignIn.fadeOut = (fadeAnim:any, setIsAnimated: any) => {
    Animated.timing(fadeAnim, {
        toValue: 0,
        delay: 2000,
        duration: 3000,
        useNativeDriver: true
      }).start(() => { setIsAnimated(false) });
}; 

export default SignIn