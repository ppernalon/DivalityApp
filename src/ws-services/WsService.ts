import constants from './../constants'
import {initialisationOnConnection} from '../store/reducers/DisciplesSlice'
import store from '../store/store'
import {onModificationFriends} from '../store/reducers/FriendsSlice'
import {onModificationDefyFriend} from 'store/reducers/DefyFriendSlice'

class WsService {
    WS: any = null

    openWs(username: string) {
        this.WS = new WebSocket(`ws://${constants.API_URL}/connection`)

        this.WS.onopen = () => {
            console.log('websocket ouverte')
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
            this.WS.onmessage = (e: any) => {
                console.log(e)
                if (e.data === 'Challenge refused') {
                    console.log('refus de challenge')
                }
                else if (JSON.parse(e.data).type === 'disciples') {
                    store.dispatch(initialisationOnConnection({number: parseInt(JSON.parse(e.data).disciples), type: 'INITIALISATION_DISCIPLES'}))
                }
                else if (JSON.parse(e.data).type === 'deconnectionWebSocket') {
                    this.WS.close()
                }
                else if (JSON.parse(e.data).type === 'friends') {
                    console.log(JSON.parse(e.data), 'modification friends')
                    store.dispatch(
                        onModificationFriends({
                            friends: {
                                connected: JSON.parse(e.data).connected,
                                disconnected: JSON.parse(e.data).disconnected,
                                request: JSON.parse(e.data).request,
                            },
                            type: 'MODIFICATION_FRIENDS',
                        })
                    )
                }
                else if (JSON.parse(e.data).type === 'challenge') {
                    console.log(JSON.parse(e.data), 'onWeb')
                    store.dispatch(
                        onModificationDefyFriend({
                            defyFriend: {
                                stateModal: true,
                                infoFriend: JSON.parse(e.data).username,
                            },
                            type: 'MODIFICATION_DEFY_FRIEND',
                        })
                    )
                }
            }
        }

        this.WS.onerror = (error: WebSocketErrorEvent) => {
            console.error(error.message)
        }

        return this.WS
    }

    getWs() {
        return this.WS
    }
}

const wsService = new WsService()

export default wsService
