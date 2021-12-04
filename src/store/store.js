import { configureStore } from '@reduxjs/toolkit'
import disciplesReducer from 'components/Disciples/DisciplesSlice'

export default configureStore({
  reducer: {
    disciples: disciplesReducer
  }
})