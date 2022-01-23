import ContentTextured from '@components/ContentTextured/ContentTextured'
import React, {useEffect, useState} from 'react'
import {TouchableOpacity, View, Button, Image} from 'react-native'
import {Text} from 'react-native-paper'
import {useSelector} from 'react-redux'
import CardServices from 'services/CardServices'
import {myTeamsStyles} from './MyTeamsStyles'
import wsService from '../../ws-services/WsService'
import { useIsFocused } from '@react-navigation/native'

type MyTeams = {
    navigation: any
}

const MyTeams = ({navigation}: MyTeams) => {
    const ws = wsService.getWs()
    const [myTeamsData, setMyTeamsData] = useState<{compo: string[]; name: string}[]>([])
    const [isDataLoad, setIsDataLoad] = useState<boolean>(false)
    const nberOfTeams = 3
    const isFocused = useIsFocused()

    useEffect(() => {
        if(isFocused){
            MyTeams.loadDataTeams(setMyTeamsData, setIsDataLoad, ws)
        }
    }, [ws, isFocused]) //isFocused is used to reload data when come back to this screen after a team modification

    const renderTeam = () => {
        let teamConstruction = []
        for (const team in myTeamsData) {
            let oneTeamConstruction: JSX.Element[] = []
            myTeamsData[team].compo.forEach((name: string) => {
                let uri: any = CardServices.getImageByName(name)
                oneTeamConstruction.push(<Image key={teamConstruction.length + oneTeamConstruction.length} source={uri} style={myTeamsStyles.imageDivinity} />)
            })
            teamConstruction.push(
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('TeamModification', {teamToModify: myTeamsData[team]})
                    }}
                    key={teamConstruction.length}
                    style={myTeamsStyles.buttonTeamContainer}>
                    <View style={myTeamsStyles.firstRowTeamContainer}>
                        <Image source={require('@images/icon_editButton.png')} style={myTeamsStyles.editButtonImage} />

                        <Text style={myTeamsStyles.teamNameText}> {myTeamsData[team].name} </Text>
                    </View>
                    <View style={myTeamsStyles.secondRowTeamContainer}>{oneTeamConstruction}</View>
                </TouchableOpacity>
            )
        }
        for (let i = 0; i < nberOfTeams - myTeamsData.length; i++) {
            let oneTeamConstruction: JSX.Element[] = []
            for (let i = 1; i < 7; i++) {
                oneTeamConstruction.push(<View style={myTeamsStyles.emptyDivinity} key={teamConstruction.length + oneTeamConstruction.length} />)
            }
            teamConstruction.push(
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('TeamModification', {teamToModify: {
                            compo: ["empty", "empty", "empty", "empty", "empty", "empty"],
                            name: ""
                        }})
                    }}
                    key={teamConstruction.length}
                    style={myTeamsStyles.buttonTeamContainer}>
                    <View style={myTeamsStyles.firstRowTeamContainer}>
                        <Image source={require('@images/icon_addButton.png')} style={myTeamsStyles.editButtonImage} />

                        <Text style={myTeamsStyles.teamNameText}> Ajouter une équipe </Text>
                    </View>
                    <View style={myTeamsStyles.secondRowTeamContainer}>{oneTeamConstruction}</View>
                </TouchableOpacity>
            )
        }
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
                    MES ÉQUIPES
                </Text>
            </ContentTextured>
            <View style={{height: '78%', width: '100%', alignItems: 'center'}}>{isDataLoad ? renderTeam() : <></>}</View>
            <ContentTextured position={'footer'} />
        </View>
    )
}

MyTeams.loadDataTeams = (setMyTeamsData: Function, setIsDataLoad: Function, ws: any) => {
    ws.send(
        JSON.stringify({
            type: 'teams',
            username: 'test2',
        })
    )
    ws.onmessage = (e: any) => {
        let dataTeams = JSON.parse(e.data)
        setMyTeamsData(dataTeams.teamsdata)
        setIsDataLoad(true)
    }
}

export default MyTeams
