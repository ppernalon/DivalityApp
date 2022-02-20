import React, { useEffect, useState } from "react"
import ContentTextured from '@components/ContentTextured/ContentTextured'
import {ActivityIndicator, Image, TouchableOpacity, View} from "react-native"
import {Text} from 'react-native-paper'
import CardServices from 'services/CardServices'
import wsService from "ws-services/WsService"
import { useSelector } from "react-redux"
import { selectUsername } from '../../store/reducers/UsernameSlice'
import { colors } from "GlobalStyle"
import {teamSelectionStyles} from "./TeamSelectionStyles"

type TeamSelectionProps = {
    setMyTeam : Function
}

const TeamSelection = ({ setMyTeam } : TeamSelectionProps) => {
    const username = useSelector(selectUsername)
    const ws = wsService.getWs()
    const [myTeamsData, setMyTeamsData] = useState<{compo: string[]; name: string}[]>([])
    const [isDataLoad, setIsDataLoad] = useState<boolean>(false)
    
    const loadData = () => {
        ws.send(
            JSON.stringify({
                type: 'teams',
                username: username,
            })
        )
        ws.onmessage = (wsEvent: WebSocketMessageEvent) => {
            const wsAnswer = JSON.parse(wsEvent.data)
            if (wsAnswer.type === "teams") {
                setMyTeamsData(wsAnswer.teamsdata)
                setIsDataLoad(true)
            }
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    const pickTeamForDuel = (teamIndex: number) => {
        ws.send(
            JSON.stringify({
                type: "pickTeamForDuel",
                username: username,
                teamIndex: teamIndex
            })
        )
        setMyTeam(myTeamsData[teamIndex].compo)
    }

    const renderTeam = () => {
        let teamConstruction: JSX.Element[] = []

        myTeamsData.forEach((team: any, teamIndex: number) => {let oneTeamConstruction: JSX.Element[] = []
            let firstLine: JSX.Element[] = []
            let secondLine: JSX.Element[] = []
            team.compo.forEach((name: string, index: number) => {
                let uri: any = CardServices.getImageByName(name)
                if (index < 3) {
                    firstLine.push(
                        <Image 
                            key={`${teamConstruction.length}_1_${index}`} 
                            source={uri} 
                            style={teamSelectionStyles.imageDivinity} 
                        />
                    )
                } else {
                    secondLine.push(
                        <Image 
                            key={`${teamConstruction.length}_2_${index}`}
                            source={uri} 
                            style={teamSelectionStyles.imageDivinity} 
                        />
                    )
                }
            })
            oneTeamConstruction.push(
                <View
                    key={`${teamConstruction.length}_1_row`} 
                    style={{flexDirection: 'row', justifyContent: 'space-between', width: "100%"}}>
                    { firstLine }
                </View>
            )
            oneTeamConstruction.push(
                <View
                    key={`${teamConstruction.length}_2_row`}  
                    style={{flexDirection: 'row', justifyContent: 'space-between', width: "100%"}}>
                    { secondLine }
                </View>
            )
            
            teamConstruction.push(
                <TouchableOpacity
                    onPress={() => {
                        pickTeamForDuel(teamIndex)
                    }}
                    key={teamConstruction.length}
                    style={teamSelectionStyles.buttonTeamContainer}>
                    <Text style={teamSelectionStyles.teamNameText}>{team.name}</Text>
                    <View>
                        {oneTeamConstruction}
                    </View>
                </TouchableOpacity>
            )

        })
        return teamConstruction
    }

    return (
        <View style={{height: '100%', width: '100%', marginBottom: 50}}>
            <ContentTextured position={'header'}>
                <Text
                    style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 20,
                    }}>
                    CHOIX DE L'EQUIPE
                </Text>
            </ContentTextured>
            <View style={{height: '78%', width: '100%', alignItems: 'center', justifyContent:'center'}}>
                {!isDataLoad ? <ActivityIndicator animating={!false} color={colors.blueSky} size={'large'} /> : <></>}
                {isDataLoad ? renderTeam() : <></>}
            </View>
        </View>
    )
}

export default TeamSelection