import constants from './../constants'
import {incrementByAmount, initialisationOnConnection} from '../store/reducers/DisciplesSlice'
import store from '../store/store'
import {onModificationFriends} from '../store/reducers/FriendsSlice'
import {onModificationDefyFriend} from 'store/reducers/DefyFriendSlice'
import {onModificationErrorToDiplay} from 'store/reducers/ErrorToDisplaySlice'

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
            const data = JSON.parse(event.data)
            if (data.type === 'pong') {
                clearInterval(pingTimeout)
                // console.log('ping reçu du back')
            } else if (data.type === 'challenge') {
                store.dispatch(
                    onModificationDefyFriend({
                        defyFriend: {
                            stateModal: true,
                            infoFriend: data.username,
                        },
                        type: 'MODIFICATION_DEFY_FRIEND',
                    })
                )
            } else if (data.type === 'userAlreadyConnected') {
                console.log('deja co !!!!!')
                clearInterval(keepAliveInterval)
                store.dispatch(onModificationErrorToDiplay({errorToDisplay: {stateModal: true, msg: 'Vous êtes déja connecté'}, type: 'NEW_ERROR'}))
            } else if (data.type === 'disciples') {
                store.dispatch(initialisationOnConnection({number: parseInt(data.disciples), type: 'INITIALISATION_DISCIPLES'}))
            } else if (data.type === 'deconnectionWebSocket') {
                console.log('deconnectionWebSocket todo')
            } else if (data.type === 'friends') {
                console.log(data, 'modification friends')
                store.dispatch(
                    onModificationFriends({
                        friends: {
                            connected: data.connected,
                            disconnected: data.disconnected,
                            request: data.request,
                        },
                        type: 'MODIFICATION_FRIENDS',
                    })
                )
            } else if (data.type === 'duelWinner' || data.type === 'duelLooser'){
                store.dispatch(incrementByAmount({number: parseInt(data.rewards), type: 'INCREMENT'}))
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
