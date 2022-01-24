import Disciples from '@components/Disciples/Disciples'
import DivalityButtonTextured from '@components/DivalityButtonTextured/DivalityButtonTextured'
import FooterProfileCommunity from '@components/FooterProfileCommunity/FooterProfileCommunity'
import ContentTextured from '@components/ContentTextured/ContentTextured'
import PowerIcon from '@components/PowerIcon/PowerIcon'
import React, { useState } from 'react'
import {View} from 'react-native'
import {menuStyle} from './MenuStyle'
import MatchmakingLoader from '@components/MatchmakingLoader/MatchmakingLoader'
import { Modal, Portal } from "react-native-paper"

type MenuProps = {
    navigation: any
}
const widthButtons = '70%'
const Menu = ({navigation}: MenuProps) => {
    const [isWaitingForQueue, setWaitingState] = useState<boolean>(false)

    return (
        <View style={menuStyle.containerMenu}>
            <ContentTextured position={'header'}>
                <View style={menuStyle.header}>
                    <Disciples />
                    <PowerIcon />
                </View>
            </ContentTextured>
            <View style={menuStyle.containerButtons}>
                <DivalityButtonTextured label={'CHERCHER UNE PARTIE'} onSubmit={() => setWaitingState(true)} width={widthButtons} />
                <DivalityButtonTextured label={'MA COLLECTION'} onSubmit={() => navigation.navigate('Collection')} width={widthButtons} />
                <DivalityButtonTextured label={'MES ÉQUIPES'} onSubmit={() => navigation.navigate('Teams')} width={widthButtons} />
                <DivalityButtonTextured label={'HOTEL DES VENTES'} onSubmit={() => navigation.navigate('Trade')} width={widthButtons} />
                <DivalityButtonTextured label={'CLASSEMENT'} onSubmit={() => navigation.navigate('Ranking')} width={widthButtons} />
            </View>
            <View style={menuStyle.footer}>
                <FooterProfileCommunity />
            </View>
            <Portal>
                <Modal
                    visible={isWaitingForQueue}
                    onDismiss={() => setWaitingState(false)}
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                }}>
                    <MatchmakingLoader onCancel={() => setWaitingState(false)}/>
                </Modal>
            </Portal>
        </View>
    )
}

export default Menu
