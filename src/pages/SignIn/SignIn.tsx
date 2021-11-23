import React from "react"
import {
    View
} from "react-native"
import DivalityForm from "../../components/DivalityForm/DivalityForm"
import DivalityButtonTextured from "../../components/DivalityButtonTextured/DivalityButtonTextured"
import { 
    checkBeforeSubmitFunction,
    checkFormAnswer, 
    formField 
} from "../../components/DivalityForm/DivalityFormTypes"

type SignInProps = {
    navigation: any
}

const SignIn = ({navigation} : SignInProps) => {

    const formEntries = {
        formName: "Inscription",
        fields: [
            {
                id: "pseudo",
                label: "Pseudo", 
                type: "text",
                placeholder: "Pseudo",
                checkBeforeSubmit: SignIn.checkPseudo as checkBeforeSubmitFunction
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
        onSubmit: (formState: any) => (navigation.navigate('Logo'))
    }

    return (
        <View>
            <DivalityForm 
                formName={formEntries.formName}
                formNameIsDisplay={false}
                fields={formEntries.fields}
                onSubmit={formEntries.onSubmit}
            />
            <View style={{alignItems:'center'}}>
                <DivalityButtonTextured
                    width= "50%"
                    label="Yolo" 
                    onSubmit={()=>{console.log("r")}}
                />
            </View>
        </View>
    )
}

SignIn.checkPseudo = (value: string) : checkFormAnswer => {
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

export default SignIn