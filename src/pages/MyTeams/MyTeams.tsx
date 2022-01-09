import ContentTextured from '@components/ContentTextured/ContentTextured'
import React, {useState} from 'react'
import {Image, View} from 'react-native'
import {Text} from 'react-native-paper'
import CardServices from 'services/CardServices'
import {myTeamsStyles} from './MyTeamsStyles'

type MyTeams = {
    navigation: any
}

const MockTeam = {
    team1: ['anubis', 'horus', 'horus', 'horus', 'horus', 'anubis'],
    team2: ['bastet', 'anubis', 'anubis', 'osiris', 'anubis', 'osiris'],
    team3: [] as string[],
} as {[key: string]: string[]}

const MyTeams = ({navigation}: MyTeams) => {
    const renderTeam = () => {
        let teamConstruction = []
        for (const team in MockTeam) {
            let oneTeamConstruction: JSX.Element[] = []
            MockTeam[team].forEach((name: string) => {
                let uri: any = CardServices.getImageByName(name)
                oneTeamConstruction.push(<Image key={teamConstruction.length + oneTeamConstruction.length} source={uri} style={{height: 60, width: 60}} />)
                console.log(uri)
            })
            teamConstruction.push(
                <View key={teamConstruction.length} style={{display: 'flex', flexDirection: 'row'}}>
                    {oneTeamConstruction}
                </View>
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
            <View style={{height: '78%'}}>{renderTeam()}</View>
            <ContentTextured position={'footer'} />
        </View>
    )
}

export default MyTeams
