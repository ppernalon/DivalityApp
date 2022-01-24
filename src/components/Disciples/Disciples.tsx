import React from "react"
import { Image, Text, View } from "react-native"
import { disciplesStyle } from "./DisciplesStyle"
import { useTheme } from "react-native-paper"
import { useSelector } from 'react-redux'
import {
  selectDisciples
} from '../../store/reducers/DisciplesSlice'

type DisciplesProps = {
    fontColor?: string
}

const Disciples = ({fontColor = "white"}: DisciplesProps) => {
    const nberDisciples = useSelector(selectDisciples)
    const {fonts} = useTheme()
    const fontStyle = { 
        color: fontColor,
        fontFamily: fonts.medium.fontFamily,
        fontWeight: fonts.medium.fontWeight,
        fontSize: 25,
    }
    return (
        <View style={disciplesStyle.containerDisciples}>
            <Text style={fontStyle}> {nberDisciples} </Text>
            <Image source={require('@images/icon_disciple.png')} style={disciplesStyle.iconDisciple}/>
        </View> 
    )
}

export default Disciples;