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
    },
    square: {
        backgroundColor: '#41BAF1', 
        width: 20, 
        height: 20, 
        transform: [{rotate: "45deg"}]
    },
    arrowRight: {
        width: 0, 
        height: 0,         
        borderStyle: 'solid',
        borderLeftWidth: 17, 
        borderLeftColor: 'red', 
        borderTopWidth: 12, 
        borderTopColor:'transparent',
        borderBottomWidth: 12, 
        borderBottomColor:'transparent'
    },
    arrowUp: {
        width: 0, 
        height: 0,         
        borderStyle: 'solid',
        borderLeftWidth: 12, 
        borderLeftColor: 'transparent', 
        borderRightWidth: 12, 
        borderRightColor:'transparent',
        borderBottomWidth: 17, 
        borderBottomColor:'purple'
    },
    dot: {
        backgroundColor: 'green', 
        width: 20, 
        height: 20, 
        borderRadius: 100
    },
    cardAttributes: {
        flexDirection: "row",
        marginTop: 5,
        width: 60
    },
    cardAttributesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between",
        width: 175,
        
    }
})