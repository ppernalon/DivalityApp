import ContentTextured from '@components/ContentTextured/ContentTextured'
import React, {useState} from 'react'
import {Image, TouchableOpacity, View, TextInput} from 'react-native'
import {IconButton, Text, useTheme} from 'react-native-paper'
import CardServices from '../../services/CardServices'
import PantheonDisplayer from 'components/PantheonDisplayer/PantheonDisplayer'
import {teamModificationStyles} from './TeamModificationStyles'
import {colors} from '../../GlobalStyle'
import {transform} from '@babel/core'
type TeamModificationProps = {
    navigation: any
    route: any
}
const TeamModification = ({route, navigation}: TeamModificationProps) => {
    const {teamToModify} = route.params
    const [currentDivinity, setCurrentDivinity] = useState<string>(teamToModify.compo[0])
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [listOfDivinity, setListOfDivinity] = useState<string[]>(teamToModify.compo)
    const [nameOfTeam, setNameOfTeam] = useState<string>(teamToModify.name)
    const {fonts} = useTheme()
    const fontStyle = {
        color: 'white',
        fontFamily: fonts.medium.fontFamily,
        fontWeight: fonts.medium.fontWeight,
        fontSize: 20,
    }

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
                    {name === 'empty' ? (
                        <View style={teamModificationStyles.emptyDivinity}>
                            <IconButton
                                icon="pencil"
                                color="white"
                                style={teamModificationStyles.pencilIconWithoutBorder}
                                hasTVPreferredFocus={undefined}
                                tvParallaxProperties={undefined}
                            />
                        </View>
                    ) : (
                        <Image source={uri} style={teamModificationStyles.imageDivinity} />
                    )}
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
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <TextInput
                        onChangeText={setNameOfTeam}
                        selectionColor={colors.primaryBlue}
                        value={nameOfTeam}
                        style={[
                            {
                                width: '80%',
                                backgroundColor: 'transparent',
                                textAlign: 'center',
                                borderWidth: 0,
                                borderColor: 'transparent',
                            },
                            fontStyle,
                        ]}></TextInput>
                </View>
            </ContentTextured>
            <View style={{height: '78%', width: '100%', alignItems: 'center', paddingTop: 20}}>
                <View  style={{width: '70%',  alignItems: 'center'}}>{displayImageDivinity(listOfDivinity)}</View>
                <View style={{height: '60%'}}>
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
