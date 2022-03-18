import {createSlice} from '@reduxjs/toolkit'

export const defyFriendSlice = createSlice({
    name: 'defyFriend',
    initialState: {
        value: {stateModal: false, infoFriend: ''},
    },
    reducers: {
        onModificationDefyFriend: (state, action) =>{
            if (action.payload.type === 'MODIFICATION_DEFY_FRIEND') {
                state.value = action.payload.defyFriend
            }
        },
    },
})

export const {onModificationDefyFriend} = defyFriendSlice.actions
export const selectDefyFriend = (state: any) => state.defyFriend.value

export default defyFriendSlice.reducer
