import ContentTextured from '@components/ContentTextured/ContentTextured'
import React, {useEffect, useRef, useState} from 'react'
import {TouchableOpacity, View, Button, Image, Keyboard, ScrollView, KeyboardAvoidingView, Platform} from 'react-native'
import {ActivityIndicator, Modal, Portal, Text, TextInput} from 'react-native-paper'
import {useDispatch, useSelector} from 'react-redux'
import wsService from '../../ws-services/WsService'
import {colors} from 'GlobalStyle'
import {selectUsername} from '../../store/reducers/UsernameSlice'
import {onModificationFriends, selectFriends} from '../../store/reducers/FriendsSlice'
import DataTableDivality from 'components/DataTable/DataTableDivality'
import DivalityButtonTextured from 'components/DivalityButtonTextured/DivalityButtonTextured'
import {auctionHouseStyle} from 'components/ModalDivality/AuctionHouseStyle'
import store from 'store/store'
import DefyFriendModal from 'components/ModalDivality/DefyFriendModal'
import {selectDefyFriend} from 'store/reducers/DefyFriendSlice'
import MatchmakingLoader from 'components/MatchmakingLoader'
import {useNavigation} from '@react-navigation/native'

type MyCommunityProps = {}

const MyCommunity = ({}: MyCommunityProps) => {
    const username = useSelector(selectUsername)
    const friends = useSelector(selectFriends)
    const ws = wsService.getWs()
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [isDataLoad, setIsDataLoad] = useState<boolean>(false)
    const [dataForDataTable, setDataForDataTable] = useState<{pseudo: string; rate: string; status: string}[]>([])
    const [formAddByUsername, setFormAddByUsername] = useState<string>('')
    const [addFriendText, setAddFriendText] = useState<{text: string; color: string}>({text: '', color: ''})
    const [isModalDefyOpen, setIsModalDefyOpen] = useState<boolean>(false)
    const [friendInfoToDefy, setFriendInfoToDefy] = useState<{rate: string; status: string; username: string}>({rate: '', status: '', username: ''})

    useEffect(() => {
        onChangeFriends()
    }, [friends])

    const onChangeFriends = () => {
        setIsDataLoad(false)
        let dataTableTemp: any = []
        let friendsCopy = JSON.parse(JSON.stringify(friends))
        for (let keyOfOneState of Object.keys(friendsCopy)) {
            dataTableTemp.push.apply(
                dataTableTemp,
                friendsCopy[keyOfOneState].map((oneFriend: {username: any; victory: string; defeat: string}) => {
                    return {username: oneFriend.username, rate: oneFriend.victory.toString() + '/' + oneFriend.defeat.toString(), status: keyOfOneState}
                })
            )
        }
        setDataForDataTable(dataTableTemp)
        setIsDataLoad(true)
    }
    const header = [
        {name: 'Pseudo', type: 'string', width: 4, nameOfTheData: 'username'},
        {name: 'V/D', type: 'string', width: 2, nameOfTheData: 'rate'},
        {
            name: 'Statut',
            type: 'isConnected',
            width: 4,
            nameOfTheData: 'status',
            action: (item: any, isValidated: boolean) => {
                if (isValidated) {
                    acceptRequestFriend(item)
                } else {
                    removeRequestFriend(item)
                }
            },
        },
        {
            name: 'Défier',
            type: 'iconDefy',
            width: 2,
            nameOfTheData: 'fencing',
            action: (friend: any) => {
                defyFriend(friend)
            },
        },
        {
            name: '',
            type: 'iconDelete',
            width: 2,
            nameOfTheData: 'delete',
            action: (friendInfo: any) => {
                deleteFriend(friendInfo)
            },
        },
    ]

    const deleteFriend = (friendInfo: any) => {
        ws.send(
            JSON.stringify({
                type: 'deleteFriend',
                usernameFriendToDelete: friendInfo.username,
                username: username,
            })
        )
    }

    const defyFriend = (friendInfo: any) => {
        setFriendInfoToDefy(friendInfo)
        ws.send(
            JSON.stringify({
                type: 'challengeFriend',
                usernameChallenged: friendInfo.username,
                username: username,
            })
        )
        ws.onmessage = (e: any) => {
            const type = JSON.parse(e.data).type
            if (type === 'friendChallenged') {
                setIsModalDefyOpen(true)
            } else if (type === 'userAlreadyInDuel') {
                setAddFriendText({text: friendInfo.username + ' est déjà en duel', color: colors.errorRed})
                setIsModalDefyOpen(false)
            } else if (type === 'userNotConnected') {
                setAddFriendText({text: friendInfo.username + ' est déconnecté', color: colors.errorRed})
                setIsModalDefyOpen(false)
            } else if (type === 'challengeAccepted') {
                navigation.navigate('Duel', {opponent: friendInfo.username})
                setIsModalDefyOpen(false)
            } else if (type === 'challengeRefused') {
                setAddFriendText({text: friendInfo.username + ' a refusé votre duel', color: colors.errorRed})
                setIsModalDefyOpen(false)
            }
        }
        setIsModalDefyOpen(true)
    }

    const cancelDefy = () => {
        ws.send(
            JSON.stringify({
                type: 'cancelChallenge',
                usernameChallenged: friendInfoToDefy.username,
                username: username,
            })
        )
        setIsModalDefyOpen(false)
    }

    const removeRequestFriend = (friendInfo: any) => {
        ws.send(
            JSON.stringify({
                type: 'refuseFriendRequest',
                usernameSender: friendInfo.username,
                usernameReceiver: username,
            })
        )
    }
    const acceptRequestFriend = (friendInfo: any) => {
        ws.send(
            JSON.stringify({
                type: 'acceptFriendRequest',
                usernameSender: friendInfo.username,
                usernameReceiver: username,
            })
        )
    }

    const addFriend = () => {
        if (formAddByUsername !== '' && formAddByUsername !== username) {
            ws.send(
                JSON.stringify({
                    type: 'sendFriendRequest',
                    usernameSender: username,
                    usernameReceiver: formAddByUsername,
                })
            )
            ws.onmessage = (e: any) => {
                if (JSON.parse(e.data).type === 'requestAlreadySent')
                    setAddFriendText({text: 'Vous avez déjà demandé en ami ' + formAddByUsername, color: colors.errorRed})
                else if (JSON.parse(e.data).type === 'userNotFound') {
                    setAddFriendText({text: formAddByUsername + " n'a pas été trouvé", color: colors.errorRed})
                } else if (JSON.parse(e.data).type === 'alreadyFriend') {
                    setAddFriendText({text: 'Vous êtes déjà ami avec ' + formAddByUsername, color: colors.errorRed})
                    setFormAddByUsername('')
                    Keyboard.dismiss()
                } else if (JSON.parse(e.data).type === 'requestSent') {
                    setAddFriendText({text: "Demande d'ami envoyée à " + formAddByUsername, color: colors.green})
                    setFormAddByUsername('')
                    Keyboard.dismiss()
                } else if (JSON.parse(e.data).type === 'requestAutomaticallyAccepted') {
                    setAddFriendText({text: "Demande d'ami de " + formAddByUsername + ' acceptée', color: colors.blueSky})
                    setFormAddByUsername('')
                    Keyboard.dismiss()
                }
            }
        }
        if (formAddByUsername === username) {
            setAddFriendText({text: 'Vous ne pouvez pas vous auto-demander en ami', color: colors.errorRed})
            setFormAddByUsername('')
            Keyboard.dismiss()
        }
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
            <View style={{height: '100%', width: '100%', marginBottom: 50}}>
                <ContentTextured position={'header'}>
                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            fontSize: 20,
                        }}>
                        MES AMIS
                    </Text>
                </ContentTextured>
                <View>
                    <Portal>
                        <Modal
                            visible={isModalDefyOpen}
                            onDismiss={() => cancelDefy()}
                            contentContainerStyle={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <MatchmakingLoader onCancel={cancelDefy} label={'Annuler le défi'} />
                        </Modal>
                    </Portal>
                </View>
                <ScrollView contentContainerStyle={{width: '100%', paddingTop: 30, alignItems: 'center', paddingBottom:20}}>
                    <View style={{flexDirection: 'row', width: '80%', justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
                        <View style={{width: '50%', marginRight: 12}}>
                            <TextInput
                                style={{backgroundColor: '#f7f7f7', fontSize: 15, marginRight: 5, height: 60}}
                                mode={'flat'}
                                blurOnSubmit={true}
                                theme={{colors: {text: colors.blueSky, primary: colors.blueSky, placeholder: colors.blueSky}}}
                                label="Pseudo"
                                value={formAddByUsername}
                                onChangeText={(newValue) => {
                                    setFormAddByUsername(newValue)
                                    setAddFriendText({text: '', color: ''})
                                }}
                                right={
                                    <TextInput.Icon
                                        name="magnify"
                                        color={(isTextInputFocused: boolean) => {
                                            if (isTextInputFocused) {
                                                return colors.blueSky
                                            } else return colors.blueSky
                                        }}
                                    />
                                }
                            />
                        </View>
                        <View style={{width: '30%', justifyContent: 'center', alignItems: 'center'}}>
                            <DivalityButtonTextured label={'Ajouter'} onSubmit={addFriend} paddingHorizontal={12} paddingVertical={7} fontSize={15} />
                        </View>
                    </View>
                    {addFriendText.text !== '' ? <Text style={{color: addFriendText.color, marginBottom: 30}}>{addFriendText.text}</Text> : <></>}
                    <Text style={{marginBottom: 30, fontSize: 17}}>Amis en ligne</Text>
                    {!isDataLoad ? (
                        <ActivityIndicator animating={!false} color={colors.blueSky} size={'large'} />
                    ) : (
                        <DataTableDivality isDataLoad={isDataLoad} data={dataForDataTable} header={header} initialSortBy={['isConnected', 'status']} />
                    )}
                </ScrollView>
                <View style={{bottom: 0, width: '100%'}}>
                    <ContentTextured position={'footer'} />
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

export default MyCommunity
