import { colors } from "GlobalStyle"
import { StyleSheet } from "react-native"

export const divalityFormStyle = StyleSheet.create({
    containerView:{
        width:'100%',
        alignItems: "center",
        justifyContent: "center",
    },
    containerButton:{
        width:'100%',
        margin: 5
    },
    
    backgroundButton:{
        width:'100%',
        alignItems: "center",
        borderRadius: 5,
        overflow:"hidden",
        padding: 2
    },
    backgroundCancelButton:{
        width:'100%',
        alignItems: "center",
        justifyContent:'center',
        borderRadius: 5,
        borderColor: colors.blueSky,
        borderWidth:2,
    }
})