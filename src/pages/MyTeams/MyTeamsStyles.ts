import {colors} from 'GlobalStyle'
import {StyleSheet, StatusBar} from 'react-native'

export const myTeamsStyles = StyleSheet.create({
    buttonTeamContainer: {
        width: '70%',
        marginTop: 17,
    },
    firstRowTeamContainer: {
        alignItems:'center',
        flexDirection: 'row',
        marginBottom: 15,
    },
    secondRowTeamContainer:{
        flexWrap: 'wrap',
        marginLeft: 47,
        flexDirection: 'row',
    },
    imageDivinity: {
        height: 55,
        width: 55,
        margin: 3
    },
    emptyDivinity:{
        backgroundColor: colors.blueSky,
        height: 55,
        width: 55,
        margin: 3
    },
    emptyDivinityRed:{
        backgroundColor: colors.errorRed,
        height: 55,
        width: 55,
        margin: 3
    },
    teamNameText: {
        color: colors.primaryBlue,
        fontSize: 22,
    },
    editButtonImage: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
        marginRight: 12,
    },
})
