import {createSlice} from '@reduxjs/toolkit'

export const friendsSlice = createSlice({
    name: 'friends',
    initialState: {
        value: {connected: [], disconnected: [], request:[]},
    },
    reducers: {
        onModificationFriends: (state, action) =>{
            if (action.payload.type === 'MODIFICATION_FRIENDS') {
                state.value = {
                    connected: [{username: 'testConnected', victory: 10, defeat: 5}],
                    disconnected: [
                        {username: 'testDisconnected', victory: 10, defeat: 5},
                        {username: 'testDisconnected2', victory: 10, defeat: 5},
                    ],
                    request: [],
                }
                // state.value = action.payload.friends
            }
        },
    },
})

export const {onModificationFriends} = friendsSlice.actions
export const selectFriends = (state: any) => state.friends.value

export default friendsSlice.reducer
