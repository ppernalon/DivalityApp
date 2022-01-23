import {colors} from 'GlobalStyle'
import {StyleSheet} from 'react-native'

export const teamModificationStyles = StyleSheet.create({
    textColorHeader:{
        color:'white'
    },
    secondRowTeamContainer: {
        flexWrap: 'wrap',
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imageDivinityButton: {
        height: 70,
        width: 70,
        marginVertical: 7,
        marginHorizontal:7
    },
    imageDivinity: {
        height: 70,
        width: 70,
        resizeMode: 'contain',
    },
    pencilIcon:{
        height: 55,
        width: 55,
        padding:10,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 0,
        position:'absolute'
    },
    pencilIconWithoutBorder:{
        height: 55,
        width: 55,
        padding:10,
        position:'absolute'
    },
    emptyDivinity: {
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: colors.blueSky,
        height: 70,
        width: 70,
    },
    editButtonImage: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
        marginRight: 12,
    },
})
