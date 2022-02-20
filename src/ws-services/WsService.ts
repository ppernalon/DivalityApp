import constants from './../constants'
import {initialisationOnConnection} from '../store/reducers/DisciplesSlice'
import store from '../store/store'

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
                if (JSON.parse(e.data).type === "disciples"){
                    store.dispatch(initialisationOnConnection({number: parseInt(JSON.parse(e.data).disciples), type: 'INITIALISATION_DISCIPLES'}))
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
