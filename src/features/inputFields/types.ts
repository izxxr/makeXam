import type { TextField } from "../../types"

export default interface InputField extends TextField {};

export interface InputFieldsInitialState {
    value: InputField[]
}

export type UnidentifiedInputField = Omit<InputField, "id">
