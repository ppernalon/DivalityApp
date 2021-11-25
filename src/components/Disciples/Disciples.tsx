import React from "react"
import { Image, Text, View } from "react-native"
import { disciplesStyle } from "./DisciplesStyle"
import { useTheme } from "react-native-paper"


const HeaderTextured = () => {
    const {fonts} = useTheme()
    const fontStyle = { 
        color:"white",
        fontFamily: fonts.medium.fontFamily,
        fontWeight: fonts.medium.fontWeight,
        fontSize: 27,
    }
    return (
        <View style={disciplesStyle.containerDisciples}>
            <Text style={fontStyle}>50</Text>
            <Image source={require('@images/icon_disciple.png')} style={disciplesStyle.iconDisciple}/>
        </View> 
    )
}

export default HeaderTextured;