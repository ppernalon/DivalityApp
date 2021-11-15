import { DefaultTheme as DefaultPaperTheme } from 'react-native-paper'
import { DefaultTheme as DefaultNavigationTheme } from '@react-navigation/native';


export const paperTheme = {
    ...DefaultPaperTheme,
    roundness: 2,
    colors: {
      ...DefaultPaperTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
    },
}

export const appTheme = {
  ...DefaultNavigationTheme, 
  colors: {
    ...DefaultNavigationTheme.colors,
     background: 'white'
    }
}

 