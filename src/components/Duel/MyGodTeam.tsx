import React from 'react'
import { Circle, ClipPath, Defs, Image } from 'react-native-svg'
import CardServices from 'services/CardServices'

type MyGodTeamProps = {
    tilesSize: number
}

const MyGodTeam = ({ tilesSize: tileSize }: MyGodTeamProps) => {

    const myTeam = [
        "anubis",
        "anubis",
        "horus",
        "horus",
        "anubis",
        "zeus"
    ]

    const godData: {[godname: string]: {x: number, y: number, image: any}} = {}
    
    myTeam.forEach((godName: string, index: number) => {
        const image = CardServices.getImageByName(godName)
        if (index === 0) godData[`${godName}_${index}`] = {x: 2*tileSize, y: 0, image: image}
        if (index === 1) godData[`${godName}_${index}`] = {x: tileSize, y: tileSize + 30, image: image}
        if (index === 2) godData[`${godName}_${index}`] = {x: 3*tileSize, y: tileSize + 30, image: image}
        if (index === 3) godData[`${godName}_${index}`] = {x: 0, y: 2*tileSize + 60, image: image}
        if (index === 4) godData[`${godName}_${index}`] = {x: 2*tileSize, y: 2*tileSize + 60, image: image}
        if (index === 5) godData[`${godName}_${index}`] = {x: 4*tileSize, y: 2*tileSize + 60, image: image}
    })

    return (
        <>
            <Defs>
                {
                    Object.keys(godData).map((godName: string) => {
                        const data = godData[godName]
                        return (
                            <ClipPath key={`myGodTeam_clip_${godName}`} id={`clip_${godName}`}>
                                <Circle cx={data.x + tileSize/2} cy={data.y + tileSize/2} r={tileSize/2}/>
                            </ClipPath>
                        )
                    })
                }
            </Defs>
            {
                Object.keys(godData).map((godName: string) => {
                    const data = godData[godName]
                    return (
                        <Image
                            key={`myGodTeam_Image_${godName}`}
                            x={data.x} 
                            y={data.y} 
                            width={tileSize} 
                            height={tileSize} 
                            href={data.image} 
                            clipPath={`url(#clip_${godName})`}
                        />
                    )
                })
            }
        </>

    )
}

export default MyGodTeam