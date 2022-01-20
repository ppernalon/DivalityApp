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
        height: 50,
        width: 50,
        marginVertical: 10,
        marginHorizontal:10
    },
    imageDivinity: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
    },
    pencilIcon:{
        height: 40,
        width: 40,
        padding:10,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 0,
        position:'absolute'
    },
    pencilIconWithoutBorder:{
        height: 50,
        width: 50,
        padding:10,
        position:'absolute'
    },
    emptyDivinity: {
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: colors.blueSky,
        height: 50,
        width: 50,
    },
    editButtonImage: {
        resizeMode: 'contain',
        width: 25,
        height: 25,
        marginRight: 12,
    },
})
