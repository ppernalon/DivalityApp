import React from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import {paperTheme, appTheme} from './src/PaperTheme'
import SignIn from './src/pages/SignIn/SignIn'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import DivalityLogo from './src/components/DivalityLogo/DivalityLogo'

const App = () => {
  const Stack = createNativeStackNavigator()
  return (
    // <StoreProvider store={store}>
      <PaperProvider theme={paperTheme}>
<<<<<<< HEAD
        <NavigationContainer theme={appTheme}>
          <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown: false}}>
            <Stack.Screen name="SignIn" component={SignIn}/>
            <Stack.Screen name="Logo" component={DivalityLogo}/>
          </Stack.Navigator>
        </NavigationContainer>
=======
        <LinearGradient colors={[colors.blueSky, colors.lightBlueSky]} style={globalStyle.appBackground}>
          <SignIn/>
        </LinearGradient>
>>>>>>> 6549614 (merging ...)
      </PaperProvider>
    // </StoreProvider>
  )
}

export default App
