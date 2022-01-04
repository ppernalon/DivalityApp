import React, { useState } from "react"
import {
    Image,
    View
} from "react-native"
import { Text } from "react-native-paper"
import HeaderTextured from "components/HeaderTextured/HeaderTextured"
import Disciples from "components/Disciples/Disciples"
import { colors } from "GlobalStyle"
import { TouchableOpacity } from "react-native"

type MyCollectionProps = {
    navigation: any
}

const MyCollection = ({navigation} : MyCollectionProps) => {
    const [currentPantheon, setCurrentPantheon] = useState<string>("egyptian")
    const [egyptianCards, setEgyptianCards] = useState<string[]>([])
    const [greekCards, setGreekCards] = useState<string[]>([])
    const [nordicCards, setNordicCards] = useState<string[]>([])
    
    const fontColor: any = {
        egyptian: colors.egyptianYellow,
        nordic: colors.nordicRed,
        greek: colors.greekBlue
    }

    const nordicLogo: any = require("@images/pantheon-logos/nordic.png")
    const nordicLogoNoColor: any = require("@images/pantheon-logos/nordic-nocolor.png")
    const greekLogo: any = require("@images/pantheon-logos/greek.png")
    const greekLogoNoColor: any = require("@images/pantheon-logos/greek-nocolor.png")
    const egyptianLogo: any = require("@images/pantheon-logos/egyptian.png")
    const egyptianLogoNoColor: any = require("@images/pantheon-logos/egyptian-nocolor.png")

    return (
        <View>
            <HeaderTextured>
               <Text style={{color: 'white', textAlign: 'center'}}> COLLECTION </Text>
            </HeaderTextured>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity onPress={() => {setCurrentPantheon('nordic')}}>
                    <Image source={currentPantheon === 'nordic' ? nordicLogo : nordicLogoNoColor}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setCurrentPantheon('greek')}}>
                <Image source={currentPantheon === 'greek' ? greekLogo : greekLogoNoColor}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setCurrentPantheon('egyptian')}}>
                <Image source={currentPantheon === 'egyptian' ? egyptianLogo : egyptianLogoNoColor}/>
                </TouchableOpacity>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Disciples  fontColor={fontColor[currentPantheon]}/>
                <TouchableOpacity style={{borderStyle: "solid", borderColor: fontColor[currentPantheon], borderWidth: 2, borderRadius: 4, padding: 5, margin: 10}}>
                    <Text style={{color: fontColor[currentPantheon]}}> Prier </Text>
                </TouchableOpacity>

            </View>
            <View>

            </View>
        </View>
    )
}

export default MyCollection