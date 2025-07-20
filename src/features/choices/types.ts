import type { TextField } from "../../types"

export default interface Choice extends TextField {}

export type UnidentifiedChoice = Omit<Choice, "id">

export interface QuestionChoicesMap {
    [questionId: string]: Choice[]
}

export interface ChoicesInitialState {
    value: QuestionChoicesMap
}

export interface ChoiceAction<T> {
    questionId: string
    data: T
}
