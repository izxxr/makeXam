import type { Identified } from "../../types"

export default interface Question extends Identified {
    text: string,
    marks?: number,
    working_space?: number,
}

export interface QuestionsInitialState {
    value: Question[]
}

export type UnidentifiedQuestion = Omit<Question, "id">
