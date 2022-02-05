import ContentTextured from 'components/ContentTextured/ContentTextured'
import DivalityButtonTextured from 'components/DivalityButtonTextured/DivalityButtonTextured'
import React, {useState} from 'react'
import {ImageBackground, TouchableOpacity, View} from 'react-native'
import {Button, Text, ToggleButton} from 'react-native-paper'
import {auctionHouseStyles} from './AuctionHouseStyles'
import {colors} from 'GlobalStyle'
import Shop from '@components/Shop/Shop'
import Sell from '@components/Sell/Sell'

type AuctionHouseProps = {}

const AuctionHouse = () => {
    const [currentUnderPage, setCurrentUnderPage] = useState('shop')

    return (
        <View style={{width: '100%', height:'100%', marginBottom:50}}>
            <ContentTextured position={'header'}>
                <Text
                    style={{
                        color: 'white',
                        textAlign: 'center',
                        fontSize: 20,
                    }}>
                    HOTEL DES VENTES
                </Text>
            </ContentTextured>
            <View style={{height:'78%'}}>
                <ToggleButton.Row
                    onValueChange={(value: string) => setCurrentUnderPage(value)}
                    value={currentUnderPage}
                    style={auctionHouseStyles.containerCurrentUnderPage}>
                    <Button
                        style={[auctionHouseStyles.buttonCurrentUnderPage]}
                        onPress={() => {
                            setCurrentUnderPage('shop')
                        }}>
                        <Text
                            style={[
                                currentUnderPage === 'shop'
                                    ? auctionHouseStyles.buttonCurrentUnderPageActive
                                    : auctionHouseStyles.buttonCurrentUnderPageInactive,
                            ]}>
                            Achats
                        </Text>
                    </Button>
                    <Button
                        style={[auctionHouseStyles.buttonCurrentUnderPage]}
                        onPress={() => {
                            setCurrentUnderPage('sell')
                        }}>
                        <Text
                            style={[
                                currentUnderPage === 'sell'
                                    ? auctionHouseStyles.buttonCurrentUnderPageActive
                                    : auctionHouseStyles.buttonCurrentUnderPageInactive,
                            ]}>
                            Ventes
                        </Text>
                    </Button>
                </ToggleButton.Row>
                <View>{currentUnderPage === 'shop' ? <Shop></Shop> : <Sell></Sell>}</View>
            </View>
            <ContentTextured position={'footer'} children={<></>} />
        </View>
    )
}

export default AuctionHouse
