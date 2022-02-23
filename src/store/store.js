import { configureStore } from '@reduxjs/toolkit'
import disciplesReducer from './reducers/DisciplesSlice'
import usernameReducer from './reducers/UsernameSlice'
import friendsReducer from './reducers/FriendsSlice'

export default configureStore({
  reducer: {
    disciples: disciplesReducer,
    username: usernameReducer,
    friends: friendsReducer
  }
})