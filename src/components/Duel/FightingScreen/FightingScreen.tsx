import { colors } from "GlobalStyle"
import React, { useEffect, useState } from "react"
import { Dimensions } from "react-native"
import Svg, { Image, Text } from "react-native-svg"
import { useSelector } from "react-redux"
import { selectUsername } from "store/reducers/UsernameSlice"
import GodTeam from "../GodTeam"
import Spark from "../Spark"

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
    const widthAvailable = Dimensions.get("screen").width*0.9
    const tileWidth = widthAvailable/5
    const tileHeight = heightAvailable/8    
    const rayon = Math.min(tileHeight, tileWidth)/2.5
    const username = useSelector(selectUsername)

    const [attackerPositionComputed, setAttackerPositionComputed] = useState({x: 0, y: 0})
    const [positions, setPositions] = useState([attackerPositionComputed])

    useEffect(() => {
        const newAttackerPosition = FightingScreen.getPosition(
            attackerPosition, 
            username === offensivePlayer, 
            {width: tileWidth, height: tileHeight}
        )
        setAttackerPositionComputed(newAttackerPosition)

        let newPositions = [newAttackerPosition]
        attackPattern.map(p => {
            const patternToIndex = FightingScreen.fromPatternToIndex(p)
            const indexToPos = FightingScreen.getPosition(
                patternToIndex, 
                username !== offensivePlayer, 
                {width: tileWidth, height: tileHeight}
            )
            newPositions.push(indexToPos)
        })
        setPositions(newPositions)
    }, [attackerPosition, attackPattern])

    return (
        <Svg style={{ height: "90%", width: "90%"}}>
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
            <GodTeam tileWidth={tileWidth} tileHeight={tileHeight} rayon={rayon} godTeam={opponentTeam} isOpponent={true}/>
            <GodTeam tileWidth={tileWidth} tileHeight={tileHeight} rayon={rayon} godTeam={myTeam} isOpponent={false}/>
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
            {
                attackerPositionComputed.x > 0 && attackerPositionComputed.y > 0 ? (
                        <Image
                            x={attackerPositionComputed.x - 0.25*rayon} 
                            y={attackerPositionComputed.y - 0.25*rayon}  
                            width={2.5*rayon} 
                            height={2.5*rayon} 
                            href={require('@images/lightningCircle.png')} 
                        /> 
                    ) : null
            }
            <Spark positions={positions} rayon={rayon}/>
        </Svg>
    )
}

FightingScreen.getPosition = (index: number, amIAttacking: boolean, tileSize: {width: number, height: number}) => {
    const tileWidth = tileSize.width
    const tileHeight = tileSize.height
    let pos = {x: 0, y: 0}
    if (index == 0){
        pos.x = 2*tileWidth
        pos.y = amIAttacking ?  6*tileHeight - tileHeight/5 : tileHeight/5
    }
    else if (index == 1){
        pos.x = amIAttacking ? tileWidth + 5 : 3*tileWidth - 5
        pos.y = amIAttacking ?  5*tileHeight - tileHeight/5 : tileHeight + tileHeight/5
    }
    else if (index == 2){
        pos.x = amIAttacking ? 3*tileWidth - 5 : tileWidth + 5
        pos.y = amIAttacking ?  5*tileHeight - tileHeight/5 : tileHeight + tileHeight/5
    }
    else if (index == 3){
        pos.x = amIAttacking ? 10 : 4*tileWidth - 10
        pos.y = amIAttacking ?  4*tileHeight - tileHeight/5 : 2*tileHeight + tileHeight/5
    }
    else if (index == 4){
        pos.x = 2*tileWidth
        pos.y = amIAttacking ?  4*tileHeight - tileHeight/5 : 2*tileHeight + tileHeight/5
    }
    else {
        pos.x = amIAttacking ? 4*tileWidth - 10 : 10
        pos.y = amIAttacking ?  4*tileHeight - tileHeight/5 : 2*tileHeight + tileHeight/5
    }
        
    return pos
}

FightingScreen.fromPatternToIndex = (pattern: number[]) => {
    let index
    if (pattern[0] == 0) index = 0
    else if (pattern[0] == 1 && pattern[1] == 0) index = 1
    else if (pattern[0] == 1 && pattern[1] == 1) index = 2
    else if (pattern[0] == 2 && pattern[1] == 0) index = 3
    else if (pattern[0] == 2 && pattern[1] == 1) index = 4
    else index = 5
    return index
}

export default FightingScreen