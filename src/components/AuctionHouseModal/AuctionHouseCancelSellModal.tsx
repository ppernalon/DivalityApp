import Card from '@components/Card/Card'
import DivalityButtonTextured from 'components/DivalityButtonTextured/DivalityButtonTextured'
import {colors} from 'GlobalStyle'
import React, {useState} from 'react'
import {View} from 'react-native'
import {Button, IconButton, Modal, Portal, Text, TextInput} from 'react-native-paper'
import {useDispatch, useSelector} from 'react-redux'
import {incrementByAmount} from 'store/reducers/DisciplesSlice'
import {selectUsername} from 'store/reducers/UsernameSlice'
import wsService from '../../ws-services/WsService'
import {auctionHouseStyle} from './AuctionHouseStyle'

type AuctionHouseModalProps = {
    isModalVisible: boolean
    closeModalProps: Function
    sellInfo: any
    onValidation: Function
}

const AuctionHouseCancelSellModal = ({isModalVisible, closeModalProps, sellInfo, onValidation}: AuctionHouseModalProps) => {
    const [errorToDisplay, setErrorToDisplay] = useState<string>('')
    const [formOutputQuantity, setFormOutputQuantity] = useState<string>('0')
    const ws = wsService.getWs()
    const username = useSelector(selectUsername)

    const closeModal = () => {
        setErrorToDisplay('')
        closeModalProps()
    }
    
    const onValidationDeleteSell = () => {
        setErrorToDisplay('')
        onValidation()
        const cardToDelete = sellInfo
        ws.send(
            JSON.stringify({
                type: 'cancelAuction',
                username: username,
                cardName: cardToDelete.cardName,
                price: cardToDelete.price,
                quantity: formOutputQuantity,
            })
        )
    }
    return (
        <Portal>
            <Modal
                visible={isModalVisible}
                onDismiss={() => {
                    closeModal()
                }}
                contentContainerStyle={{
                    backgroundColor: 'white',
                    width: '80%',
                    margin: '10%',
                    alignItems: 'center',
                    paddingTop: '1%',
                    paddingBottom: '5%',
                }}>
                <IconButton
                    icon="close"
                    onPress={() => {
                        closeModal()
                    }}
                    hasTVPreferredFocus={undefined}
                    tvParallaxProperties={undefined}
                    style={{marginLeft: '85%', marginBottom: '3%'}}
                />
                <Text style={{width: '80%'}}>
                    Voulez-vous supprimer la vente de {sellInfo.cardName.replace(sellInfo.cardName[0], sellInfo.cardName[0].toUpperCase())}?
                </Text>
                <View style={{width: '60%', paddingBottom:30}}>
                     <TextInput
                    keyboardType={'numeric'}
                    style={auctionHouseStyle.formNewSell}
                    mode={'flat'}
                    underlineColor={colors.primaryBlue}
                    label="Quantité"
                    value={formOutputQuantity}
                    right={<TextInput.Affix text={'Max ' + sellInfo.quantity} />}
                    onChangeText={(newValue) => {
                        if (parseInt(newValue) > parseInt(sellInfo.quantity)) {
                            setFormOutputQuantity(sellInfo.quantity.toString())
                        } else {
                            setFormOutputQuantity(newValue)
                        }
                    }}
                />
                </View>
               
                <View style={{width: '90%', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <View style={{width: '38%'}}>
                        <DivalityButtonTextured isCancelButton={true} label={'Annuler'} onSubmit={() => closeModal()} fontSize={14} paddingVertical={5} />
                    </View>
                    <View style={{width: '38%'}}>
                        <DivalityButtonTextured
                            onSubmit={() => {
                                onValidationDeleteSell()
                            }}
                            label={'Valider'}
                            fontSize={14}
                            paddingVertical={5}
                            isShadow={false}
                        />
                    </View>
                </View>
            </Modal>
        </Portal>
    )
}

export default AuctionHouseCancelSellModal
