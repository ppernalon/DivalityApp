import React from "react"
import { ImageBackground, Text, TouchableOpacity, View } from "react-native"
import { divalityFormStyle } from "./DivalityButtonTexturedStyle"
import { withTheme } from 'react-native-paper'
import { useTheme } from "react-native-paper"

type DivalityButtonTexturedProps = {
    label: string
    onSubmit: Function
    theme: any
    width? : string
}

const DivalityButtonTextured = ({
        onSubmit,
        label,
        width = '100%'
    }: DivalityButtonTexturedProps) => {
    const {fonts} = useTheme()
    const fontStyle = { 
        color:"white",
        fontFamily: fonts.medium.fontFamily,
        fontWeight: fonts.medium.fontWeight,
        fontSize: 18,
        paddingHorizontal: 20,
        paddingVertical: 15,
    }
    return (
        <View style={[divalityFormStyle.containerView, {width: width}]} >
            <TouchableOpacity style={divalityFormStyle.containerButton} onPress={() => onSubmit()}>
                <ImageBackground 
                    source={require("@images/texturebouton.png")} 
                    style={divalityFormStyle.backgroundButton}>
                    <Text style={fontStyle}>{label}</Text>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    )
}

export default withTheme(DivalityButtonTextured);