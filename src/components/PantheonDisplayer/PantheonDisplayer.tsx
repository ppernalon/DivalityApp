import React, {useRef, useState} from 'react'
import {Animated, FlatList, Image, SafeAreaView, View} from 'react-native'
import {ActivityIndicator, Text} from 'react-native-paper'
import Disciples from 'components/Disciples/Disciples'
import {colors} from 'GlobalStyle'
import {TouchableOpacity} from 'react-native'
import Card from 'components/Card/Card'
import {myCollectionStyles} from '../../pages/MyCollection/MyCollectionStyles'
import {pantheonDiplayerStyle} from './PantheonDiplayerStyle'
import {incrementByAmount} from '../../store/reducers/DisciplesSlice'
import {useDispatch} from 'react-redux'
import wsService from '../../ws-services/WsService'

type PantheonDisplayerProps = {
    navigation?: any
    isPrayDisponible: boolean
    onClickCard: Function
    dataCollection: {[pantheon: string]: {[divinity: string]: number}}
    isDataLoad: boolean
}
const PantheonDisplayer = ({navigation, isPrayDisponible, onClickCard, dataCollection, isDataLoad}: PantheonDisplayerProps) => {
    const [currentPantheon, setCurrentPantheon] = useState<string>('egyptian')
    const [isNewCardLoad, setIsNewCardLoad] = useState<boolean>(false)
    const [newCardName, setNewCardName] = useState<string>('')
    const [isNewCardShow, setIsNewCardShow] = useState<boolean>(false)

    const dispatch = useDispatch()
    let animation = useRef<any>(new Animated.Value(0)).current
    const ws = wsService.getWs()

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

    const onClickCardDivinity = (item: string) => {
        onClickCard(item, currentPantheon)
    }

    const renderItem = ({item}: any) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    onClickCardDivinity(item)
                }}
                style={{marginHorizontal: 15, marginBottom: 15}}>
                <Card name={item} minimal={true} />
                <View style={[pantheonDiplayerStyle.numberOccurencesContainer, {backgroundColor: fontColor[currentPantheon]}]}>
                    <Text style={{color: 'white'}}>{dataCollection[currentPantheon][item]}</Text>
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
                    <Image source={currentPantheon === 'greek' ? greekLogo : greekLogoNoColor} />
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
                                dataCollection,
                                setIsNewCardLoad,
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
            {!isDataLoad ? <ActivityIndicator animating={!false} color={colors.blueSky} size={'large'}/> : <></>}
                {Object.keys(dataCollection).length !== 0 ? (
                    <FlatList
                        data={Object.keys(dataCollection[currentPantheon])}
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

// PantheonDisplayer.onClickCardDivinity = (onClickCard: Function, item: string, currentPantheon: string) => {
//     onClickCard(item, currentPantheon)
// }

PantheonDisplayer.onPressPrayButton = (
    currentPantheon: string,
    ws: any,
    dataCollectionWithOccurence: {[pantheon: string]: {[divinityName: string]: number}},
    setIsNewCardLoad: Function,
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
            if (!Object.keys(dataCollectionWithOccurence[currentPantheon]).includes(newCardName)) {
                setIsNewCardLoad(false)
                dataCollectionWithOccurence[currentPantheon][newCardName] = 1
                setIsNewCardLoad(true)
            } else {
                setIsNewCardLoad(false)
                dataCollectionWithOccurence[currentPantheon][newCardName] += 1
                setIsNewCardLoad(true)
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
