import { createSlice, nanoid } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { QuestionsInitialState, UnidentifiedQuestion } from './types'
import type { MoveAction } from '../../types'
import type Question from './types'

const initialState: QuestionsInitialState = {
    value: [
        { id: nanoid(), text: "Evaluate $integral_1^5(f(x) dif x)$ if $f(x) = ln(x) + x^2$", working_space: 4 }
    ]
}

export const questionsSlice = createSlice({
    initialState,
    name: 'questions',
    reducers: {
        setData: (state, data: PayloadAction<Question[]>) => {
            state.value = data.payload
        },

        createQuestion: (state, question: PayloadAction<UnidentifiedQuestion>) => {
            state.value.push({ id: nanoid(), ...question.payload })
        },

        removeQuestion: (state, questionId: PayloadAction<string>) => {
            state.value = state.value.filter((question) => question.id != questionId.payload)
        },

        updateQuestion: (state, updatePayload: PayloadAction<Question>) => {
            state.value = state.value.map((question) => {
                if (question.id == updatePayload.payload.id) {
                    return {...question, ...updatePayload.payload}
                }

                return question
            })
        },

        moveQuestion: (state, movePayload: PayloadAction<MoveAction> ) => {
            let temp = state.value[movePayload.payload.fromIndex]
            state.value[movePayload.payload.fromIndex] = state.value[movePayload.payload.toIndex]
            state.value[movePayload.payload.toIndex] = temp
        }
    }
})

export const { setData, createQuestion, removeQuestion, updateQuestion, moveQuestion } = questionsSlice.actions
export default questionsSlice.reducer
