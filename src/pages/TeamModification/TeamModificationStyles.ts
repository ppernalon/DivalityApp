import {colors} from 'GlobalStyle'
import {StyleSheet} from 'react-native'

export const teamModificationStyles = StyleSheet.create({
    secondRowTeamContainer: {
        flexWrap: 'wrap',
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imageDivinityButton: {
        height: 70,
        width: 70,
        margin: 7,
    },
    imageDivinity: {
        height: 70,
        width: 70,
        resizeMode: 'contain',
    },
    pencilIcon:{
        height: 60,
        width: 60,
        padding:10,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 0,
        position:'absolute'
    },
    emptyDivinity: {
        backgroundColor: colors.blueSky,
        height: 55,
        width: 55,
        margin: 3,
    },
    editButtonImage: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
        marginRight: 12,
    },
})
