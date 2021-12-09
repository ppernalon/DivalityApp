import { StyleSheet } from "react-native"
import { colors } from "../../GlobalStyle"

export const cardStyle = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderWidth: 5,
    },
    cardIsLoading: {
        justifyContent: 'center'
    },
    minimalDim: {
        width: 120,
        height: 170,
    },
    notMinimalDim: {
        width: 290,
        height: 500
    },
    egyptian: {
        borderColor: colors.egyptianYellow
    },
    nordic: {
        borderColor: colors.nordicRed
    },
    greek: {
        borderColor: colors.greekBlue
    },
    imageMinimalDim: {
        width: "100%",
        height: 110, // 120 - broderWidth*2
    },
    imageNotMinimalDim: {
        width: "100%",
        height: 280 // 290 - broderWidth*2
    },
    rarityHeadband: {
        height: 15,
        width: "100%",
        common: {
            start: "#FF0000",
            end: "#FF0AD8"
        }
    },
    name: {
        textAlign: 'center',
    }
})