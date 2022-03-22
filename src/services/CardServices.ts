import wsService from 'ws-services/WsService'

const CardServices = () => {}

CardServices.getPantheonByName = (name: string): string => {
    let pantheon
    switch (name.toLocaleLowerCase()) {
        case 'anubis':
        case 'bastet':
        case 'horus':
        case 'osiris':
        case 'amon':
        case 'hathor':
        case 'isis':
        case 'ptah':
        case 'ra':
            pantheon = 'egyptian'
            break
        case 'ares':
        case 'artemis':
        case 'demeter':
        case 'hephaitos':
        case 'hera':
        case 'hestia':
        case 'athena':
        case 'hades':
        case 'poseidon':
        case 'zeus':
            pantheon = 'greek'
            break
        case 'hel':
        case 'odin':
        case 'thor':
        case 'ymir':
        case 'baldr':
        case 'freyr':
        case 'frigg':
        case 'loki':
        case 'njor':
        case 'skadi':
        default:
            pantheon = 'nordic'
            break
    }
    return pantheon
}

CardServices.getCardByName = (name: string) => {
    const ws = wsService.getWs()
    const cardData = {
        pantheon: CardServices.getPantheonByName(name),
        life: 0,
        armor: 0,
        power: 0,
        speed: 0,
        ability: '',
        uri: CardServices.getImageByName(name),
    }
    ws.send(
        JSON.stringify({
            type: 'card',
            cardName: name,
        })
    )
    ws.onmessage = (e: any) => {
        if (JSON.parse(e.data).type == 'card') {
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
    const stringUri = '@images/gods/' + ' ' + name.toLocaleLowerCase() + '.jpg'

    switch (name.toLocaleLowerCase()) {
        case 'anubis':
            uri = require('@images/gods/anubis.jpg')
            break

        case 'athena':
            uri = require('@images/gods/athena.jpg')
            break

        case 'bastet':
            uri = require('@images/gods/bastet.jpg')
            break

        case 'hades':
            uri = require('@images/gods/hades.jpg')
            break

        case 'hel':
            uri = require('@images/gods/hel.jpg')
            break

        case 'horus':
            uri = require('@images/gods/horus.jpg')
            break

        case 'odin':
            uri = require('@images/gods/odin.jpg')
            break

        case 'osiris':
            uri = require('@images/gods/osiris.jpg')
            break

        case 'poseidon':
            uri = require('@images/gods/poseidon.jpg')
            break

        case 'thor':
            uri = require('@images/gods/thor.jpg')
            break

        case 'ymir':
            uri = require('@images/gods/ymir.jpg')
            break

        case 'zeus':
            uri = require('@images/gods/zeus.jpg')
            break
        case 'amon':
            uri = require('@images/gods/amon.jpg')
            break

        case 'hathor':
            uri = require('@images/gods/hathor.jpg')
            break
        case 'isis':
            uri = require('@images/gods/isis.jpg')
            break
        case 'ptah':
            uri = require('@images/gods/ptah.jpg')
            break
        case 'ra':
            uri = require('@images/gods/ra.jpg')
            break
        case 'ares':
            uri = require('@images/gods/ares.jpg')
            break
        case 'artemis':
            uri = require('@images/gods/artemis.jpg')
            break
        case 'demeter':
            uri = require('@images/gods/demeter.jpg')
            break
        case 'hephaitos':
            uri = require('@images/gods/hephaitos.jpg')
            break
        case 'hera':
            uri = require('@images/gods/hera.jpg')
            break
        case 'hestia':
            uri = require('@images/gods/hestia.jpg')
            break
        case 'baldr':
            uri = require('@images/gods/baldr.jpg')
            break
        case 'freyr':
            uri = require('@images/gods/freyr.jpg')
            break
        case 'frigg':
            uri = require('@images/gods/frigg.jpg')
            break
        case 'loki':
            uri = require('@images/gods/loki.jpg')
            break
        case 'njor':
            uri = require('@images/gods/njor.jpg')
            break
        case 'skadi':
            uri = require('@images/gods/skadi.jpg')
            break
        default:
            uri = require('@images/gods/zeus.jpg')
            break
    }

    return uri
}

export default CardServices
