import React from "react"
import { View, Image } from "react-native"
import { divalityLogoStyle } from "./DivalityLogoStyle"

const DivilityLogo = () => {
    return (
        <View style={divalityLogoStyle.container}>
            <Image 
                source={require('@images/logo.png')} 
                style={divalityLogoStyle.logoImage}/>
        </View>
    )
}

export default DivilityLogo