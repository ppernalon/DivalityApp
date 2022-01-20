import React, {useEffect, useRef, useState} from 'react'
import {Animated, FlatList, Image, SafeAreaView, ScrollView, View} from 'react-native'
import {IconButton, Modal, Portal, Text} from 'react-native-paper'
import ContentTextured from 'components/ContentTextured/ContentTextured'
import Disciples from 'components/Disciples/Disciples'
import {colors} from 'GlobalStyle'
import {TouchableOpacity} from 'react-native'
import Card from 'components/Card/Card'
import {myCollectionStyles} from '../../pages/MyCollection/MyCollectionStyles'
import {pantheonDiplayerStyle} from './PantheonDiplayerStyle'
import {incrementByAmount} from '../Disciples//DisciplesSlice'
import {useSelector, useDispatch} from 'react-redux'
import wsService from '../../ws-services/WsService'


type PantheonDisplayerProps = {
    navigation?: any
    isPrayDisponible: boolean
    onClickCard: Function
}
const PantheonDisplayer = ({navigation, isPrayDisponible, onClickCard}: PantheonDisplayerProps) => {
    const [currentPantheon, setCurrentPantheon] = useState<string>('egyptian')
    const [egyptianCards, setegyptianCards] = useState<string[]>([])
    const [greekCards, setgreekCards] = useState<string[]>([])
    const [nordicCards, setnordicCards] = useState<string[]>([])
    const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false)
    const [nameCardDialog, setNameCardDialog] = useState<string>('')
    const [collectionData, setCollectionData] = useState<{[pantheon: string]: {[divinity: string]: number}}>({})
    const [isDataLoad, setIsDataLoad] = useState<boolean>(false)
    const [newCardName, setNewCardName] = useState<string>('')
    const [isNewCardShow, setIsNewCardShow] = useState<boolean>(false)

    const dispatch = useDispatch()
    let animation = useRef<any>(new Animated.Value(0)).current
    const ws = wsService.getWs()
    
    useEffect(() => {
        PantheonDisplayer.loadDataCollection(setCollectionData, setIsDataLoad, ws)
    }, [ws])

    const fontColor: any = {
        egyptian: colors.egyptianYellow,
        nordic: colors.nordicRed,
        greek: colors.greekBlue,
    }

    const nordicLogo: any = require('@images/pantheon-logos/nordic.png')
    const nordicLogoNoColor: any = require('@images/pantheon-logos/nordic-nocolor.png')
    const greekLogo: any = require('@images/pantheon-logos/greek.png')
    const greekLogoNoColor: any = require('@images/pantheon-logos/greek-nocolor.png')
    const egyptianLogo: any = require('@images/pantheon-logos/egyptian.png')
    const egyptianLogoNoColor: any = require('@images/pantheon-logos/egyptian-nocolor.png')

    const renderItem = ({item}: any) => {
        return (
            <TouchableOpacity onPress={() => onClickCard(item, currentPantheon)} style={{marginHorizontal: 15, marginBottom: 15}}>
                <Card name={item} minimal={true} />
                <View style={[pantheonDiplayerStyle.numberOccurencesContainer, {backgroundColor: fontColor[currentPantheon]}]}>
                    <Text style={{color: 'white'}}>{collectionData[currentPantheon][item]}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{height: '100%'}}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <TouchableOpacity
                    onPress={() => {
                        setCurrentPantheon('nordic')
                    }}>
                    <Image source={currentPantheon === 'nordic' ? nordicLogo : nordicLogoNoColor} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setCurrentPantheon('greek')
                    }}>
                    <Image source={currentPantheon === 'greek' ? greekLogo : greekLogoNoColor}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        setCurrentPantheon('egyptian')
                    }}>
                    <Image source={currentPantheon === 'egyptian' ? egyptianLogo : egyptianLogoNoColor} />
                </TouchableOpacity>
            </View>
            {isPrayDisponible && isNewCardShow ? (
                <Animated.View style={[pantheonDiplayerStyle.animationNewCard, {opacity: animation}]}>
                    <Card name={newCardName} minimal={true} />
                </Animated.View>
            ) : (
                <></>
            )}
            {isPrayDisponible ? (
                <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 14}}>
                    <Disciples fontColor={fontColor[currentPantheon]} />
                    <TouchableOpacity
                        style={[
                            {
                                borderColor: fontColor[currentPantheon],
                            },
                            myCollectionStyles.containerPrayDisciples,
                        ]}
                        onPress={() =>
                            PantheonDisplayer.onPressPrayButton(
                                currentPantheon,
                                ws,
                                setCollectionData,
                                collectionData,
                                setIsDataLoad,
                                setNewCardName,
                                setIsNewCardShow,
                                animation,
                                dispatch
                            )
                        }>
                        <Text style={{color: fontColor[currentPantheon], fontSize: 16}}> Prier </Text>
                        <Image source={require('@images/icon_openHand.png')} style={[myCollectionStyles.iconPray, {marginRight: 13}]} />
                        <Text style={{color: fontColor[currentPantheon]}}>{-10}</Text>
                        <Image source={require('@images/icon_disciple.png')} style={myCollectionStyles.iconPray} />
                    </TouchableOpacity>
                </View>
            ) : (
                <></>
            )}

            <SafeAreaView style={myCollectionStyles.cardCollectionContainer}>
                {isDataLoad ? (
                    <FlatList
                        data={Object.keys(collectionData[currentPantheon])}
                        renderItem={renderItem}
                        keyExtractor={(item) => item}
                        numColumns={2}
                        scrollEnabled={true}
                        persistentScrollbar={true}
                    />
                ) : (
                    <></>
                )}
            </SafeAreaView>
        </View>
    )
}
PantheonDisplayer.loadDataCollection = (setCollectionData: Function, setIsDataLoad: Function, ws: any) => {
    ws.send(
        JSON.stringify({
            type: 'collection',
            username: 'test2',
        })
    )
    ws.onmessage = (e: any) => {
        let dataCollection = JSON.parse(e.data)
        let dataCollectionWithUniqueItem: {[pantheon: string]: string[]} = {
            egyptian: [],
            greek: [],
            nordic: [],
        }
        let dataCollectionWithOccurence: {[pantheon: string]: {[divinityName: string]: number}} = {
            egyptian: {},
            greek: {},
            nordic: {},
        }
        for (const pantheon in dataCollectionWithUniqueItem) {
            dataCollection.data[pantheon].forEach((divinity: string) => {
                if (!dataCollectionWithUniqueItem[pantheon].includes(divinity)) {
                    dataCollectionWithUniqueItem[pantheon].push(divinity)
                    dataCollectionWithOccurence[pantheon][divinity] = dataCollection.data[pantheon].filter((x: string) => x === divinity).length
                }
            })
        }
        setCollectionData(dataCollectionWithOccurence)
        setIsDataLoad(true)
    }
}

