import Card from '@components/Card/Card'
import DivalityButtonTextured from 'components/DivalityButtonTextured/DivalityButtonTextured'
import {colors} from 'GlobalStyle'
import React, {useEffect, useState} from 'react'
import {View, ScrollView} from 'react-native'
import {Button, IconButton, Modal, Portal, Text, TextInput} from 'react-native-paper'
import {useDispatch, useSelector} from 'react-redux'
import {incrementByAmount} from 'store/reducers/DisciplesSlice'
import {selectUsername} from 'store/reducers/UsernameSlice'
import wsService from '../../ws-services/WsService'
import {auctionHouseStyle} from './AuctionHouseStyle'

type AuctionHouseModalProps = {
    isModalVisible: boolean
    closeModalProps: Function
    cardInfo: any
}

const AuctionHouseModal = ({isModalVisible, closeModalProps, cardInfo}: AuctionHouseModalProps) => {
    const ws = wsService.getWs()
    const username = useSelector(selectUsername)
    const dispatch = useDispatch()
    const [errorToDisplay, setErrorToDisplay] = useState<string>('')
    const [formOutputQuantity, setFormOutputQuantity] = useState<string>('')

    useEffect(() => {
        if (isModalVisible) {
            setFormOutputQuantity(cardInfo.quantity.toString())
        }
    }, [isModalVisible])


    const buyOneCard = () => {
        ws.send(
            JSON.stringify({
                type: 'buyAuctionHouse',
                username: username,
                cardName: cardInfo.cardName,
                ownerName: cardInfo.ownerName,
                price: cardInfo.price,
                quantity: formOutputQuantity,
            })
        )
        ws.onmessage = (e: any) => {
            if (e.data === "L'utilisateur ne possède pas assez de disciples") {
                setErrorToDisplay('Vous ne possedez pas assez de disciples')
            } else if (JSON.parse(e.data).type === 'auctionHouse') {
                dispatch(incrementByAmount({number: -parseInt(cardInfo.price), type: 'INCREMENT'}))
                closeModal()
            }
        }
    }
    const closeModal = () => {
        setErrorToDisplay('')
        closeModalProps()
    }
    return (
        <Portal>
            <Modal
                visible={isModalVisible}
                onDismiss={() => {
                    closeModal()
                }}
                contentContainerStyle={{backgroundColor: 'white', height: '80%', width: '80%', margin: '10%'}}>
                <View style={{height: '100%', width: '100%', flex:1}}>
                    <IconButton
                        icon="close"
                        onPress={() => {
                            closeModal()
                        }}
                        hasTVPreferredFocus={undefined}
                        tvParallaxProperties={undefined}
                        style={{marginLeft: '85%'}}
                    />
                    <ScrollView style={{flex: 1, marginVertical: 20, height: '100%'}}>
                        <View style={{width: '100%', alignItems: 'center'}}>
                            <Card name={cardInfo.cardName} minimal={true}></Card>
                        </View>
                        <View style={{marginLeft: '20%', marginTop: '10%', width: '60%'}}>
                            <Text style={auctionHouseStyle.formName}>Prix</Text>
                            <TextInput mode={'flat'} underlineColor={colors.primaryBlue} disabled={true} style={auctionHouseStyle.formSell}>
                                {cardInfo.price}
                            </TextInput>
                            <Text style={auctionHouseStyle.formName}>Quantité</Text>
                            <TextInput
                                keyboardType={'numeric'}
                                style={auctionHouseStyle.formSell}
                                mode={'flat'}
                                underlineColor={colors.primaryBlue}
                                value={formOutputQuantity}
                                right={<TextInput.Affix text={'Max ' + cardInfo.quantity} />}
                                onChangeText={(newValue) => {
                                    if (parseInt(newValue) > parseInt(cardInfo.quantity)) {
                                        setFormOutputQuantity(cardInfo.quantity)
                                    } else {
                                        setFormOutputQuantity(newValue)
                                    }
                                }}
                            />
                        </View>
                    </ScrollView>
                    <View
                        style={{
                            width: '100%',
                            marginHorizontal: '5%',
                            bottom: '5%',
                        }}>
                        <Text style={{color: colors.errorRed, fontSize: 10, marginBottom: 10, left: '10%'}}>{errorToDisplay}</Text>

                        <View style={{width: '90%', flexDirection: 'row', justifyContent: 'space-around'}}>
                            <View style={{width: '38%'}}>
                                <DivalityButtonTextured
                                    isCancelButton={true}
                                    label={'Annuler'}
                                    onSubmit={() => closeModal()}
                                    fontSize={14}
                                    paddingVertical={5}
                                />
                            </View>
                            <View style={{width: '38%'}}>
                                <DivalityButtonTextured
                                    onSubmit={() => {
                                        buyOneCard()
                                    }}
                                    label={'Acheter'}
                                    fontSize={14}
                                    paddingVertical={5}
                                    isShadow={false}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </Portal>
    )
}

export default AuctionHouseModal
