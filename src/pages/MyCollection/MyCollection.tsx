import React, {useEffect, useState} from 'react'
import {FlatList, Image, SafeAreaView, ScrollView, View} from 'react-native'
import {IconButton, Modal, Portal, Text} from 'react-native-paper'
import ContentTextured from 'components/ContentTextured/ContentTextured'
import Disciples from 'components/Disciples/Disciples'
import {colors} from 'GlobalStyle'
import {TouchableOpacity} from 'react-native'
import Card from 'components/Card/Card'
import {myCollectionStyles} from './MyCollectionStyles'
import {useSelector} from 'react-redux'
import {selectWs} from '../../ws-services/WsSlice'

type MyCollectionProps = {
    navigation: any
}

const MyCollection = ({navigation}: MyCollectionProps) => {
    const [currentPantheon, setCurrentPantheon] = useState<string>('Egypt')
    const [EgyptCards, setEgyptCards] = useState<string[]>([])
    const [GrecCards, setGrecCards] = useState<string[]>([])
    const [NordicCards, setNordicCards] = useState<string[]>([])
    const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false)
    const [nameCardDialog, setNameCardDialog] = useState<string>('')
    const [collectionData, setCollectionData] = useState<{[pantheon: string]: string[]}>({})
    const [isDataLoad, setIsDataLoad] = useState<boolean>(false)

    const ws = useSelector(selectWs)

    useEffect(() => {
        MyCollection.loadDataCollection(setCollectionData, setIsDataLoad, ws)
    }, [ws])

    const fontColor: any = {
        Egypt: colors.EgyptYellow,
        Nordic: colors.NordicRed,
        Grec: colors.GrecBlue,
    }

    const pricePray: any = {
        Egypt: 1500,
        Nordic: 1000,
        Grec: 500,
    }
    const NordicLogo: any = require('@images/pantheon-logos/nordic.png')
    const NordicLogoNoColor: any = require('@images/pantheon-logos/nordic-nocolor.png')
    const GrecLogo: any = require('@images/pantheon-logos/greek.png')
    const GrecLogoNoColor: any = require('@images/pantheon-logos/greek-nocolor.png')
    const EgyptLogo: any = require('@images/pantheon-logos/egyptian.png')
    const EgyptLogoNoColor: any = require('@images/pantheon-logos/egyptian-nocolor.png')

    const renderItem = ({item}: any) => {
        return (
            <TouchableOpacity onPress={() => onClickCard(item)} style={{marginHorizontal: 15, marginBottom: 15}}>
                <Card name={item} minimal={true} />
            </TouchableOpacity>
        )
    }

    const onClickCard = ({name}: any) => {
        setIsDialogVisible(true)
        setNameCardDialog(name)
    }

    const hideDialog = () => {
        setIsDialogVisible(false)
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
                    COLLECTION
                </Text>
            </ContentTextured>
            <View style={{height: '78%'}}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            setCurrentPantheon('Nordic')
                        }}>
                        <Image source={currentPantheon === 'Nordic' ? NordicLogo : NordicLogoNoColor} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setCurrentPantheon('Grec')
                        }}>
                        <Image source={currentPantheon === 'Grec' ? GrecLogo : GrecLogoNoColor} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setCurrentPantheon('Egypt')
                        }}>
                        <Image source={currentPantheon === 'Egypt' ? EgyptLogo : EgyptLogoNoColor} />
                    </TouchableOpacity>
                </View>
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
                <Portal>
                    <Modal
                        visible={isDialogVisible}
                        onDismiss={hideDialog}
                        contentContainerStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <View>
                            <Card name={nameCardDialog} minimal={false} />
                            <IconButton
                                icon="close"
                                size={27}
                                color={fontColor[currentPantheon]}
                                style={myCollectionStyles.iconButtonCloseDialog}
                                onPress={hideDialog}
                                hasTVPreferredFocus={undefined}
                                tvParallaxProperties={undefined}
                            />
                        </View>
                    </Modal>
                </Portal>
            </View>

            <ContentTextured position={'footer'} children={<></>} />
        </View>
    )
}
MyCollection.loadDataCollection = (setCollectionData: Function, setIsDataLoad: Function, ws: any) => {
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

export default MyCollection
