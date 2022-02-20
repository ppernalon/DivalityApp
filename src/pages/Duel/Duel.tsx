import TeamSelection from "components/TeamSelection/TeamSelection"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { Text } from "react-native-paper"

type DuelProps = {
    route: any
}

const Duel = ({route}: DuelProps) => {
    const opponent = route.params.opponent
    const [myTeam, setMyTeam] = useState<string[]>([])
    const [opponentTeam, setOpponentTeam] = useState<string[]>([])
    const [duelStep, setDuelStep] = useState<string>('teamSelection')

    useEffect(() => {
        console.log("connection à " + opponent)
    }, [opponent])

    useEffect(() => {
        if (myTeam.length > 0) {
            setDuelStep("fighting")
        }
    }, [myTeam])

    switch (duelStep) {
        case 'teamSelection':
            return (
                <TeamSelection setMyTeam={setMyTeam}/>
            )
        case 'godPlacement':
            return (
                <View>
                    <Text> godPlacement </Text>
                </View>
            )
        case 'fighting':
            return (
                <View>
                    <Text> fighting </Text>
                </View>
            )
    }

    return (
        <View>
            <Text style={{color: "red"}}> Error </Text>
        </View>
    )
}

export default Duel