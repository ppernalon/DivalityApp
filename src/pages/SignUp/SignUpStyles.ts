import { colors } from "GlobalStyle"
import { StyleSheet } from "react-native"

export const signUpStyles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
    },
    DivalityFormContainer:{
        padding: 30,
        zIndex: 1,
        width: "100%"
    },
    ContainerLink: {
       flexDirection: "row",
       marginVertical: 30,
       justifyContent: "center"
    },
    TextNoLink: {
        color: colors.primaryBlue,
        marginRight: 5
    },
    TextLink: {
        color: colors.primaryBlue,
        textDecorationLine : 'underline'
    }
})