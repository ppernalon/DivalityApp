import { colors } from "GlobalStyle"
import React from "react"
import { Dimensions } from "react-native"
import Svg, { Text } from "react-native-svg"
import { useSelector } from "react-redux"
import { selectUsername } from "store/reducers/UsernameSlice"
import GodTeam from "../GodTeam"

type FightingScreenProps = {
    opponent: string
    attackerPosition: number
    offensivePlayer: string
    attackPattern: number[][]
    myTeam: {god: string, maxLife: number, currentLife: number}[]
    opponentTeam: {god: string, maxLife: number, currentLife: number}[]
}

const FightingScreen = ({opponent, attackerPosition, offensivePlayer, attackPattern, myTeam, opponentTeam}: FightingScreenProps) => {
    const heightAvailable = Dimensions.get("screen").height*0.9
    const widthAvailable = Dimensions.get("screen").width*0.8
    const tileWidth = widthAvailable/5
    const tileHeight = heightAvailable/8
    const username = useSelector(selectUsername)

    return (
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
    )
}

export default FightingScreen