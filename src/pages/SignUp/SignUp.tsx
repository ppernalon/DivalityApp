import DivilityLogo from "components/DivalityLogo/DivalityLogo"
import React from "react"
import {
    View
} from "react-native"
import LinearGradient from "react-native-linear-gradient"
import { Text } from "react-native-paper"
import DivalityForm from "../../components/DivalityForm/DivalityForm"
import { 
    checkBeforeSubmitFunction,
    checkFormAnswer, 
    formField 
} from "../../components/DivalityForm/DivalityFormTypes"
import { signUpStyles } from "./SignUpStyles"

type SignUpProps = {
    navigation: any
}

const SignUp = ({navigation} : SignUpProps) => {

    const formEntries = {
        formName: "Inscription",
        fields: [
            {
                id: "pseudo",
                label: "Pseudo", 
                type: "text",
                placeholder: "Pseudo",
                checkBeforeSubmit: SignUp.checkPseudo as checkBeforeSubmitFunction
            } as formField,
            {
                id: "password", 
                label: "Mot de passe", 
                type: "password",
                placeholder: "Mot de passe",
                shouldMatchWith: "confirmedPassword"
            } as formField,
            {
                id: "confirmedPassword", 
                label: "Confirmation du mot de passe", 
                type: "password",
                placeholder: "Mot de passe",
                shouldMatchWith: "password"
            } as formField,
        ],
        onSubmit: (formState: any) => (console.log(formState))
    }

    return (
        <LinearGradient 
        colors={['#49C5FF', '#8DD1EE']}
        style={signUpStyles.container}>
            <View style={signUpStyles.DivalityFormContainer}>
                <DivilityLogo/>
                <DivalityForm 
                    formName={formEntries.formName}
                    formNameIsDisplay={false}
                    fields={formEntries.fields}
                    onSubmit={formEntries.onSubmit} 
                    submitButtonText={"S'inscrire"} />
                <View style={signUpStyles.ContainerLink}>
                        <Text style={signUpStyles.TextNoLink}>
                            Vous possedez déjà un compte ?
                        </Text>
                        <Text style={signUpStyles.TextLink}
                        onPress={() => navigation.navigate('SignIn')}>
                            Connectez-vous
                        </Text>
                    </View>
            </View>
        </LinearGradient>
    )
}

SignUp.checkPseudo = (value: string) : checkFormAnswer => {
    let authorizedChar = "AZERTYUIOPQSDFGHJKLMWXCVBN"
    authorizedChar += authorizedChar.toLocaleLowerCase()
    authorizedChar += "0123456789"
    const valueChar = value.split("")
    const unauthorizedValues = valueChar.filter(char => !authorizedChar.includes(char))
    if (unauthorizedValues.length > 0){
        return {
            isValid: false,
            message: "Caratères non autorisés dans le pseudo"
        } as checkFormAnswer
    }
    return {
        isValid: true,
        message: ""
    } as checkFormAnswer
}

export default SignUp