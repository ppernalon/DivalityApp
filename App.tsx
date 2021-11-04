import React from 'react'
import {
  View,
} from 'react-native'
import { globalStyle } from './src/GlobalStyle'
import SignIn from './src/pages/SignIn/SignIn'

const App = () => {
  return (
    <View style={globalStyle.appBackground}>
      <SignIn/>
    </View>
  );
};

export default App
