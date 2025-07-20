import { createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { ChoiceAction, ChoicesInitialState, UnidentifiedChoice, QuestionChoicesMap } from './types'
import type { MoveAction } from '../../types'
import type Choice from './types'

const initialState: ChoicesInitialState = {value: {}}

export const choicesSlice = createSlice({
    initialState,
    name: 'choices',
    reducers: {
        setData: (state, data: PayloadAction<QuestionChoicesMap>) => {
            state.value = data.payload
        },

        createChoice: (state, action: PayloadAction<ChoiceAction<UnidentifiedChoice>>) => {
            let qId = action.payload.questionId
            let choice = {id: nanoid(), ...action.payload.data}

            if (!state.value[qId]) {
                state.value[qId] = [choice]
            } else {
                state.value[qId].push(choice)
            }
        },

        removeChoice: (state, action: PayloadAction<ChoiceAction<string>>) => {
            let qId = action.payload.questionId
            state.value[qId] = state.value[qId].filter((c) => c.id != action.payload.data)

            if (!state.value[qId].length) {
                delete state.value[qId]
            }
        },

        clearChoices: (state, action: PayloadAction<ChoiceAction<undefined>>) => {
            delete state.value[action.payload.questionId]
        },

        updateChoice: (state, action: PayloadAction<ChoiceAction<Partial<Choice>>>) => {
            let qId = action.payload.questionId

            state.value[qId]= state.value[qId].map((choice) => {
                if (choice.id == action.payload.data.id) {
                    return {...choice, ...action.payload.data}
                }

                return choice
            })
        },

        moveChoice: (state, action: PayloadAction<ChoiceAction<MoveAction>> ) => {
            let qId = action.payload.questionId
            let moveAction = action.payload.data
            let temp = state.value[qId][moveAction.fromIndex]

            state.value[qId][moveAction.fromIndex] = state.value[qId][moveAction.toIndex]
            state.value[qId][moveAction.toIndex] = temp
        }
    }
})

export const { setData, createChoice, removeChoice, clearChoices, updateChoice, moveChoice } = choicesSlice.actions
export default choicesSlice.reducer
