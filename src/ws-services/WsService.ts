import constants from './../constants'
import {initialisationOnConnection} from '../store/reducers/DisciplesSlice'
import store from '../store/store'
import {onModificationFriends} from '../store/reducers/FriendsSlice'
import {onModificationDefyFriend} from 'store/reducers/DefyFriendSlice'
import {onModificationErrorToDiplay} from 'store/reducers/ErrorToDisplaySlice'
import {useNavigation} from '@react-navigation/native'

class WsService {
    WS: any = null
    pingTimeout: any = null
    keepAliveInterval: any = null
    isWsOpen = false

    openWs(username: string) {
        this.WS = new WebSocket(`ws://${constants.API_URL}/connection`)
        let pingTimeout = this.pingTimeout
        let keepAliveInterval = this.keepAliveInterval
        this.isWsOpen = true

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

            if (this.isWsOpen) {
                keepAliveInterval = setInterval(() => {
                   // console.log('Checking if the connection is alive, sending a ping')
                    this.WS.send(
                        JSON.stringify({
                            type: 'ping',
                            username: username,
                        })
                    )
                    pingTimeout = setTimeout(() => {
                        store.dispatch(
                            onModificationErrorToDiplay({errorToDisplay: {stateModal: true, msg: 'La WS a cessé de fonctionner'}, type: 'NEW_ERROR'})
                        )
                    }, 15000) //Send ping evry 15sec
                }, 7500)
            }
        }

        this.WS.onerror = (error: any) => {
            if (error.message) {
                store.dispatch(
                    onModificationErrorToDiplay({
                        errorToDisplay: {stateModal: true, msg: 'La WS a cessé de fonctionner (' + error.message + ')'},
                        type: 'NEW_ERROR',
                    })
                )
            }
            clearInterval(pingTimeout)
            clearInterval(keepAliveInterval)
        }

        this.WS.addEventListener('message', function (event: any) {
            if (JSON.parse(event.data).type === 'pong') {
                clearInterval(pingTimeout)
                // console.log('ping reçu du back')
            } else if (JSON.parse(event.data).type === 'challenge') {
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
                clearInterval(keepAliveInterval)
                store.dispatch(onModificationErrorToDiplay({errorToDisplay: {stateModal: true, msg: 'Vous êtes déja connecté'}, type: 'NEW_ERROR'}))
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

        this.WS.onclose = (e: any) => {
            console.log(e, 'oncloseeee')
            this.isWsOpen = false
            clearInterval(keepAliveInterval)
            clearInterval(pingTimeout)
        }

        return this.WS
    }

    getWs() {
        return this.WS
    }
}

const wsService = new WsService()

export default wsService
