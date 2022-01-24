import constants from './../constants'
import {initialisationOnConnection} from '../components/Disciples/DisciplesSlice'
import store from '../store/store'

class WsService {
    WS: any = null

    openWs() {
        this.WS = new WebSocket(`ws://${constants.API_URL}/connection`)

        this.WS.onopen = () => {
            console.log('websocket ouverte')
            this.WS.send(
                JSON.stringify({
                    type: 'connection',
                    username: 'test2',
                })
            )
            this.WS.send(
                JSON.stringify({
                    type: 'disciples',
                    username: 'test2',
                })
            )
            this.WS.onmessage = (e: any) => {
                if (JSON.parse(e.data).type === "disciples"){
                    store.dispatch(initialisationOnConnection({number: parseInt(JSON.parse(e.data).disciples), type: 'INITIALISATION_DISCIPLES'}))
                }
            }
        }
        return this.WS
    }

    getWs() {
        return this.WS
    }
}

const wsService = new WsService()

export default wsService
