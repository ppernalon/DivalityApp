import Disciples from '@components/Disciples/Disciples'
import DivalityButtonTextured from '@components/DivalityButtonTextured/DivalityButtonTextured'
import FooterProfileCommunity from '@components/FooterProfileCommunity/FooterProfileCommunity'
import ContentTextured from '@components/ContentTextured/ContentTextured'
import PowerIcon from '@components/PowerIcon/PowerIcon'
import React, {useEffect, useRef, useState} from 'react'
import {AppState, View} from 'react-native'
import {menuStyle} from './MenuStyle'
import MatchmakingLoader from '@components/MatchmakingLoader'
import {Modal, Portal} from 'react-native-paper'
import wsService from '../../ws-services/WsService'
import {useSelector} from 'react-redux'
import {selectUsername} from '../../store/reducers/UsernameSlice'

type MenuProps = {
    navigation: any
}
const widthButtons = '70%'
const Menu = ({navigation}: MenuProps) => {
    const appState = useRef(AppState.currentState)
    const [isWaitingForQueue, setWaitingState] = useState<boolean>(false)
    const ws = wsService.getWs()
    const username = useSelector(selectUsername)

    const startMatchmaking: Function = () => {
        setWaitingState(true)
        ws.send(
            JSON.stringify({
                type: 'waitForDuel',
                username: username,
            })
        )
        ws.onmessage = (answer: WebSocketMessageEvent) => {
            const data = JSON.parse(answer.data)
            if (data.type === 'duel') {
                setWaitingState(false)
                navigation.navigate('Duel', {opponent: data.opponent})
            }
        }
    }

    const cancelMatchmaking: Function = () => {
        setWaitingState(false)
        ws.send(
            JSON.stringify({
                type: 'cancelWaitForDuel',
                username: username,
            })
        )
    }

    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                console.log('App foreground')
            } else if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
                ws.close()
                navigation.navigate('SignIn')
            }
        })
        return () => subscription.remove()
    }, [])

    useEffect(() => {})

    return (
        <View style={menuStyle.containerMenu}>
            <ContentTextured position={'header'}>
                <View style={menuStyle.header}>
                    <Disciples />
                    <PowerIcon />
                </View>
            </ContentTextured>
            <View style={menuStyle.containerButtons}>
                <DivalityButtonTextured label={'CHERCHER UNE PARTIE'} onSubmit={startMatchmaking} width={widthButtons} />
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
                    onDismiss={() => cancelMatchmaking()}
                    contentContainerStyle={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <MatchmakingLoader onCancel={cancelMatchmaking} label={"Recherche d'une partie en cours"} />
                </Modal>
            </Portal>
        </View>
    )
}

export default Menu
