import { DefaultTheme } from 'react-native-paper'

const paperTheme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#3498db',
      accent: '#f1c40f',
    },
}

export default paperTheme