import React, {useEffect, useRef, useState} from 'react'
import {Animated, FlatList, Image, RefreshControl, SafeAreaView, View} from 'react-native'
import {ActivityIndicator, Text} from 'react-native-paper'
import Disciples from 'components/Disciples/Disciples'
import {colors} from 'GlobalStyle'
import {TouchableOpacity} from 'react-native'
import Card from 'components/Card/Card'
import {myCollectionStyles} from '../../pages/MyCollection/MyCollectionStyles'
import {pantheonDiplayerStyle} from './PantheonDiplayerStyle'
import {incrementByAmount} from '../../store/reducers/DisciplesSlice'
import {useDispatch, useSelector} from 'react-redux'
import wsService from '../../ws-services/WsService'
import {selectUsername} from 'store/reducers/UsernameSlice'

type PantheonDisplayerProps = {
    isPrayDisponible: boolean
    onClickCard: Function
    dataCollection: {[pantheon: string]: {[divinity: string]: number}}
    isDataLoad: boolean
    onRefreshProps?: Function
}
const PantheonDisplayer = ({
    isPrayDisponible,
    onClickCard,
    dataCollection,
    isDataLoad,
    onRefreshProps = () => {},
}: PantheonDisplayerProps) => {
    const [currentPantheon, setCurrentPantheon] = useState<string>('egyptian')
    const [isNewCardLoad, setIsNewCardLoad] = useState<boolean>(false)
    const [newCardName, setNewCardName] = useState<string>('')
    const [isNewCardShow, setIsNewCardShow] = useState<boolean>(false)
    const username = useSelector(selectUsername)
    const [errorBuyDisciple, setErrorBuyDisciple] = useState<string>('')
    const [refreshing, setRefreshing] = useState<boolean>(false)

    const dispatch = useDispatch()
    let animation = useRef<any>(new Animated.Value(0)).current
    const ws = wsService.getWs()
    useEffect(() => {
        if (refreshing) {
            setRefreshing(!refreshing)
        }
    }, [dataCollection])
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

    const onRefresh = () => {
        setRefreshing(!refreshing)
        onRefreshProps()
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

    const onPressPrayButton = (dataCollectionWithOccurence: {[pantheon: string]: {[divinityName: string]: number}}) => {
        ws.send(
            JSON.stringify({
                type: 'pray',
                username: username,
                pantheon: currentPantheon,
            })
        )
        ws.onmessage = (e: any) => {
            if (JSON.parse(e.data).type === 'notEnoughDisciples') {
                setErrorBuyDisciple("Vous n'avez pas assez de disciples")
            } else if (JSON.parse(e.data).type === 'card') {
                setErrorBuyDisciple('')
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
                        onPress={() => onPressPrayButton(dataCollection)}>
                        <Text style={{color: fontColor[currentPantheon], fontSize: 16}}> Prier </Text>
                        <Image source={require('@images/icon_openHand.png')} style={[myCollectionStyles.iconPray, {marginRight: 13}]} />
                        <Text style={{color: fontColor[currentPantheon]}}>{-10}</Text>
                        <Image source={require('@images/icon_disciple.png')} style={myCollectionStyles.iconPray} />
                    </TouchableOpacity>
                    {errorBuyDisciple === '' ? <></> : <Text style={{color: colors.errorRed, fontSize: 12}}>{errorBuyDisciple}</Text>}
                </View>
            ) : (
                <></>
            )}

            <SafeAreaView style={myCollectionStyles.cardCollectionContainer}>
                {!isDataLoad ? <ActivityIndicator animating={!false} color={colors.blueSky} size={'large'} /> : <></>}
                {Object.keys(dataCollection).length !== 0 ? (
                    <FlatList
                        style={{width: '100%', paddingHorizontal:'12%'}}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[fontColor[currentPantheon]]} />}
                        onRefresh={onRefresh}
                        refreshing={refreshing}
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
