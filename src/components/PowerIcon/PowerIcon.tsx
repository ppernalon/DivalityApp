import React from "react"
import { Image, TouchableOpacity } from "react-native"
import { powerIconStyle } from "./PowerIconStyle"

const PowerIcon = () => {
    return (
        <TouchableOpacity onPress={() =>{}}>
            <Image source={require('@images/power.png')} style={powerIconStyle.powerImage}/>
        </TouchableOpacity>
    )
}

export default PowerIcon