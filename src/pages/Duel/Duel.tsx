import {useNavigation} from '@react-navigation/native'
import FightingScreen from 'components/Duel/FightingScreen/FightingScreen'
import TeamSelection from 'components/Duel/TeamSelection/TeamSelection'
import TimeLine from 'components/Duel/TimeLine'
import React, {useEffect, useState} from 'react'
import {ImageBackground, View} from 'react-native'
import {Text} from 'react-native-paper'
import {useSelector} from 'react-redux'
import {selectUsername} from 'store/reducers/UsernameSlice'
import wsService from 'ws-services/WsService'

type DuelProps = {
    route: any
}

const Duel = ({route}: DuelProps) => {
    const opponent = route.params.opponent
    const username = useSelector(selectUsername)
    const ws = wsService.getWs()
    const navigation = useNavigation()
    const [myTeam, setMyTeam] = useState<{god: string; maxLife: number; currentLife: number}[]>([])
    const [opponentTeam, setOpponentTeam] = useState<{god: string; maxLife: number; currentLife: number}[]>([])
    const [duelStep, setDuelStep] = useState<string>('teamSelection')
    const [attacks, setAttacks] = useState<any>([])
    const [currentAttack, setCurrentAttack] = useState<{
        offensivePlayer: string
        attackerPosition: number
        pattern: number[][]
    }>({
        offensivePlayer: 'NONE',
        attackerPosition: -1,
        pattern: [],
    })

    const timeBetweenAttack = 3000 // 3s
    const [waitingForAttacks, setwaitingForAttacks] = useState(true)

    const isPlayerAlive = (godTeam: {god: string; maxLife: number; currentLife: number}[]) => {
        godTeam.forEach((god) => {
            if (god.currentLife > 0) return true
        })
        return false
    }

    const isGameOn = () => {
        return isPlayerAlive(myTeam) && isPlayerAlive(opponentTeam)
    }

    useEffect(() => {
        navigation.addListener('beforeRemove', (e: any) => {
            e.preventDefault()
        })
    }, [navigation])
    
    useEffect(() => {
        ws.addEventListener('message', (wsEvent: WebSocketMessageEvent) => {
            const wsAnswer = JSON.parse(wsEvent.data)
            if (wsAnswer.type === 'startDuel') {
                setMyTeam(wsAnswer[username])
                setOpponentTeam(wsAnswer[opponent])
                setTimeout(() => {
                    setDuelStep('fighting')
                }, 1)
            }
            if (wsAnswer.type === 'updatingDuelState') {
                setAttacks((oldAttacks: any[]) => {
                    return [
                        ...oldAttacks,
                        {
                            offensivePlayer: wsAnswer.offensivePlayer,
                            attackerPosition: wsAnswer.attackerPosition,
                            turn: wsAnswer.turn,
                            pattern: wsAnswer.attackPattern,
                            updatedGods: wsAnswer.updatedAttackedGods,
                        },
                    ]
                })
                if (!isPlayerAlive(wsAnswer.updatedAttackedGods)) {
                    setwaitingForAttacks(false)
                }
            }
        })
    }, [ws])

    useEffect(() => {
        if (duelStep === 'fighting' && !waitingForAttacks) {
            const attacksSorted = attacks
            attacksSorted.sort((a1: any, a2: any) => a1.turn - a2.turn)
            const updateTeam = (index: number) => {
                const attack = attacksSorted[index]
                if (attack.offensivePlayer === opponent) {
                    setMyTeam(attack.updatedGods)
                } else {
                    setOpponentTeam(attack.updatedGods)
                }
                setCurrentAttack({
                    offensivePlayer: attack.offensivePlayer,
                    attackerPosition: attack.attackerPosition,
                    pattern: attack.pattern,
                })
                setTimeout(() => {
                    if (isGameOn() || index + 1 < attacks.length) {
                        updateTeam(index + 1)
                    }
                }, timeBetweenAttack)
            }
            updateTeam(0)
        }
    }, [duelStep, waitingForAttacks])

    switch (duelStep) {
        case 'teamSelection':
            return <TeamSelection setMyTeam={setMyTeam} />
        case 'godPlacement':
            return (
                <View>
                    <Text> godPlacement </Text>
                </View>
            )
        case 'fighting':
            return (
                <View style={{height: '100%', width: '100%', backgroundColor: 'white', alignItems: 'center'}}>
                    <FightingScreen
                        opponent={opponent}
                        attackerPosition={currentAttack.attackerPosition}
                        offensivePlayer={currentAttack.offensivePlayer}
                        attackPattern={currentAttack.pattern}
                        myTeam={myTeam}
                        opponentTeam={opponentTeam}
                    />
                    <View style={{height: '10%', width: '100%'}}>
                        <ImageBackground source={require('@images/texturebouton.png')} style={{height: '100%', width: '100%'}}>
                            {/* <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}> prochain dieu qui attaque </Text> */}
                            <TimeLine attacks={attacks} />
                        </ImageBackground>
                    </View>
                </View>
            )
    }

    return (
        <View>
            <Text style={{color: 'red'}}> Error </Text>
        </View>
    )
}

export default Duel
