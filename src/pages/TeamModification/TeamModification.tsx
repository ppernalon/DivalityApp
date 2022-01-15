import ContentTextured from '@components/ContentTextured/ContentTextured'
import React, {useState} from 'react'
import {Image, TouchableOpacity, View} from 'react-native'
import {IconButton, Text} from 'react-native-paper'
import CardServices from '../../services/CardServices'
import {teamModificationStyles} from './TeamModificationStyles'

type TeamModificationProps = {
    navigation: any
    route: any
}
const TeamModification = ({route, navigation}: TeamModificationProps) => {
    const {teamToModify} = route.params
    const [currentDivinity, setCurrentDivinity] = useState<string>(teamToModify.compo[0])

    const displayImageDivinity = (teamToModify: {compo: string[]; name: string}) => {
        let teamConstruction: JSX.Element[] = []
        teamToModify.compo.forEach((name: string) => {
            let uri: any = CardServices.getImageByName(name)
            teamConstruction.push(
                <TouchableOpacity
                    onPress={() => {
                        setCurrentDivinity(name)
                    }}
                    key={teamConstruction.length}
                    style={teamModificationStyles.imageDivinityButton}>
                    <Image source={uri} style={teamModificationStyles.imageDivinity} />
                    {currentDivinity === name ? (
                        <IconButton
                            icon="pencil"
                            color="white"
                            style={teamModificationStyles.pencilIcon}
                            hasTVPreferredFocus={undefined}
                            tvParallaxProperties={undefined}
                        />
                    ) : (
                        <></>
                    )}
                </TouchableOpacity>
            )
        })
        const TeamModificationJSX = <View style={teamModificationStyles.secondRowTeamContainer}>{teamConstruction}</View>
        return TeamModificationJSX
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
                    {teamToModify.name}
                </Text>
            </ContentTextured>
            <View style={{height: '78%', width: '100%', alignItems: 'center', paddingTop:20}}>{displayImageDivinity(teamToModify)}</View>
            <ContentTextured position={'footer'} />
        </View>
    )
}

export default TeamModification
