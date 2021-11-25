import { StyleSheet } from "react-native"

export const menuStyle = StyleSheet.create({
    containerMenu: {
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
    },
    containerButtons: {
        height: "70%",
        justifyContent: "space-between",
        alignItems: "center",
    },
    header: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    footer: {
        width: "100%",
        bottom: 10
    },
})