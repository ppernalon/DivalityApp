import React from "react"
import {
    View
} from "react-native"
import DivalityForm from "../../components/DivalityForm/DivalityForm"
import DivalityButtonTextured from "../../components/DivalityButtonTextured/DivalityButtonTextured"

type SignInProps = {
    navigation: any
}

const SignIn = ({navigation} : SignInProps) => {

    const formEntries = {
        formName: "Inscription",
        fields: [
            {id: "pseudo" ,label: "Pseudo", type: "text", toCheck: false},
            {id: "password", label: "Mot de passe", type: "password", toCheck: false},
            {id: "confirmedPassword", label: "Confirmation du mot de passe", type: "password", toCheck: false},
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