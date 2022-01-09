import {colors} from 'GlobalStyle'
import {StyleSheet, StatusBar} from 'react-native'

export const myCollectionStyles = StyleSheet.create({
    containerPrayDisciples: {
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 4,
        padding: 5,
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
    },
    iconPray:{
        height: 30,
        width: 30,
        marginLeft: 4
    },
    cardCollectionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButtonCloseDialog: {
        position: 'absolute',
        top: -20,
        right: -20,
        backgroundColor: 'white',
    },
})
