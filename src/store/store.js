import { configureStore } from '@reduxjs/toolkit'
import disciplesReducer from './reducers/DisciplesSlice'
import usernameReducer from './reducers/UsernameSlice'

export default configureStore({
  reducer: {
    disciples: disciplesReducer,
    username: usernameReducer
  }
})