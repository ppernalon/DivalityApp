import React from "react"
import {
    View
} from "react-native"
import DivalityForm from "../../components/DivalityForm/DivalityForm"
import DivalityButtonTextured from "../../components/DivalityButtonTextured/DivalityButtonTextured"
import { 
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
                toCheck: true, 
                checkBeforeSubmit: SignIn.checkPseudo
            } as formField,
            {
                id: "password", 
                label: "Mot de passe", 
                type: "password",
                placeholder: "Mot de passe",
                toCheck: false
            } as formField,
            {
                id: "confirmedPassword", 
                label: "Confirmation du mot de passe", 
                type: "password",
                placeholder: "Mot de passe", 
                toCheck: false
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
    if (value.split("").includes(" ")){
        return {
            isValid: false,
            message: ""
        } as checkFormAnswer
    }
    return {
        isValid: true,
        message: ""
    } as checkFormAnswer
}

export default SignIn