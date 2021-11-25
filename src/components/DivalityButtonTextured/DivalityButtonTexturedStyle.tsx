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
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 5,
    }
})