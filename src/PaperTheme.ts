import { configureFonts, DefaultTheme as DefaultPaperTheme } from 'react-native-paper'
import { DefaultTheme as DefaultNavigationTheme } from '@react-navigation/native'

const fontConfig: any = {
  default: {
    regular: {
      fontFamily: 'Merienda-Regular',
      fontWeight: 'normal'
    },
    bold: {
      fontFamily: 'Merienda-Bold',
      fontWeight: 'normal'
    }
  }
}

fontConfig.ios = fontConfig.default
fontConfig.android = fontConfig.default

export const paperTheme = {
    ...DefaultPaperTheme,
    roundness: 2,
    colors: {
<<<<<<< HEAD
      ...DefaultPaperTheme.colors,
      primary: '#3498db',
=======
      ...DefaultTheme.colors,
      primary: colors.primaryBlue,
>>>>>>> 7080b1d (one error can be displayed)
      accent: '#f1c40f',
    },
    fonts: configureFonts(fontConfig)
}

export const appTheme = {
  ...DefaultNavigationTheme, 
  colors: {
    ...DefaultNavigationTheme.colors,
     background: 'white'
  }
}

 