import { createSlice } from '@reduxjs/toolkit'

export const disciplesSlice = createSlice({
  name: 'disciples',
  initialState: {
    value: 15
  },
  reducers: {
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

export const { incrementByAmount } = disciplesSlice.actions
export const selectDisciples = state => state.disciples.value

export default disciplesSlice.reducer