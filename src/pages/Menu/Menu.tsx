import Disciples from "components/Disciples/Disciples"
import DivalityButtonTextured from "components/DivalityButtonTextured/DivalityButtonTextured"
import FooterProfileCommunity from "components/FooterProfileCommunity/FooterProfileCommunity"
import HeaderTextured from "components/HeaderTextured/HeaderTextured"
import PowerIcon from "components/PowerIcon/PowerIcon"
import React from "react"
import {
    View
} from "react-native"
import { menuStyle } from "./MenuStyle"

type MenuProps = {
    navigation: any
}
const widthButtons = "70%"
const Menu = ({navigation} : MenuProps) => {
    return (
       <View  style={menuStyle.containerMenu}>
           <HeaderTextured>
               <View style={menuStyle.header}>
                   <Disciples/>
                   <PowerIcon/>
               </View>
           </HeaderTextured>
           <View style={menuStyle.containerButtons}>
                <DivalityButtonTextured label={"CHERCHER UNE PARTIE"} onSubmit={() => {}} width={widthButtons} />
                <DivalityButtonTextured label={"MA COLLECTION"} onSubmit={() => (navigation.navigate('Collection'))} width={widthButtons} />
                <DivalityButtonTextured label={"MES ÉQUIPES"} onSubmit={() => (navigation.navigate('Teams'))} width={widthButtons} />
                <DivalityButtonTextured label={"HOTEL DES VENTES"} onSubmit={() => (navigation.navigate('Trade'))} width={widthButtons} />
                <DivalityButtonTextured label={"CLASSEMENT"} onSubmit={() => (navigation.navigate('Ranking'))} width={widthButtons} />
           </View>
           <View style={menuStyle.footer}>
               <FooterProfileCommunity/>
            </View>
       </View>
    )
}


export default Menu