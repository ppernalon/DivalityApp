import React from 'react'
import { Circle, ClipPath, Defs, Image, Rect, Text } from 'react-native-svg'
import CardServices from 'services/CardServices'

type GodTeam = {
    tileHeight: number
    tileWidth: number
    isOpponent: boolean
}

const GodTeam = ({ tileHeight, tileWidth, isOpponent }: GodTeam) => {
    const rayon = Math.min(tileHeight, tileWidth)/2
    const keyId = isOpponent ? 'opponentGodTeam' : 'myGodTeam'

    const godTeam = [
        { god: "anubis", maxLife: 150, currentLife: 120 },
        { god: "anubis", maxLife: 150, currentLife: 120 },
        { god: "horus", maxLife: 200, currentLife: 120 },
        { god: "horus", maxLife: 200, currentLife: 120 },
        { god: "anubis", maxLife: 150, currentLife: 120 },
        { god: "zeus", maxLife: 75, currentLife: 120 },
    ]

    const godData = isOpponent ? GodTeam.opponentGodsData(godTeam, tileWidth, tileHeight) : GodTeam.myGodsData(godTeam, tileWidth, tileHeight) 

    return (
        <>
            <Defs>
                {
                    Object.keys(godData).map((godName: string) => {
                        const data = godData[godName]
                        return (
                            <ClipPath key={`${keyId}_clip_${godName}`} id={`${keyId}_clip_${godName}`}>
                                <Circle cx={data.x + rayon} cy={data.y + rayon} r={rayon}/>
                            </ClipPath>
                        )
                    })
                }
            </Defs>
            {
                Object.keys(godData).map((godName: string) => {
                    const data = godData[godName]
                    return (
                        <React.Fragment key={`${keyId}_Image_${godName}`}>
                            <Image
                                x={data.x} 
                                y={data.y} 
                                width={2*rayon} 
                                height={2*rayon} 
                                href={data.image} 
                                clipPath={`url(#${keyId}_clip_${godName})`}
                            />
                            <Rect
                                x={data.x} 
                                y={data.y + 2*rayon + 10}
                                width={tileWidth}
                                height={10}
                                fill={"red"}
                            />
                            <Rect
                                x={data.x} 
                                y={data.y + 2*rayon + 10}
                                width={tileWidth * data.currentLife / data.maxLife}
                                height={10}
                                fill={"green"}
                            />
                            <Text 
                                fontSize={12}
                                x={data.x}
                                y={data.y + 2*rayon + 10 + 25}
                                fill={"black"}
                            > 
                                {data.currentLife}/{data.maxLife} 
                            </Text>
                        </React.Fragment>
                        
                    )
                })
            }
        </>
    )
}

GodTeam.opponentGodsData = (godTeam: {god: string, maxLife: number, currentLife: number}[], tileWidth: number, tileHeight: number) => {
    const godData: {[godname: string]: {x: number, y: number, image: any, maxLife: number, currentLife: number}} = {}
    
    godTeam.forEach((teamMember: {god: string, maxLife: number, currentLife: number}, index: number) => {
        const image = CardServices.getImageByName(teamMember.god)
        const godId: string = `${teamMember.god}_${index}_opponent`
        let thisGodData: any = {}
        if (index === 0) thisGodData = {x: 2*tileWidth, y: 0 + tileHeight/5}
        if (index === 1) thisGodData = {x: tileWidth, y: tileHeight + tileHeight/5}
        if (index === 2) thisGodData = {x: 3*tileWidth, y: tileHeight + tileHeight/5}
        if (index === 3) thisGodData = {x: 0, y: 2*tileHeight + tileHeight/5}
        if (index === 4) thisGodData = {x: 2*tileWidth, y: 2*tileHeight + tileHeight/5}
        if (index === 5) thisGodData = {x: 4*tileWidth, y: 2*tileHeight + tileHeight/5}
        thisGodData.image = image
        thisGodData.maxLife = teamMember.maxLife
        thisGodData.currentLife = teamMember.currentLife
        godData[godId] = thisGodData
    })

    return godData
}

GodTeam.myGodsData = (godTeam: {god: string, maxLife: number, currentLife: number}[], tileWidth: number, tileHeight: number) => {
    const godData: {[godname: string]: {x: number, y: number, image: any, maxLife: number, currentLife: number}} = {}
    
    godTeam.forEach((teamMember: {god: string, maxLife: number, currentLife: number}, index: number) => {
        const image = CardServices.getImageByName(teamMember.god)
        const godId: string = `${teamMember.god}_${index}_mygods`
        let thisGodData: any = {}

        if (index === 0) thisGodData = {x: 2*tileWidth, y: 6*tileHeight - tileHeight/5}
        if (index === 1) thisGodData = {x: tileWidth, y: 5*tileHeight - tileHeight/5}
        if (index === 2) thisGodData = {x: 3*tileWidth, y: 5*tileHeight - tileHeight/5}
        if (index === 3) thisGodData = {x: 0, y: 4*tileHeight - tileHeight/5}
        if (index === 4) thisGodData = {x: 2*tileWidth, y: 4*tileHeight - tileHeight/5}
        if (index === 5) thisGodData = {x: 4*tileWidth, y: 4*tileHeight - tileHeight/5}
        
        thisGodData.image = image
        thisGodData.maxLife = teamMember.maxLife
        thisGodData.currentLife = teamMember.currentLife
        godData[godId] = thisGodData
    })

    return godData
}



export default GodTeam