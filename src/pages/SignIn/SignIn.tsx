import React from "react"
import {
    View
} from "react-native"
import DivalityForm from "../../components/DivalityForm/DivalityForm"
import DivalityButtonTextured from "../../components/DivalityButtonTextured/DivalityButtonTextured"
import { 
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

export default SignIn