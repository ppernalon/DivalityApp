class WsService {
    WS: any = null

    constructor() {
        // this.openWs()
    }

    openWs() {
        this.WS = new WebSocket('ws://10.0.2.2:5000/connection')
        console.log('websocket ouverte')
        return this.WS
    }

    getWs() {
        return this.WS
    }
}

const wsService = new WsService()

export default wsService
