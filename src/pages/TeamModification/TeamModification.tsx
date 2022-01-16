import ContentTextured from '@components/ContentTextured/ContentTextured'
import React, {useState} from 'react'
import {Image, TouchableOpacity, View} from 'react-native'
import {IconButton, Text} from 'react-native-paper'
import CardServices from '../../services/CardServices'
import PantheonDisplayer from 'components/PantheonDisplayer/PantheonDisplayer'
import {teamModificationStyles} from './TeamModificationStyles'

type TeamModificationProps = {
    navigation: any
    route: any
}
const TeamModification = ({route, navigation}: TeamModificationProps) => {
    const {teamToModify} = route.params
    const [currentDivinity, setCurrentDivinity] = useState<string>(teamToModify.compo[0])
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [listOfDivinity, setListOfDivinity] = useState<string[]>(teamToModify.compo)

    const displayImageDivinity = (listOfDivinity: string[]) => {
        let teamConstruction: JSX.Element[] = []
        listOfDivinity.forEach((name: string, index: number) => {
            let uri: any = CardServices.getImageByName(name)
            teamConstruction.push(
                <TouchableOpacity
                    onPress={() => {
                        setCurrentDivinity(name)
                        setCurrentIndex(index)
                    }}
                    key={teamConstruction.length}
                    style={teamModificationStyles.imageDivinityButton}>
                    <Image source={uri} style={teamModificationStyles.imageDivinity} />
                    {currentIndex === index ? (
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
            <View style={{height: '78%', width: '100%', alignItems: 'center', paddingTop: 20}}>
                {displayImageDivinity(listOfDivinity)}
                <View style={{height: '70%'}}>
                    <PantheonDisplayer
                        isPrayDisponible={false}
                        onClickCard={(name: string, currentPantheon: string) => {
                            const temporalList = listOfDivinity
                            temporalList.splice(currentIndex, 1, name)
                            setListOfDivinity(temporalList)
                            setCurrentDivinity(name)
                        }}
                    />
                </View>
            </View>
            <ContentTextured position={'footer'} />
        </View>
    )
}

export default TeamModification
