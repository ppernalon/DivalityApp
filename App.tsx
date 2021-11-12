import React from 'react'
import {
  View,
} from 'react-native'
import { globalStyle } from './src/GlobalStyle'
import { Provider as PaperProvider } from 'react-native-paper'
import paperTheme from './src/PaperTheme'
import { Provider as StoreProvider } from 'react-redux'
import store from './src/store'

const App = () => {
  return (
    <StoreProvider store={store}>
      <PaperProvider theme={paperTheme}>
        <View style={globalStyle.appBackground}>
        </View>
      </PaperProvider>
    </StoreProvider>
  )
}

export default App
