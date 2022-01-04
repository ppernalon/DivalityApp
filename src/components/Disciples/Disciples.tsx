import React, { useState } from "react"
import { Image, Text, View } from "react-native"
import { disciplesStyle } from "./DisciplesStyle"
import { useTheme } from "react-native-paper"
import { useSelector, useDispatch } from 'react-redux'
import {
  incrementByAmount,
  selectDisciples
} from './DisciplesSlice'

type HeaderTexturedProps = {
    fontColor?: string
}

const HeaderTextured = ({fontColor = "white"}: HeaderTexturedProps) => {
    const nberDisciples = useSelector(selectDisciples)
    const {fonts} = useTheme()
    const fontStyle = { 
        color: fontColor,
        fontFamily: fonts.medium.fontFamily,
        fontWeight: fonts.medium.fontWeight,
        fontSize: 27,
    }
    return (
        <View style={disciplesStyle.containerDisciples}>
            <Text style={fontStyle}> {nberDisciples} </Text>
            <Image source={require('@images/icon_disciple.png')} style={disciplesStyle.iconDisciple}/>
        </View> 
    )
}

export default HeaderTextured;