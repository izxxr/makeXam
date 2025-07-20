import { createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { MoveAction } from '../../types'
import type { UnidentifiedInstruction, InstructionsInitialState } from './types'
import type Instruction from './types'

const initialState: InstructionsInitialState = {
    value: [
        { id: nanoid(), content: "Use of calculators is NOT allowed." },
        { id: nanoid(), content: "You have 150 minutes to complete this exam." },
    ]
}

export const instructionsSlice = createSlice({
    initialState,
    name: 'instructions',
    reducers: {
        setData: (state, data: PayloadAction<Instruction[]>) => {
            state.value = data.payload
        },

        createInstruction: (state, instruction: PayloadAction<UnidentifiedInstruction>) => {
            state.value.push({ id: nanoid(), ...instruction.payload })
        },

        removeInstruction: (state, instructionId: PayloadAction<string>) => {
            state.value = state.value.filter((inst) => inst.id != instructionId.payload)
        },

        updateInstruction: (state, updatePayload: PayloadAction<Instruction>) => {
            state.value = state.value.map((inst) => {
                if (inst.id == updatePayload.payload.id) {
                    return updatePayload.payload
                }

                return inst
            })
        },

        moveInstruction: (state, movePayload: PayloadAction<MoveAction> ) => {
            let temp = state.value[movePayload.payload.fromIndex]
            state.value[movePayload.payload.fromIndex] = state.value[movePayload.payload.toIndex]
            state.value[movePayload.payload.toIndex] = temp
        }
    }
})

export const {
    setData,
    createInstruction,
    removeInstruction,
    updateInstruction,
    moveInstruction,
} = instructionsSlice.actions

export default instructionsSlice.reducer
