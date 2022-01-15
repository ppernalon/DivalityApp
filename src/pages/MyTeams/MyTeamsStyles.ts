import {colors} from 'GlobalStyle'
import {StyleSheet, StatusBar} from 'react-native'

export const myTeamsStyles = StyleSheet.create({
    buttonTeamContainer: {
        width: '70%',
        marginVertical: 20,
    },
    firstRowTeamContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    secondRowTeamContainer:{
        flexWrap: 'wrap',
        marginLeft: 47,
        flexDirection: 'row',
    },
    imageDivinity: {
        height: 60,
        width: 60,
        margin: 3
    },
    teamNameText: {
        color: colors.primaryBlue,
        fontSize: 22,
    },
    editButtonImage: {
        resizeMode: 'contain',
        width: 30,
        height: 30,
        marginRight: 12,
    },
})
