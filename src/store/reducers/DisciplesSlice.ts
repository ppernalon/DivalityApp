import {createSlice} from '@reduxjs/toolkit'

export const disciplesSlice = createSlice({
    name: 'disciples',
    initialState: {
        value: 0,
    },
    reducers: {
        initialisationOnConnection: (state, action) =>{
            if (action.payload.type === 'INITIALISATION_DISCIPLES') {
                state.value = action.payload.number
            }
        },
        incrementByAmount: (state, action) => {
            if (action.payload.type === 'INCREMENT') {
                state.value += action.payload.number
            }
        },
    },
})

export const {incrementByAmount, initialisationOnConnection} = disciplesSlice.actions
export const selectDisciples = (state: any) => state.disciples.value

export default disciplesSlice.reducer
