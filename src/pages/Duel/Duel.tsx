import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { Text } from "react-native-paper"

type DuelProps = {
    route: any
}

const Duel = ({route}: DuelProps) => {
    const opponent = route.params.opponent
    const [duelStep, setDuelStep] = useState<string>('teamSelection')

    useEffect(() => {
        console.log("connection à " + opponent)
    }, [opponent])

    switch (duelStep) {
        case 'teamSelection':
            return (
                <View>
                    <Text> teamSelection </Text>
                </View>
            )
        case 'godPlacement':
            return (
                <View>
                    <Text> godPlacement </Text>
                </View>
            )
        case 'fighting':
            return (
                <View>
                    <Text> fighting </Text>
                </View>
            )
    }

    return (
        <View>
            <Text style={{color: "red"}}> Error </Text>
        </View>
    )
}

export default Duel