PantheonDisplayer.onPressPrayButton = (
    currentPantheon: string,
    ws: any,
    setCollectionData: Function,
    collectionData: {[pantheon: string]: {[divinityName: string]: number}},
    setIsDataLoad: Function,
    setNewCardName: Function,
    setIsNewCardShow: Function,
    animation: any,
    dispatch: Function
) => {
    ws.send(
        JSON.stringify({
            type: 'pray',
            username: 'test2',
            pantheon: currentPantheon,
        })
    )
    ws.onmessage = (e: any) => {
        if (e.data === "L'utilisateur ne possède pas assez de disciples") {
            console.log('Impossible manque des disciples')
        } else {
            dispatch(incrementByAmount({number: -10, type: 'INCREMENT'}))
            let newCardName: string = JSON.parse(e.data).name
            setNewCardName(newCardName)
            PantheonDisplayer.animationNewCard(animation, setIsNewCardShow)
            if (!Object.keys(collectionData[currentPantheon]).includes(newCardName)) {
                setIsDataLoad(false)
                const newCollectionData = collectionData
                newCollectionData[currentPantheon][newCardName] = 1
                setCollectionData(newCollectionData)
                setIsDataLoad(true)
            } else {
                setIsDataLoad(false)
                const newCollectionData = collectionData
                newCollectionData[currentPantheon][newCardName] += 1
                setCollectionData(newCollectionData)
                setIsDataLoad(true)
            }
        }
    }
}

PantheonDisplayer.animationNewCard = (animation: any, setIsNewCardShow: Function) => {
    setIsNewCardShow(true)
    Animated.sequence([
        Animated.delay(700),
        Animated.timing(animation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }),
        Animated.delay(1000),
        Animated.timing(animation, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
        }),
    ]).start(() => {
        animation.setValue(0)
        setIsNewCardShow(false)
    })
}

export default PantheonDisplayer
