import React, { useEffect, useState } from "react"
import { View } from "react-native"

type TimeLineProps = {
    attacks: any[]
}

const TimeLine = ({attacks}: TimeLineProps) => {
    const [sortedAttacks, setSortedAttacks] = useState(attacks)

    useEffect(() => {
        const newSortedAttacks = attacks
        newSortedAttacks.sort((a1: any, a2: any) => a1.turn - a2.turn)
        setSortedAttacks(newSortedAttacks)
    }, [attacks])

    return (
        <View>
        </View>
    )
}

export default TimeLine