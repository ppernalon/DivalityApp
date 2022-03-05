import React from 'react'
import {Image, TouchableOpacity} from 'react-native'
import wsService from 'ws-services/WsService'
import {powerIconStyle} from './PowerIconStyle'
import {useNavigation} from '@react-navigation/native'

const PowerIcon = () => {
    const navigation = useNavigation()
    const ws = wsService.getWs()
    const onCloseIcon = () => {
        ws.close()
        navigation.navigate('SignIn')
    }
    return (
        <TouchableOpacity onPress={onCloseIcon}>
            <Image source={require('@images/power.png')} style={powerIconStyle.powerImage} />
        </TouchableOpacity>
    )
}

export default PowerIcon
