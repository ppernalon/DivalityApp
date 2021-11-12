import React from "react"
import {
    View
} from "react-native"
import DivalityForm from "../../components/DivalityForm/DivalityForm"

const SignIn = () => {

    const formEntries = {
        formName: "Inscription",
        items: [
            {id: "pseudo" ,label: "Pseudo", type: "text"},
            {id: "password", label: "Mot de passe", type: "password"},
            {id: "confirmedPassword", label: "Confirmation du mot de passe", type: "password"}
        ],
        onSubmit: (formState: any) => (console.log(formState))
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