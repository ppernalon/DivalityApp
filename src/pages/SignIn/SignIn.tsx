import React from "react"
import {
    ImageBackground,
    View
} from "react-native"
import DivalityForm from "../../components/DivalityForm/DivalityForm"
import { Button } from 'react-native-paper'
import DivalityButtonTextured from "../../components/DivalityButtonTextured/DivalityButtonTextured"

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
        <View style={{paddingHorizontal:20}}>
            <DivalityForm 
                formName={formEntries.formName}
                formNameIsDisplay={false}
                items={formEntries.items}
                onSubmit={formEntries.onSubmit}
            />
            <View style={{alignItems:'center'}}>
                <DivalityButtonTextured
                    width= "50%"
                    label="Yolo" 
                    onSubmit={()=>{console.log("r")
                }}
                />
            </View>
        </View>
    )
}

export default SignIn