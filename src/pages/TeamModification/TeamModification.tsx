import ContentTextured from '@components/ContentTextured/ContentTextured'
import React, {useEffect, useState} from 'react'
import {Image, TouchableOpacity, View, TextInput} from 'react-native'
import {IconButton, Text, useTheme} from 'react-native-paper'
import CardServices from '../../services/CardServices'
import PantheonDisplayer from 'components/PantheonDisplayer/PantheonDisplayer'
import {teamModificationStyles} from './TeamModificationStyles'
import {colors} from '../../GlobalStyle'
import {transform} from '@babel/core'
import wsService from '../../ws-services/WsService'
type TeamModificationProps = {
    navigation: any
    route: any
}
const TeamModification = ({route, navigation}: TeamModificationProps) => {
    const ws = wsService.getWs()
    const {teamToModify} = route.params
    const [currentDivinity, setCurrentDivinity] = useState<string>(teamToModify.compo[0])
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [listOfDivinityTeam, setListOfDivinityTeam] = useState<string[]>(teamToModify.compo)
    const [nameOfTeam, setNameOfTeam] = useState<string>(teamToModify.name === "" ? "Nouvelle Équipe":teamToModify.name)
    const [oldNameOfTeam, setOldNameOfTeam] = useState<string>(teamToModify.name)
    const [dataCollectionWithOccurence, setDataCollectionWithOccurence] = useState<{[pantheon: string]: {[divinity: string]: number}}>({})
    const [initialDataCollectionWithOccurence, setInitialDataCollectionWithOccurence] = useState<{[pantheon: string]: {[divinity: string]: number}}>({})
    const [isDataLoad, setIsDataLoad] = useState<boolean>(false)

    const {fonts} = useTheme()
    const fontStyle = {
        color: 'white',
        fontFamily: fonts.medium.fontFamily,
        fontWeight: fonts.medium.fontWeight,
        fontSize: 20,
    }
    useEffect(() => {
        loadDataCollection()
    }, [ws])

    const loadDataCollection = () => {
        ws.send(
            JSON.stringify({
                type: 'collection',
                username: 'test2',
            })
        )
        ws.onmessage = (e: any) => {
            let dataCollection = JSON.parse(e.data)

            let dataCollectionWithUniqueItemTemp: {[pantheon: string]: string[]} = {
                egyptian: [],
                greek: [],
                nordic: [],
            }
            let dataCollectionWithOccurenceTemp: {[pantheon: string]: {[divinityName: string]: number}} = {
                egyptian: {},
                greek: {},
                nordic: {},
            }
            let initialDataCollectionWithOccurenceTemp: {[pantheon: string]: {[divinityName: string]: number}} = {
                egyptian: {},
                greek: {},
                nordic: {},
            }
            for (const pantheon in dataCollectionWithUniqueItemTemp) {
                dataCollection.data[pantheon].forEach((divinity: string) => {
                    if (!dataCollectionWithUniqueItemTemp[pantheon].includes(divinity)) {
                        dataCollectionWithUniqueItemTemp[pantheon].push(divinity)
                        const numberOccurence = dataCollection.data[pantheon].filter((x: string) => x === divinity).length
                        initialDataCollectionWithOccurenceTemp[pantheon][divinity] = numberOccurence
                        dataCollectionWithOccurenceTemp[pantheon][divinity] = numberOccurence
                    }
                })
            }
            setInitialDataCollectionWithOccurence(initialDataCollectionWithOccurenceTemp)
            changeOccurence(dataCollectionWithOccurenceTemp, listOfDivinityTeam)
            setIsDataLoad(true)
        }
    }

    const changeOccurence = (initialDataCollectionWithOccurence: {[pantheon: string]: {[divinity: string]: number}}, listOfDivinityTeam:string[] ) => {
        let dataWithOccurrenceTemp = JSON.parse(JSON.stringify(initialDataCollectionWithOccurence))
        for (const pantheon in initialDataCollectionWithOccurence) {
            for (const divinity in initialDataCollectionWithOccurence[pantheon]) {
                const occurenceInTeam = listOfDivinityTeam.filter((x: string) => x === divinity).length
                if (occurenceInTeam !== undefined) {
                    dataWithOccurrenceTemp[pantheon][divinity] -= occurenceInTeam
                }
            }
        }
        setDataCollectionWithOccurence(dataWithOccurrenceTemp)
    }

    const validationTeam = () => {
        let dataValidationTeamBack = {
            type: 'modificationTeam',
            username: 'test2',
            oldNameTeam: oldNameOfTeam,
            newNameTeam: nameOfTeam,
            compo: listOfDivinityTeam,
        }
        ws.send(JSON.stringify(dataValidationTeamBack))
        ws.onmessage = (e: any) => {
            navigation.navigate('Teams')
        }
    }

    const displayImageDivinity = (listOfDivinityTeam: string[]) => {
        let teamConstruction: JSX.Element[] = []
        listOfDivinityTeam.forEach((name: string, index: number) => {
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
                <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                    <TextInput
                        onChangeText={setNameOfTeam}
                        selectionColor={colors.primaryBlue}
                        value={nameOfTeam}
                        style={[
                            {
                                backgroundColor: 'transparent',
                                textAlign: 'center',
                                borderWidth: 0,
                                borderColor: 'transparent',
                            },
                            fontStyle,
                        ]}
                    />
                    <IconButton
                        icon={'check-decagram'}
                        color="white"
                        onPress={() => {
                            validationTeam()
                        }}
                        hasTVPreferredFocus={undefined}
                        tvParallaxProperties={undefined}
                    />
                </View>
            </ContentTextured>
            <View style={{height: '78%', width: '100%', alignItems: 'center', paddingTop: 20}}>
                <View style={{width: '100%', alignItems: 'center'}}>{displayImageDivinity(listOfDivinityTeam)}</View>
                <View style={{height: '72%'}}>
                    <PantheonDisplayer
                        isDataLoad={isDataLoad}
                        dataCollection={dataCollectionWithOccurence}
                        isPrayDisponible={false}
                        onClickCard={(name: string, currentPantheon: string) => {
                            if (dataCollectionWithOccurence[currentPantheon][name] > 0){
                                 const temporalListTeam = JSON.parse(JSON.stringify(listOfDivinityTeam))
                            temporalListTeam.splice(currentIndex, 1, name)
                            setListOfDivinityTeam(temporalListTeam)
                            setCurrentDivinity(name)
                            changeOccurence(initialDataCollectionWithOccurence, temporalListTeam)
                            }
                           
                        }}
                    />
                </View>
            </View>
            <ContentTextured position={'footer'} />
        </View>
    )
}

export default TeamModification
