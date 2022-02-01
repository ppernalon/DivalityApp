import {colors} from 'GlobalStyle'
import {StyleSheet} from 'react-native'

export const auctionHouseStyles = StyleSheet.create({
    containerCurrentUnderPage: {
    },
    buttonCurrentUnderPage: {
        width: '50%',
        paddingVertical: 10,
    },
    buttonCurrentUnderPageInactive: {
        color: colors.blueSkyInactive,
        height: '100%',
    },
    buttonCurrentUnderPageActive: {
        color: colors.blueSky,
        height: '100%',
    },
})
