import React from 'react'
import {
  View,
} from 'react-native'
import { globalStyle } from './src/GlobalStyle'
import SignIn from './src/pages/SignIn/SignIn'
import { DefaultTheme, ActivityIndicator, Colors, Provider as PaperProvider } from 'react-native-paper'
import { Provider as StoreProvider } from 'react-redux'
import store from './src/store'

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const App = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={theme}>
        <View style={globalStyle.appBackground}>
          <SignIn/>
          <ActivityIndicator animating={true} size={100} color={theme.colors.primary}/>
        </View>
      </PaperProvider>
    </StoreProvider>
  )
}

export default App
