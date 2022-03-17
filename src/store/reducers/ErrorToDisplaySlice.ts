import {createSlice} from '@reduxjs/toolkit'

export const errorToDisplaySlice = createSlice({
    name: 'errorToDiplay',
    initialState: {
        value: {stateModal: false, msg: 'error'},
    },
    reducers: {
        onModificationErrorToDiplay: (state, action) =>{
            if (action.payload.type === 'NEW_ERROR') {
                state.value = action.payload.errorToDisplay
            }
        },
    },
})

export const {onModificationErrorToDiplay} = errorToDisplaySlice.actions
export const selectErrorToDisplay = (state: any) => state.errorToDisplay.value

export default errorToDisplaySlice.reducer
