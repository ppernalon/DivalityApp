import FightingScreen from "components/Duel/FightingScreen/FightingScreen"
import TeamSelection from "components/Duel/TeamSelection/TeamSelection"
import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { Text } from "react-native-paper"
import { useSelector } from "react-redux"
import { selectUsername } from "store/reducers/UsernameSlice"
import wsService from "ws-services/WsService"

type DuelProps = {
    route: any
}

const Duel = ({route}: DuelProps) => {
    const opponent = route.params.opponent
    const username = useSelector(selectUsername)
    const ws = wsService.getWs()
    const [myTeam, setMyTeam] = useState<{god: string, maxLife: number, currentLife: number}[]>([])
    const [opponentTeam, setOpponentTeam] = useState<{god: string, maxLife: number, currentLife: number}[]>([])
    const [duelStep, setDuelStep] = useState<string>('teamSelection')
    const [attacks, setAttacks] = useState<any>([])

    const timeBetweenAttack = 4000 // 4s
    const [lastTimeAnimated, setLastTimeAnimated] = useState(0)

    useEffect(() => {
        ws.addEventListener("message", (wsEvent: WebSocketMessageEvent) => {
            const wsAnswer = JSON.parse(wsEvent.data)
            // console.log(wsAnswer)
            // if (wsAnswer.type === "opponentPickedTeam") {
            //     setOpponentTeam(wsAnswer.opponentGods)
            // }
            if (wsAnswer.type === "startDuel") {
                setMyTeam(wsAnswer[username])
                setOpponentTeam(wsAnswer[opponent])
                setTimeout(() => setDuelStep("fighting"), 1)
            }
            if (wsAnswer.type === "updatingDuelState") {
                setAttacks([...attacks, {offensivePlayer: wsAnswer.offensivePlayer, pattern: wsAnswer.attackPattern, updatedGods: wsAnswer.updatedAttackedGods}])
                setLastTimeAnimated(Date.now())
            }
        })
    }, [ws])

    useEffect(() => {
        if (opponentTeam.length > 0 && myTeam.length > 0 && attacks.length > 0){
            // wait to update attack
            setTimeout(() => {
                const attack = attacks[0]

                // attack removed from the list
                const newAttacks = [...attacks]
                newAttacks.splice(0, 1)
                setAttacks(newAttacks)

                if (attack.offensivePlayer === opponent) {
                    setMyTeam(attack.updatedGods)
                } else {
                    setOpponentTeam(attack.updatedGods)
                }
                setLastTimeAnimated(Date.now())

            }, timeBetweenAttack)
        }
    }, [lastTimeAnimated])

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