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
import PantheonDisplayer from 'components/PantheonDisplayer/PantheonDisplayer'
import wsService from '../../ws-services/WsService'
import { selectUsername } from 'store/reducers/UsernameSlice'

type MyCollectionProps = {
    navigation: any
}

const MyCollection = ({navigation}: MyCollectionProps) => {
    const ws = wsService.getWs()
    const [isDialogVisible, setIsDialogVisible] = useState<boolean>(false)
    const [nameCardDialog, setNameCardDialog] = useState<string>('')
    const [cardDialogPantheon, setCardDialogPantheon] = useState<string>('')
    const [dataCollectionWithOccurence, setDataCollectionWithOccurence] = useState<{[pantheon: string]: {[divinity: string]: number}}>({})
    const [isDataLoad, setIsDataLoad] = useState<boolean>(false)
    const username = useSelector(selectUsername)

    const fontColor: any = {
        egyptian: colors.egyptianYellow,
        nordic: colors.nordicRed,
        greek: colors.greekBlue,
    }

    useEffect(() => {
        loadDataCollection()
    }, [ws])

    const onClickCardPantheon = (name: string) => {
        setIsDialogVisible(true)
        setNameCardDialog(name)
    }

    const hideDialog = () => {
        setIsDialogVisible(false)
    }

    const loadDataCollection = () => {
        ws.send(
            JSON.stringify({
                type: 'collection',
                username: username,
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
            for (const pantheon in dataCollectionWithUniqueItemTemp) {
                dataCollection.data[pantheon].forEach((divinity: string) => {
                    if (!dataCollectionWithUniqueItemTemp[pantheon].includes(divinity)) {
                        dataCollectionWithUniqueItemTemp[pantheon].push(divinity)
                        const numberOccurence = dataCollection.data[pantheon].filter((x: string) => x === divinity).length
                        dataCollectionWithOccurenceTemp[pantheon][divinity] = numberOccurence
                    }
                })
            }
            setDataCollectionWithOccurence(dataCollectionWithOccurenceTemp)
            setIsDataLoad(true)
        }
    }

    return (
        <View style={{width: '100%', height: '100%'}}>
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
            <View style={{flex: 1, paddingBottom: 20, paddingTop: 10}} >
                <PantheonDisplayer
                    isDataLoad={isDataLoad}
                    dataCollection={dataCollectionWithOccurence}
                    isPrayDisponible={true}
                    onClickCard={(name: string, cardDialogPantheonProps: string) => {
                        setCardDialogPantheon(cardDialogPantheonProps)
                        onClickCardPantheon(name)
                    }}
                />
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
                                color={fontColor[cardDialogPantheon]}
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
export default MyCollection
