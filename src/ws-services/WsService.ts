import constants from './../constants'
import {initialisationOnConnection} from '../store/reducers/DisciplesSlice'
import store from '../store/store'
import {onModificationFriends} from '../store/reducers/FriendsSlice'
import {onModificationDefyFriend} from 'store/reducers/DefyFriendSlice'
import {onModificationErrorToDiplay} from 'store/reducers/ErrorToDisplaySlice'

class WsService {
    WS: any = null

    openWs(username: string) {
        this.WS = new WebSocket(`ws://${constants.API_URL}/connection`)

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
            this.WS.addEventListener('message', function (event: any) {
                if (JSON.parse(event.data).type === 'challenge') {
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
        }

        this.WS.onerror = (error: WebSocketErrorEvent) => {
            console.log(console.log(error), 'errrrrrrrrr')
            store.dispatch(onModificationErrorToDiplay({errorToDisplay: {stateModal: true, msg: "error"}, type: 'NEW_ERROR'}))
        }
        this.WS.onclose = (e :any) =>{
            console.log( e , 'oncloseeee')
        }

        return this.WS
    }

    getWs() {
        return this.WS
    }
}

const wsService = new WsService()

export default wsService
