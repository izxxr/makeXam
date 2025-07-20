import type { TextField } from "../../types"

export default interface Instruction extends TextField {};

export interface InstructionsInitialState {
    value: Instruction[]
}

export type UnidentifiedInstruction = Omit<Instruction, "id">
