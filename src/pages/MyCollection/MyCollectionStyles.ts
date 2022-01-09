import { colors } from "GlobalStyle"
import { StyleSheet, StatusBar} from "react-native"

export const myCollectionStyles = StyleSheet.create({
    cardCollectionContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconButtonCloseDialog: {
        position: 'absolute',
        top: -20,
        right: -20,
        backgroundColor: 'white',
    }
})