import FightingScreen from "components/Duel/FightingScreen/FightingScreen"
import TeamSelection from "components/Duel/TeamSelection/TeamSelection"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { Text } from "react-native-paper"
import wsService from "ws-services/WsService"

type DuelProps = {
    route: any
}

const Duel = ({route}: DuelProps) => {
    const opponent = route.params.opponent
    const ws = wsService.getWs()
    const [myTeam, setMyTeam] = useState<string[]>([])
    const [opponentTeam, setOpponentTeam] = useState<string[]>([])
    const [duelStep, setDuelStep] = useState<string>('teamSelection')

    useEffect(() => {
        ws.onmessage = (wsEvent: WebSocketMessageEvent) => {
            const wsAnswer = JSON.parse(wsEvent.data)
            if (wsAnswer.type === "opponentPickedTeam") {
                setOpponentTeam(wsAnswer.opponentGods)
            }
        }
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
                <FightingScreen opponent={opponent} myTeam={myTeam} opponentTeam={opponentTeam}/>
            )
    }

    return (
        <View>
            <Text style={{color: "red"}}> Error </Text>
        </View>
    )
}

export default Duel