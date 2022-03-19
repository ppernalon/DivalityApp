import DivalityButtonTextured from 'components/DivalityButtonTextured/DivalityButtonTextured'
import React, {useEffect, useState} from 'react'
import {View} from 'react-native'
import {IconButton, Modal, Portal, Text, TextInput} from 'react-native-paper'
import {useDispatch, useSelector} from 'react-redux'
import {onModificationDefyFriend, selectDefyFriend} from 'store/reducers/DefyFriendSlice'
import {selectUsername} from 'store/reducers/UsernameSlice'
import wsService from '../../ws-services/WsService'
import {useNavigation} from '@react-navigation/native'
import {colors} from 'GlobalStyle'
import { onModificationDeconnectionState, selectDeconnectionState } from 'store/reducers/DeconnectionStateSlice'

type DeconnectionModalProps = {}

const DeconnectionModal = ({}: DeconnectionModalProps) => {
    const [stateModalDeco, setStateModalDeco] = useState<{stateModal: boolean}>({stateModal: false})
    const navigation = useNavigation()
    const ws = wsService.getWs()
    const username = useSelector(selectUsername)
    const deconnectionStateStore = useSelector(selectDeconnectionState)
    const dispatch = useDispatch()

    useEffect(() => {
        handleDeconnectionState()
    }, [deconnectionStateStore])

    const handleDeconnectionState = () => {
        setStateModalDeco(deconnectionStateStore)
    }

    const onValidationDeco = () =>{
        navigation.navigate('SignIn')
        dispatch(onModificationDeconnectionState({deconnectionState: {stateModal: false}, type: 'NEW_DECONNECTION_STATE'}))
        ws.close()
    }

    const closeModal = () => {
        dispatch(onModificationDeconnectionState({deconnectionState: {stateModal: false}, type: 'NEW_DECONNECTION_STATE'}))
    }
    return (
        <Portal>
            <Modal
                visible={stateModalDeco.stateModal}
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
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: '100%'}}>
                    <IconButton
                        icon="close"
                        onPress={() => {
                            closeModal()
                        }}
                        hasTVPreferredFocus={undefined}
                        tvParallaxProperties={undefined}
                    />
                </View>

                <Text style={{marginBottom: 10, width: '80%'}}>
                    Etes vous sur de vouloir vous déconnecter ?
                </Text>
                <View style={{width: '90%', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <View style={{width: '38%'}}>
                        <DivalityButtonTextured isCancelButton={true} label={'Annuler'} onSubmit={() => closeModal()} fontSize={14} paddingVertical={5} />
                    </View>
                    <View style={{width: '38%'}}>
                        <DivalityButtonTextured
                            onSubmit={() => {
                                onValidationDeco()
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

export default DeconnectionModal
