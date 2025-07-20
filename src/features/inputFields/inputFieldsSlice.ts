import { createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { UnidentifiedInputField, InputFieldsInitialState } from './types'
import type InputField from './types'
import type { MoveAction } from '../../types'

const initialState: InputFieldsInitialState = {
    value: [
        { id: nanoid(), content: "Name" },
        { id: nanoid(), content: "Roll Number" }
    ]
}

export const inputFieldsSlice = createSlice({
    initialState,
    name: 'inputFields',
    reducers: {
        setData: (state, data: PayloadAction<InputField[]>) => {
            state.value = data.payload
        },

        createInputField: (state, inputField: PayloadAction<UnidentifiedInputField>) => {
            state.value.push({ id: nanoid(), ...inputField.payload })
        },

        removeInputField: (state, inputField: PayloadAction<string>) => {
            state.value = state.value.filter((field) => field.id != inputField.payload )
        },

        updateInputField: (state, updatePayload: PayloadAction<InputField>) => {
            state.value = state.value.map((field) => {
                if (field.id == updatePayload.payload.id) {
                    return updatePayload.payload
                }

                return field
            })
        },

        moveInputField: (state, movePayload: PayloadAction<MoveAction> ) => {
            let temp = state.value[movePayload.payload.fromIndex]
            state.value[movePayload.payload.fromIndex] = state.value[movePayload.payload.toIndex]
            state.value[movePayload.payload.toIndex] = temp
        }
    }
})

export const {
    setData,
    createInputField,
    removeInputField,
    updateInputField,
    moveInputField,
} = inputFieldsSlice.actions

export default inputFieldsSlice.reducer
