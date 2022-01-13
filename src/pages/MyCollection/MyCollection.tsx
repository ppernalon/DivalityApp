import React, {useState} from 'react'
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
    const [currentPantheon, setCurrentPantheon] = useState<string>('egyptian')
    const [egyptianCards, setEgyptianCards] = useState<string[]>([])
    const [greekCards, setGreekCards] = useState<string[]>([])
    const [nordicCards, setNordicCards] = useState<string[]>([])
    const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false)
    const [nameCardDialog, setNameCardDialog] = useState<string>('')

    MyCollection.loadDataCollection()

    const fontColor: any = {
        egyptian: colors.egyptianYellow,
        nordic: colors.nordicRed,
        greek: colors.greekBlue,
    }

    const MockCardCollection = [
        {
            name: 'anubis',
        },
        {
            name: 'bastet',
        },
        {
            name: 'horus',
        },
        {
            name: 'osiris',
        },
        {
            name: 'osiris',
        },
        {
            name: 'anubis',
        },
        {
            name: 'bastet',
        },
        {
            name: 'horus',
        },
    ]

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
            <TouchableOpacity onPress={() => onClickCard(item)} style={{marginHorizontal: 15, marginBottom: 15}}>
                <Card name={item.name} minimal={true} />
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
                    <FlatList
                        data={MockCardCollection}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.name}
                        numColumns={2}
                        scrollEnabled={true}
                        persistentScrollbar={true}
                    />
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
MyCollection.loadDataCollection = () => {
    let ws = useSelector(selectWs)
    ws.onopen = () => {
        console.log('its open')

        ws.send(
            JSON.stringify({
                type: 'connection',
                username: 'Joulie',
            })
        )
    }
    ws.addEventListener('open', () => {
        ws.send('Hello Server!')
        console.log('Open with event listener')
    })
    ws.onmessage = (e: any) => {
        console.log(e)
    }
    console.log(ws)
}

export default MyCollection
