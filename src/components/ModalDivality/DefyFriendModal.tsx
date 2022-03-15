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

type DefyFriendModalProps = {}

const DefyFriendModal = ({}: DefyFriendModalProps) => {
    const [errorToDisplay, setErrorToDisplay] = useState<string>('')
    const [defyFriend, setDefyFriend] = useState<{stateModal: boolean; infoFriend: string}>({stateModal: false, infoFriend: ''})
    const navigation = useNavigation()
    const ws = wsService.getWs()
    const username = useSelector(selectUsername)
    const defyFriendValue = useSelector(selectDefyFriend)
    const dispatch = useDispatch()

    useEffect(() => {
        handleChangeOnDefyFriendValue()
    }, [defyFriendValue])

    const handleChangeOnDefyFriendValue = () => {
        setDefyFriend(defyFriendValue)
    }

    const closeModal = () => {
        setErrorToDisplay('')
        dispatch(onModificationDefyFriend({defyFriend: {stateModal: false, infoFriend: ''}, type: 'MODIFICATION_DEFY_FRIEND'}))
        ws.send(
            JSON.stringify({
                type: 'refuseChallenge',
                username: defyFriend.infoFriend,
                usernameChallenged: username,
            })
        )
        
    }

    const onValidationDefyFriend = () => {
        ws.send(
            JSON.stringify({
                type: 'acceptChallenge',
                username: defyFriend.infoFriend,
                usernameChallenged: username,
            })
        )
        ws.onmessage = (e: any) => {
            if (e.data === 'Challenge accepted') {
                navigation.navigate('Duel', {opponent: defyFriend.infoFriend})
                dispatch(onModificationDefyFriend({defyFriend: {stateModal: false, infoFriend: ''}, type: 'MODIFICATION_DEFY_FRIEND'}))
            }
        }
    }
    return (
        <Portal>
            <Modal
                visible={defyFriend.stateModal}
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
                    Vous avez été défié par 
                    <Text style={{color: colors.blueSky}}> {defyFriend.infoFriend}</Text>
                </Text>
                <Text style={{marginBottom: 20}}> Voulez-vous accepter ?</Text>

                <View style={{width: '90%', flexDirection: 'row', justifyContent: 'space-around'}}>
                    <View style={{width: '38%'}}>
                        <DivalityButtonTextured isCancelButton={true} label={'Refuser'} onSubmit={() => closeModal()} fontSize={14} paddingVertical={5} />
                    </View>
                    <View style={{width: '38%'}}>
                        <DivalityButtonTextured
                            onSubmit={() => {
                                onValidationDefyFriend()
                            }}
                            label={'Jouer'}
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

export default DefyFriendModal
