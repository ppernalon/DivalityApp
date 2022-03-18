import { configureStore } from '@reduxjs/toolkit'
import disciplesReducer from './reducers/DisciplesSlice'
import usernameReducer from './reducers/UsernameSlice'
import friendsReducer from './reducers/FriendsSlice'
import defyFriendReducer from './reducers/DefyFriendSlice'
import errorToDisplayReducer from './reducers/ErrorToDisplaySlice'
import deconnectionStateReducer from './reducers/DeconnectionStateSlice'


export default configureStore({
  reducer: {
    disciples: disciplesReducer,
    username: usernameReducer,
    friends: friendsReducer,
    defyFriend: defyFriendReducer,
    errorToDisplay: errorToDisplayReducer,
    deconnectionState: deconnectionStateReducer
  }
})