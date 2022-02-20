import React from "react"
import { Dimensions, Text as RNText, View } from "react-native"
import Svg from "react-native-svg"
import MyGodTeam from "../MyGodTeam"

type FightingScreenProps = {
    myTeam: string[]
    opponentTeam: string[]
}

const FightingScreen = ({myTeam, opponentTeam}: FightingScreenProps) => {
    const tileSize: number = Math.min(Dimensions.get("screen").height*0.9/6, Dimensions.get("screen").width*0.8/5)

    return (
        <View style={{ height: "100%", width: "100%", backgroundColor: 'white', justifyContent: 'center', alignItems: 'center'}}>
            <Svg style={{ height: "90%", width: "80%"}}>
                <MyGodTeam tilesSize={tileSize}/>

            </Svg>
            <View>
                <RNText style={{color: 'black'}}> prochain dieu qui attaque </RNText>
            </View>
        </View>
    )
}

export default FightingScreen