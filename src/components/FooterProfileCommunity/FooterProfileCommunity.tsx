import React from "react"
import { View, Image, TouchableOpacity } from "react-native"
import { FooterStyle } from "./FooterProfileCommunityStyle"

const FooterProfileCommunity = () => {
    return (
        <View style={FooterStyle.container}>
            <TouchableOpacity onPress={() =>{}}>
                <Image source={require('@images/profile.png')} style={FooterStyle.imageProfileCommunity}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>{}}>
                <Image source={require('@images/community.png')} style={FooterStyle.imageProfileCommunity}/>
            </TouchableOpacity>
    </View>
    )
}

export default FooterProfileCommunity