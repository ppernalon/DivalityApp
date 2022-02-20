import React from "react"
import { Dimensions, Text as RNText, View } from "react-native"
import { Title } from "react-native-paper"
import Svg from "react-native-svg"
import { useSelector } from "react-redux"
import { selectUsername } from "store/reducers/UsernameSlice"
import GodTeam from "../GodTeam"

type FightingScreenProps = {
    opponent: string
    myTeam: string[]
    opponentTeam: string[]
}

const FightingScreen = ({opponent, myTeam, opponentTeam}: FightingScreenProps) => {
    const heightAvailable = Dimensions.get("screen").height*0.85
    const widthAvailable = Dimensions.get("screen").width*0.8
    const tileWidth = widthAvailable/5
    const tileHeight = heightAvailable/8
    const username = useSelector(selectUsername)

    return (
        <View style={{ height: "100%", width: "100%", backgroundColor: 'white', alignItems: 'center'}}>
            <Title> {opponent} </Title>
            <Svg style={{ height: "85%", width: "80%"}}>
                <GodTeam tileWidth={tileWidth} tileHeight={tileHeight} isOpponent={true}/>
                <GodTeam tileWidth={tileWidth} tileHeight={tileHeight} isOpponent={false}/>
            </Svg>
            <Title> {username} </Title>
            <View>
                <RNText style={{color: 'black'}}> prochain dieu qui attaque </RNText>
            </View>
        </View>
    )
}

export default FightingScreen