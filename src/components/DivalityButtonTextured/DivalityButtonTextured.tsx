import React from 'react'
import {Button, ImageBackground, Text, TouchableOpacity, View} from 'react-native'
import {divalityFormStyle} from './DivalityButtonTexturedStyle'
import {withTheme} from 'react-native-paper'
import {useTheme} from 'react-native-paper'
import {colors} from 'GlobalStyle'

type DivalityButtonTexturedProps = {
    label: string
    onSubmit: Function
    theme: any
    width?: string
    fontSize?: number
    paddingHorizontal?: number
    paddingVertical?: number
    isCancelButton?: boolean
    isShadow?: boolean
}

const DivalityButtonTextured = ({
    fontSize = 18,
    onSubmit,
    label,
    width = '100%',
    paddingHorizontal = 20,
    paddingVertical = 15,
    isCancelButton = false,
    isShadow =  true
}: DivalityButtonTexturedProps) => {
    const {fonts} = useTheme()
    const fontStyle = {
        color: isCancelButton ? colors.blueSky : 'white',
        fontFamily: fonts.medium.fontFamily,
        fontWeight: fonts.medium.fontWeight,
        fontSize: fontSize,
        paddingHorizontal: paddingHorizontal,
        paddingVertical: paddingVertical,
    }
    const shadowStyle = {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
    }
    return (
        <View style={[divalityFormStyle.containerView, {width: width}]}>
            <TouchableOpacity style={divalityFormStyle.containerButton} onPress={() => onSubmit()}>
                {isCancelButton ? (
                    <View style={divalityFormStyle.backgroundCancelButton}>
                        <Text style={fontStyle}>{label}</Text>
                    </View>
                ) : (
                    <ImageBackground source={require('@images/texturebouton.png')} style={[divalityFormStyle.backgroundButton, isShadow ? shadowStyle : {}]}>
                        <Text style={fontStyle}>{label}</Text>
                    </ImageBackground>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default withTheme(DivalityButtonTextured)
