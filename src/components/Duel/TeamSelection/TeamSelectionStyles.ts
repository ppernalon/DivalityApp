import {colors} from 'GlobalStyle'
import {StyleSheet} from 'react-native'

export const teamSelectionStyles = StyleSheet.create({
    buttonTeamContainer: {
        width: '55%',
        marginTop: 17,
    },
    firstRowTeamContainer: {
        alignItems:'center',
        flexDirection: 'row',
        marginBottom: 15,
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
