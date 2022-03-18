import React from 'react'
import {Image, TouchableOpacity} from 'react-native'
import wsService from 'ws-services/WsService'
import {powerIconStyle} from './PowerIconStyle'
import {useNavigation} from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { onModificationDeconnectionState } from 'store/reducers/DeconnectionStateSlice'

const PowerIcon = () => {
    const navigation = useNavigation()
    const ws = wsService.getWs()
    const dispatch = useDispatch()
    const onCloseIcon = () => {
        navigation.removeListener('beforeRemove', (e: any) => {}),
        dispatch(onModificationDeconnectionState({deconnectionState: {stateModal: true}, type: 'NEW_DECONNECTION_STATE'}))
    }
   
    return (
        <TouchableOpacity onPress={onCloseIcon}>
            <Image source={require('@images/power.png')} style={powerIconStyle.powerImage} />
        </TouchableOpacity>
    )
}

export default PowerIcon
