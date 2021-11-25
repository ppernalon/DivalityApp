import React from "react"
import { ImageBackground, View } from "react-native"
import { headerTexturedStyle } from "./HeaderTexturedStyle"

type HeaderTexturedProps = {
    children: JSX.Element
}

const HeaderTextured = (props: HeaderTexturedProps) => {
    return (
        <ImageBackground 
            source={require("@images/texturebouton.png")} 
            style={headerTexturedStyle.backgroundHeader}>
            <View>
                {props.children}
            </View> 
        </ImageBackground>
    )
}

export default HeaderTextured;