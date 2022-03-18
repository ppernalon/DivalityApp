import React, {useEffect, useRef, useState} from 'react'
import {Provider as PaperProvider, Text} from 'react-native-paper'
import {paperTheme, appTheme} from './src/PaperTheme'
import SignIn from './src/pages/SignIn/SignIn'
import Menu from './src/pages/Menu/Menu'
import SignUp from './src/pages/SignUp/SignUp'
import MyCollection from './src/pages/MyCollection/MyCollection'
import MyTeams from './src/pages/MyTeams/MyTeams'
import AuctionHouse from './src/pages/AuctionHouse/AuctionHouse'

import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {Provider, useDispatch, useSelector} from 'react-redux'
import store from './src/store/store'
import TeamModification from './src/pages/TeamModification/TeamModification'
import Duel from './src/pages/Duel/Duel'
import MyCommunity from './src/pages/MyCommunity/MyCommunity'
import MyProfile from './src/pages/MyProfil/MyProfile'
import Ranking from './src/pages/Ranking/Ranking'
import wsService from 'ws-services/WsService'
import {View} from 'react-native'
import DefyFriendModal from 'components/ModalDivality/DefyFriendModal'
import {selectDefyFriend} from 'store/reducers/DefyFriendSlice'
import ErrorDisplayer from 'components/ErrorDisplayer/ErrorDisplayer'
import DeconnectionModal from 'components/ModalDivality/DeconnectionModal'

const App = () => {
    const Stack = createNativeStackNavigator()

    return (
        <Provider store={store}>
            <PaperProvider theme={paperTheme}>
                <NavigationContainer theme={appTheme}>
                    <DefyFriendModal></DefyFriendModal>
                    <DeconnectionModal></DeconnectionModal>
                    <ErrorDisplayer></ErrorDisplayer>
                    <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown: false}}>
                        <Stack.Screen name="SignIn" component={SignIn}/>
                        <Stack.Screen name="SignUp" component={SignUp} />
                        <Stack.Screen name="Menu" component={Menu} />
                        <Stack.Screen name="TeamModification" component={TeamModification} />
                        <Stack.Screen name="Duel" component={Duel} />
                        <Stack.Screen name="Collection" component={MyCollection} />
                        <Stack.Screen name="Teams" component={MyTeams} />
                        <Stack.Screen name="Trade" component={AuctionHouse} />
                        <Stack.Screen name="Ranking" component={Ranking} />
                        <Stack.Screen name="Community" component={MyCommunity} />
                        <Stack.Screen name="Profile" component={MyProfile} />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </Provider>
    )
}

export default App
