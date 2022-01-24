import {createSlice} from '@reduxjs/toolkit'

export const usernameSlice = createSlice({
    name: 'username',
    initialState: {
        value: '',
    },
    reducers: {
        onConnect: (state, action) =>{
            if (action.payload.type === 'ON_CONNECT') {
                state.value = action.payload.username
            }
        },
        onDisconnect: (state, action) => {
            if (action.payload.type === 'ON_DISCONNECT') {
                state.value = ''
            }
        },
    },
})

export const {onConnect, onDisconnect} = usernameSlice.actions
export const selectUsername = (state: any) => state.username.value

export default usernameSlice.reducer
