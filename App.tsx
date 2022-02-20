import React, { useEffect, useRef } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import {paperTheme, appTheme} from './src/PaperTheme'
import SignIn from './src/pages/SignIn/SignIn'
import Menu from './src/pages/Menu/Menu'
import SignUp from './src/pages/SignUp/SignUp'
import MyCollection from './src/pages/MyCollection/MyCollection'
import MyTeams from './src/pages/MyTeams/MyTeams'
import AuctionHouse from './src/pages/AuctionHouse/AuctionHouse'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'
import store from './src/store/store'
import TeamModification from './src/pages/TeamModification/TeamModification'
import Duel from './src/pages/Duel/Duel'

import FightingScreen from '@components/Duel/FightingScreen/FightingScreen'

const App = () => {
	const Stack = createNativeStackNavigator()

	return (
		<Provider store={store}>
			<PaperProvider theme={paperTheme}>
				<NavigationContainer theme={appTheme}>
					<Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown: false}}>
						<Stack.Screen name="SignIn" component={SignIn}/>
						<Stack.Screen name="SignUp" component={SignUp}/>
						<Stack.Screen name="Menu" component={Menu}/>
						<Stack.Screen name="TeamModification" component={TeamModification}/>

						<Stack.Screen name="Duel" component={Duel}/>
						<Stack.Screen name="Collection" component={MyCollection}/>
						<Stack.Screen name="Teams" component={MyTeams}/>
						<Stack.Screen name="Trade" component={AuctionHouse}/>
						<Stack.Screen name="Ranking" component={Menu}/>
					</Stack.Navigator>
				</NavigationContainer>
			</PaperProvider>

			{/* <FightingScreen myTeam={[""]} opponentTeam={[""]}/> */}
	 	</Provider>
	)
}

export default App
