import ContentTextured from "components/ContentTextured/ContentTextured"
import { colors } from "GlobalStyle"
import React from "react"
import { Dimensions, ImageBackground, Text as RNText, View } from "react-native"
import Svg, { Text } from "react-native-svg"
import { useSelector } from "react-redux"
import { selectUsername } from "store/reducers/UsernameSlice"
import GodTeam from "../GodTeam"

type FightingScreenProps = {
    opponent: string
    myTeam: {god: string, maxLife: number, currentLife: number}[]
    opponentTeam: {god: string, maxLife: number, currentLife: number}[]
}

const FightingScreen = ({opponent, myTeam, opponentTeam}: FightingScreenProps) => {
    const heightAvailable = Dimensions.get("screen").height*0.90
    const widthAvailable = Dimensions.get("screen").width*0.8
    const tileWidth = widthAvailable/5
    const tileHeight = heightAvailable/8
    const username = useSelector(selectUsername)

    return (
        <View style={{ height: "100%", width: "100%", backgroundColor: 'white', alignItems: 'center'}}>
            <Svg style={{ height: "90%", width: "80%"}}>
                <Text 
                    x={3.5*tileWidth} 
                    y={0.75*tileHeight} 
                    fill={colors.primaryBlue} 
                    fontSize={20} 
                    textAnchor={"start"}
                    fontFamily={"Merienda-Bold"}
                >
                    {opponent}
                </Text>
                <GodTeam tileWidth={tileWidth} tileHeight={tileHeight} godTeam={opponentTeam} isOpponent={true}/>
                <GodTeam tileWidth={tileWidth} tileHeight={tileHeight} godTeam={myTeam} isOpponent={false}/>
                <Text 
                    x={1.5*tileWidth} 
                    y={6.75*tileHeight}
                    fill={colors.primaryBlue} 
                    fontSize={20} 
                    textAnchor={"end"}
                    fontFamily={"Merienda-Bold"}
                >
                    {username}
                </Text>
            </Svg>
            <View style={{height:"10%", width: "100%"}}>
                <ImageBackground source={require('@images/texturebouton.png')} style={{height:"100%", width:"100%"}}>
                    <RNText style={{color: 'white', fontSize: 20, textAlign: 'center'}}> prochain dieu qui attaque </RNText>
                </ImageBackground>
            </View>
        </View>
    )
}

export default FightingScreen