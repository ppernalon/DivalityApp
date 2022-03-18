import wsService from "ws-services/WsService"

const CardServices = () => {}

CardServices.getPantheonByName = (name: string): string => {
    let pantheon
    switch (name.toLocaleLowerCase()) {
        case "anubis":
        case "bastet":
        case "horus":
        case "osiris":
            pantheon = 'egyptian'  
            break
        case "athena":
        case "hades":
        case "poseidon":
        case "zeus":
            pantheon = 'greek'  
            break
        case "hel":
        case "odin":
        case "thor":
        case "ymir":
        default:
            pantheon = 'nordic'
            break
    }
    return pantheon
}

CardServices.getCardByName = (name: string) => {
    console.log("try", name)
    const ws = wsService.getWs()
    const cardData = {
        pantheon: CardServices.getPantheonByName(name),
        life: 0,
        armor: 0,
        power: 0,
        speed: 0,
        ability: "",
        uri: CardServices.getImageByName(name)
    }
    ws.send(JSON.stringify({
        type: "card",
        cardName: name
    }))
    ws.onmessage = (e: any) => {
        console.log(e, "cardData")
        if(JSON.parse(e.data).type == "card" ){
            console.log(JSON.parse(e.data))
            const dataTemp = JSON.parse(e.data)
            cardData.life = dataTemp.life
            cardData.armor = dataTemp.armor
            cardData.power = dataTemp.power
            cardData.speed = dataTemp.speed
            cardData.ability = dataTemp.description
        }
    }


    return new Promise((resolve) => {
        setTimeout(() => resolve(cardData), 1000)
    })
}

CardServices.getImageByName = (name: string) => {
    let uri: NodeRequire

    switch (name.toLocaleLowerCase()) {
        case 'anubis':
            uri = require("@images/gods/anubis.jpg")
            break
        
        case 'athena':
            uri = require("@images/gods/athena.jpg")
            break

        case 'bastet':
            uri = require("@images/gods/bastet.jpg")
            break

        case 'hades':
            uri = require("@images/gods/hades.jpg")
            break
    
        case 'hel':
            uri = require("@images/gods/hel.jpg")
            break
        
        case 'horus':
            uri = require("@images/gods/horus.jpg")
            break

        case 'odin':
            uri = require("@images/gods/odin.jpg")
            break

        case 'osiris':
            uri = require("@images/gods/osiris.jpg")
            break
    
        case 'poseidon':
            uri = require("@images/gods/poseidon.jpg")
            break

        case 'thor':
            uri = require("@images/gods/thor.jpg")
            break
    
        case 'ymir':
            uri = require("@images/gods/ymir.jpg")
            break

        case 'zeus':
        default:
            uri = require("@images/gods/zeus.jpg")
            break
    }

    return uri
}

export default CardServices