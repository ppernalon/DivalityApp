import React, { useState } from "react"
import { ImageBackground, Text, TouchableOpacity, View } from "react-native"
import { divalityFormStyle } from "./DivalityButtonTexturedStyle"
import { withTheme } from 'react-native-paper'
import { useTheme } from "react-native-paper"


type DivalityButtonTexturedProps = {
    label: string
    onSubmit: Function
    theme: any
    width: string
}

const DivalityButtonTextured = ({
        onSubmit,
        label,
        width = '100%'
    }: DivalityButtonTexturedProps) => {
    const {fonts} = useTheme()
    const fontStyle = { 
        color:"white",
        fontFamily: fonts.regular.fontFamily,
        fontWeight: fonts.regular.fontWeight,
        paddingHorizontal: 20,
        paddingVertical: 10
    }
    return (
        <View style={[divalityFormStyle.containerView, {width:width}]} >
            <TouchableOpacity style={divalityFormStyle.containerButton} onPress={() => onSubmit()}>
                <ImageBackground 
                    source={require("../../../assets/images/texturebouton.png")} 
                    style={divalityFormStyle.backgroundButton}>
                    <Text style={fontStyle}>{label}</Text>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    )
}

export default withTheme(DivalityButtonTextured);