import DivalityButtonTextured from "@components/DivalityButtonTextured/DivalityButtonTextured"
import { colors } from "GlobalStyle"
import React from "react"
import { View } from "react-native"
import { ActivityIndicator, Title } from "react-native-paper"

type MatchmakingLoaderProps = {
    onCancel: Function
    label: string
}

const MatchmakingLoader = ({onCancel, label}: MatchmakingLoaderProps) => {
    return (
        <View style={{backgroundColor: "white", padding: 40, width: "80%", borderRadius: 5, alignItems: "center"}}>
            <Title style={{color: colors.blueSky, textAlign: "center", fontSize: 23}}>{label}</Title>
            <ActivityIndicator size={'large'} color={colors.blueSky} style={{marginVertical: 30}}/>
            <DivalityButtonTextured label={'ANNULER'} onSubmit={() => onCancel()} width={"80%"}/>            
        </View>
    )
}

export default MatchmakingLoader