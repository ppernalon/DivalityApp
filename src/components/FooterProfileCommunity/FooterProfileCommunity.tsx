import { useNavigation } from "@react-navigation/native"
import React from "react"
import { View, Image, TouchableOpacity } from "react-native"
import { FooterStyle } from "./FooterProfileCommunityStyle"
type FooterProps = {
}
const FooterProfileCommunity = ({}: FooterProps) => {
    const navigation = useNavigation()
    return (
        <View style={FooterStyle.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Image source={require('@images/profile.png')} style={FooterStyle.imageProfileCommunity}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Community')}>
                <Image source={require('@images/community.png')} style={FooterStyle.imageProfileCommunity}/>
            </TouchableOpacity>
    </View>
    )
}

export default FooterProfileCommunity