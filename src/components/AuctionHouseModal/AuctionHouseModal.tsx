import Card from '@components/Card/Card'
import React from 'react'
import {View} from 'react-native'
import {IconButton, Modal, Portal, Text} from 'react-native-paper'
import {auctionHouseStyle} from './AuctionHouseStyle'

type AuctionHouseModalProps = {
    isModalVisible: boolean
    changeModalStatus: Function
    cardInfo: any
}

const AuctionHouseModal = ({isModalVisible, changeModalStatus, cardInfo}: AuctionHouseModalProps) => {
    return (
        <Portal>
            <Modal
                visible={isModalVisible}
                onDismiss={() => {
                    changeModalStatus()
                }}
                contentContainerStyle={{backgroundColor: 'white', height: '80%', width: '80%', margin: '10%'}}>
                <View style={{height: '100%', width: '100%'}}>
                    <IconButton
                        icon="close"
                        onPress={() => {
                            changeModalStatus()
                        }}
                        hasTVPreferredFocus={undefined}
                        tvParallaxProperties={undefined}
                        style={{marginLeft: '85%'}}
                    />
                    <View style={{width: '100%', alignItems: 'center'}}>
                        <Card name={cardInfo.cardName} minimal={true}></Card>
                    </View>
                    <View style={{marginLeft:'20%', marginTop:'10%'}}>
                        <Text style={auctionHouseStyle.formName}>Nom du vendeur</Text>
                        <Text style={auctionHouseStyle.form}>{cardInfo.ownerName}</Text>
                        <Text style={auctionHouseStyle.formName}>Prix</Text>
                        <Text style={auctionHouseStyle.form}>{cardInfo.price}</Text>
                    </View>
                </View>
            </Modal>
        </Portal>
    )
}

export default AuctionHouseModal
