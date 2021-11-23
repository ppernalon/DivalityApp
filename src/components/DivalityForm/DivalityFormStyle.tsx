import { StyleSheet } from "react-native"
import { colors } from "../../GlobalStyle"

export const divalityFormStyle = StyleSheet.create({
    formInput: {
        marginTop: 30,
        backgroundColor: "#fff",
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowOpacity: 0.2,
        shadowRadius: 5.46,
        elevation: 10
    },
    buttonRow: {
        marginTop: 30,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    formError: {
        marginTop: 30,
        text: {
            color: colors.errorRed
        }
    }
})