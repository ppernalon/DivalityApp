import {createSlice} from '@reduxjs/toolkit'

export const deconnectionStateSlice = createSlice({
    name: 'deconnectionState',
    initialState: {
        value: {stateModal: false},
    },
    reducers: {
        onModificationDeconnectionState: (state, action) =>{
            if (action.payload.type === 'NEW_DECONNECTION_STATE') {
                state.value = action.payload.deconnectionState
            }
        },
    },
})

export const {onModificationDeconnectionState} = deconnectionStateSlice.actions
export const selectDeconnectionState = (state: any) => state.deconnectionState.value

export default deconnectionStateSlice.reducer
