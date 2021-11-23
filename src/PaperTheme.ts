import { configureFonts, DefaultTheme } from 'react-native-paper'

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

export default {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
    },
    fonts: configureFonts(fontConfig)
}