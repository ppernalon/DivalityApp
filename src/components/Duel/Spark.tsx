import React, { useEffect, useState } from "react"
import { Polyline } from "react-native-svg"

type SparkProps = {
    positions: {x: number, y: number}[]
    rayon: number
}

const Spark = ({positions, rayon}: SparkProps) => {
    const [points, setPoints] = useState("")

    useEffect(() => {
        let newPoints = ""
        let previousPos = positions[0]
        positions.forEach(pos => {
            if (previousPos !== pos){
                const nbDeviation = Math.max(20, Math.floor(Math.random() * 100))  // max 100
                for (let i = 0; i <nbDeviation; i++){
                    const randomPoint = Spark.randomPoint(previousPos, pos)
                    const randomX = randomPoint.x + rayon
                    const randomY = randomPoint.y + rayon
                    if (!(isNaN(randomX) || isNaN(randomY))){
                        newPoints += `${randomX},${randomY} `
                    }
                }
            }
            newPoints += `${pos.x + rayon},${pos.y + rayon} `
            previousPos = pos
        })
        setPoints(newPoints)
    }, [positions])

    return (
        <Polyline
            points={points}
            fill="none"
            stroke="rgb(20,100,230)"
            strokeWidth="5"
        />
    )
}

Spark.lineFun = (pos1: {x: number, y: number}, pos2: {x: number, y: number}) => {
    // y = ax + b
    const dx = (pos1.x - pos2.x)
    const a = (pos1.y - pos2.y) / (pos1.x - pos2.x)
    const b = pos1.y - a*pos1.x
    return (x: number) => a*x + b
}

Spark.randomPoint = (pos1: {x: number, y: number}, pos2: {x: number, y: number}) => {
    const afine = Spark.lineFun(pos1, pos2)
    const r = Math.random()
    let xRandom = pos1.x + (pos2.x - pos1.x)*r
    let yRandom = afine(xRandom)
    xRandom *= (1 + 0.15*(Math.random() - 0.5))
    // yRandom *= (1 + 0.05*(Math.random() - 0.5))
    return {x: xRandom, y: yRandom}
}

export default Spark