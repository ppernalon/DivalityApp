import { configureFonts, DefaultTheme as DefaultPaperTheme } from 'react-native-paper'
import { DefaultTheme as DefaultNavigationTheme } from '@react-navigation/native'

const fontConfig: any = {
  default: {
    regular: {
      fontFamily: 'Merienda-Bold',
      fontWeight: 'normal'
    },
    medium: {
      fontFamily: 'Merienda-Bold',
      fontWeight: 'normal'
    },
    light: {
      fontFamily: 'OpenSans-Light',
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
      ...DefaultPaperTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
    },
    fonts: configureFonts(fontConfig)
}

export const appTheme = {
  ...DefaultNavigationTheme, 
  colors: {
    ...DefaultNavigationTheme.colors,
     background: 'white'
  },
  fonts: configureFonts(fontConfig)
}

 