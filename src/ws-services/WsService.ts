import constants from './../constants'
import {initialisationOnConnection} from '../store/reducers/DisciplesSlice'
import store from '../store/store'
import {onModificationFriends} from '../store/reducers/FriendsSlice'
import {onModificationDefyFriend} from 'store/reducers/DefyFriendSlice'
import {onModificationErrorToDiplay} from 'store/reducers/ErrorToDisplaySlice'
import { useNavigation } from '@react-navigation/native'

class WsService {
    WS: any = null
    pingTimeout: any = null
    keepAliveInterval: any = null

    openWs(username: string) {
        this.WS = new WebSocket(`ws://${constants.API_URL}/connection`)
        let pingTimeout = this.pingTimeout
        let keepAliveInterval = this.keepAliveInterval

        this.WS.onopen = () => {
            this.WS.send(
                JSON.stringify({
                    type: 'connection',
                    username: username,
                })
            )
            this.WS.send(
                JSON.stringify({
                    type: 'disciples',
                    username: username,
                })
            )
            keepAliveInterval = setInterval(() => {
                console.log('Checking if the connection is alive, sending a ping')
                this.WS.send(
                    JSON.stringify({
                        type: 'ping',
                        username: username,
                    })
                )
                pingTimeout = setTimeout(() => {
                    console.log('arreter la ws')
                }, 15000) //Send ping evry 15sec
            }, 7500)
        }

        this.WS.onerror = (error: any) => {
            console.log(error, 'onerror')
        }

        this.WS.addEventListener('message', function (event: any) {
            if (JSON.parse(event.data).type === 'pong') {
                clearInterval(pingTimeout)
                console.log('ping reçu du back')
            } else if (JSON.parse(event.data).type === 'challenge') {
                console.log('tu as été défié')
                store.dispatch(
                    onModificationDefyFriend({
                        defyFriend: {
                            stateModal: true,
                            infoFriend: JSON.parse(event.data).username,
                        },
                        type: 'MODIFICATION_DEFY_FRIEND',
                    })
                )
            } else if (JSON.parse(event.data).type === 'userAlreadyConnected') {
                console.log('deja co !!!!!')
                store.dispatch(onModificationErrorToDiplay({errorToDisplay: {stateModal: true, msg: 'Vous êtes déja connecté'}, type: 'NEW_ERROR'}))
                const navigation = useNavigation()
                navigation.navigate('SignIn')

            } else if (JSON.parse(event.data).type === 'disciples') {
                store.dispatch(initialisationOnConnection({number: parseInt(JSON.parse(event.data).disciples), type: 'INITIALISATION_DISCIPLES'}))
            } else if (JSON.parse(event.data).type === 'deconnectionWebSocket') {
                console.log('deconnectionWebSocket todo')
            } else if (JSON.parse(event.data).type === 'friends') {
                console.log(JSON.parse(event.data), 'modification friends')
                store.dispatch(
                    onModificationFriends({
                        friends: {
                            connected: JSON.parse(event.data).connected,
                            disconnected: JSON.parse(event.data).disconnected,
                            request: JSON.parse(event.data).request,
                        },
                        type: 'MODIFICATION_FRIENDS',
                    })
                )
            }
            console.log('Voici un message du serveur', event)
        })

        this.WS.addEventListener('error', function (event: any) {
            console.log('Erreur WebSocket event listener : ', event)
            if (event.message !== null) {
                console.log('Erreur WebSocket avec msg != null : ', event)
                store.dispatch(onModificationErrorToDiplay({errorToDisplay: {stateModal: true, msg: event.message}, type: 'NEW_ERROR'}))
            }
        })

        this.WS.onclose = (e: any) => {
            console.log(e, 'oncloseeee')
            clearInterval(keepAliveInterval)
        }

        return this.WS
    }

    getWs() {
        return this.WS
    }
}

const wsService = new WsService()

export default wsService
