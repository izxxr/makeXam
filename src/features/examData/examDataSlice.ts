import { createSlice } from '@reduxjs/toolkit'

export const examDataSlice = createSlice({
    name: 'examData',
    initialState: {
        value: "",
        fromSharedData: true,
    },
    reducers: {
        setData: (state, action) => {
            state.value = action.payload
        },

        setFromSharedData: (state, action) => {
            state.fromSharedData = action.payload
        }
    }
})

export const { setData, setFromSharedData } = examDataSlice.actions
export default examDataSlice.reducer
