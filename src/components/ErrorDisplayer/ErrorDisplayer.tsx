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
import { onModificationErrorToDiplay, selectErrorToDisplay } from 'store/reducers/ErrorToDisplaySlice'

type ErrorDisplayerProps = {}

const ErrorDisplayer = ({}: ErrorDisplayerProps) => {
    const [errorToDisplay, setErrorToDisplay] = useState<{stateModal: boolean; msg: string}>({stateModal: false, msg: ''})
    const navigation = useNavigation()
    const ws = wsService.getWs()
    const username = useSelector(selectUsername)
    const errorToDisplayStore = useSelector(selectErrorToDisplay)
    const dispatch = useDispatch()

    useEffect(() => {
        handleChangeOnDefyFriendValue()
    }, [errorToDisplayStore])

    const handleChangeOnDefyFriendValue = () => {
        setErrorToDisplay(errorToDisplayStore)
    }

    const closeModal = () => {
        dispatch(onModificationErrorToDiplay({errorToDisplay: {stateModal: false, msg: ''}, type: 'NEW_ERROR'}))
    }
    return (
        <Portal>
            <Modal
                visible={errorToDisplay.stateModal}
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

                <Text style={{marginBottom: 10}}>
                    L'erreur suivante est survenue
                    <Text style={{color: colors.errorRed}}> {errorToDisplay.msg}</Text>
                </Text>
            </Modal>
        </Portal>
    )
}

export default ErrorDisplayer
