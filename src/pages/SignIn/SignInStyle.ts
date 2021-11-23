import { StyleSheet } from "react-native"

export const signInStyles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
    },
    LoadingHomeContainer: {
        position: 'absolute',
        zIndex: 2, 
        top: 0,
        left: 0,
        width: '100%', 
        height: '100%'
    },
    DivalityFormContainer: {
        zIndex: 1
    }
})