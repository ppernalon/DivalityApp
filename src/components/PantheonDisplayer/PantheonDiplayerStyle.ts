import {StyleSheet} from 'react-native'

export const pantheonDiplayerStyle = StyleSheet.create({
    numberOccurencesContainer: {
        position: 'absolute',
        bottom: -10,
        right: -10,
        borderRadius: 1500,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    animationNewCard: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        zIndex: 5,
        transform: [
            {
                translateY: -50,
            },
            {
                translateX: -50,
            },
            {
                scale: 2,
            },
        ],
    },
})
