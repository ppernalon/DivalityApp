import { StyleSheet } from "react-native"

export const menuStyle = StyleSheet.create({
    containerMenu: {
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
    },
    containerButtons: {
        paddingTop: 40,
        paddingBottom: 40,
        flex: 1,
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
        bottom: 10,
        width: "100%",
    },
})