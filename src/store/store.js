import { configureStore } from '@reduxjs/toolkit'
import disciplesReducer from 'components/Disciples/DisciplesSlice'
import wsReducer from '../ws-services/WsSlice'

export default configureStore({
  reducer: {
    disciples: disciplesReducer,
    ws: wsReducer
  }
})