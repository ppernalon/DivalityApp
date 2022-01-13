import { createSlice } from '@reduxjs/toolkit'


let socket = new WebSocket('ws://10.0.2.2:5000/connection')


export const wsSlice = createSlice({
  name: 'ws',
  initialState: {
    value: socket
  }
})

export const selectWs = state => state.ws.value

export default wsSlice.reducer