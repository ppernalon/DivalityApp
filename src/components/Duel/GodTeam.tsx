import React, { useEffect, useState } from 'react'
import { Circle, ClipPath, Defs, Image, Rect, Text } from 'react-native-svg'
import CardServices from 'services/CardServices'

type GodTeam = {
    tileHeight: number
    tileWidth: number
    rayon: number
    godTeam: {god: string, maxLife: number, currentLife: number}[]
    isOpponent: boolean
}

const GodTeam = ({ tileHeight, tileWidth, rayon, godTeam, isOpponent }: GodTeam) => {
    const getGodData = () => isOpponent ? GodTeam.opponentGodsData(godTeam, tileWidth, tileHeight) : GodTeam.myGodsData(godTeam, tileWidth, tileHeight)

    const keyId = isOpponent ? 'opponentGodTeam' : 'myGodTeam'
    const [godData, setGodData] = useState<{[godname: string]: {x: number, y: number, image: any, maxLife: number, currentLife: number}}>(getGodData())

    useEffect(() => {
        setTimeout(() => setGodData(getGodData()), 2000) // timebetweenattack - 1s
    }, [godTeam, tileHeight, tileWidth])

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
                                width={2*rayon}
                                height={10}
                                fill={"red"}
                            />
                            <Rect
                                x={data.x} 
                                y={data.y + 2*rayon + 10}
                                width={2*rayon * data.currentLife / data.maxLife}
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
        // miroir de MyTeam
        if (index === 0) thisGodData = {x: 2*tileWidth, y: 0 + tileHeight/5}
        if (index === 1) thisGodData = {x: 3*tileWidth - 5, y: tileHeight + tileHeight/5}
        if (index === 2) thisGodData = {x: tileWidth + 5, y: tileHeight + tileHeight/5}
        if (index === 3) thisGodData = {x: 4*tileWidth - 10, y: 2*tileHeight + tileHeight/5}
        if (index === 4) thisGodData = {x: 2*tileWidth, y: 2*tileHeight + tileHeight/5}
        if (index === 5) thisGodData = {x: 10, y: 2*tileHeight + tileHeight/5}
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
        if (index === 1) thisGodData = {x: tileWidth + 5, y: 5*tileHeight - tileHeight/5}
        if (index === 2) thisGodData = {x: 3*tileWidth - 5, y: 5*tileHeight - tileHeight/5}
        if (index === 3) thisGodData = {x: 10, y: 4*tileHeight - tileHeight/5}
        if (index === 4) thisGodData = {x: 2*tileWidth, y: 4*tileHeight - tileHeight/5}
        if (index === 5) thisGodData = {x: 4*tileWidth - 10, y: 4*tileHeight - tileHeight/5}
        
        thisGodData.image = image
        thisGodData.maxLife = teamMember.maxLife
        thisGodData.currentLife = teamMember.currentLife
        godData[godId] = thisGodData
    })

    return godData
}



export default GodTeam