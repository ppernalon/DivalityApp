import React, {useEffect, useState} from 'react'
import {FlatList, Image, SafeAreaView, ScrollView, View} from 'react-native'
import {IconButton, Modal, Portal, Text} from 'react-native-paper'
import ContentTextured from 'components/ContentTextured/ContentTextured'
import Disciples from 'components/Disciples/Disciples'
import {colors} from 'GlobalStyle'
import {TouchableOpacity} from 'react-native'
import Card from 'components/Card/Card'
import {myCollectionStyles} from '../../pages/MyCollection/MyCollectionStyles'
import {useSelector} from 'react-redux'
import {selectWs} from '../../ws-services/WsSlice'

type PantheonDisplayerProps = {
    navigation?: any
    isPrayDisponible: boolean,
    onClickCard: Function
}

const PantheonDisplayer = ({navigation, isPrayDisponible, onClickCard}: PantheonDisplayerProps) => {
    const [currentPantheon, setCurrentPantheon] = useState<string>('egyptian')
    const [egyptianCards, setegyptianCards] = useState<string[]>([])
    const [greekCards, setgreekCards] = useState<string[]>([])
    const [nordicCards, setnordicCards] = useState<string[]>([])
    const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false)
    const [nameCardDialog, setNameCardDialog] = useState<string>('')
    const [collectionData, setCollectionData] = useState<{[pantheon: string]: string[]}>({})
    const [isDataLoad, setIsDataLoad] = useState<boolean>(false)

    const ws = useSelector(selectWs)

    useEffect(() => {
        PantheonDisplayer.loadDataCollection(setCollectionData, setIsDataLoad, ws)
    }, [ws])

    const fontColor: any = {
        egyptian: colors.egyptianYellow,
        nordic: colors.nordicRed,
        greek: colors.greekBlue,
    }

    const pricePray: any = {
        egyptian: 1500,
        nordic: 1000,
        greek: 500,
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
            {isPrayDisponible ? (
                <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 14}}>
                    <Disciples fontColor={fontColor[currentPantheon]} />
                    <TouchableOpacity
                        style={[
                            {
                                borderColor: fontColor[currentPantheon],
                            },
                            myCollectionStyles.containerPrayDisciples,
                        ]}>
                        <Text style={{color: fontColor[currentPantheon], fontSize: 16}}> Prier </Text>
                        <Image source={require('@images/icon_openHand.png')} style={[myCollectionStyles.iconPray, {marginRight: 13}]} />
                        <Text style={{color: fontColor[currentPantheon]}}>{-pricePray[currentPantheon]}</Text>
                        <Image source={require('@images/icon_disciple.png')} style={myCollectionStyles.iconPray} />
                    </TouchableOpacity>
                </View>
            ) : (
                <></>
            )}

            <SafeAreaView style={myCollectionStyles.cardCollectionContainer}>
                {isDataLoad ? (
                    <FlatList
                        data={collectionData[currentPantheon]}
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
        setCollectionData(dataCollection.data)
        setIsDataLoad(true)
    }
}

export default PantheonDisplayer
