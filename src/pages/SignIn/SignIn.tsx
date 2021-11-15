import React from "react"
import {
    View, Button
} from "react-native"
import DivalityForm from "../../components/DivalityForm/DivalityForm"

type SignInProps = {
    navigation: any
}

const SignIn = ({navigation} : SignInProps) => {

    const formEntries = {
        formName: "Inscription",
        items: [
            {id: "pseudo" ,label: "Pseudo", type: "text"},
            {id: "password", label: "Mot de passe", type: "password"},
            {id: "confirmedPassword", label: "Confirmation du mot de passe", type: "password"}
        ],
        onSubmit: (formState: any) => (navigation.navigate('Logo'))
    }
    return (
        <View>
            <DivalityForm 
                formName={formEntries.formName}
                formNameIsDisplay={false}
                items={formEntries.items}
                onSubmit={formEntries.onSubmit}
            />
        </View>
    )
}

export default SignIn