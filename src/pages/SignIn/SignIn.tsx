import React from "react"
import {
    View
} from "react-native"
import DivilityLogo from "../../components/DivalityLogo/DivalityLogo"
import { TextInput } from 'react-native-paper'

const SignIn = () => {
    return (
        <View>
            <DivilityLogo/>
            <TextInput
                label="Email"
                mode='outlined'
                value={'ééé'}
                onChangeText={text => null}
            />
        </View>
    )
}

export default SignIn