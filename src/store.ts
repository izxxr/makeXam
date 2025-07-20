import { configureStore } from "@reduxjs/toolkit"
import questionsReducer from "./features/questions/questionsSlice";
import examReducer from "./features/exam/examSlice";
import inputFieldsReducer from "./features/inputFields/inputFieldsSlice";
import instructionsReducer from "./features/instructions/instructionsSlice";
import choicesReducer from "./features/choices/choicesSlice";
import examDataReducer from "./features/examData/examDataSlice";

export const store = configureStore({
    reducer: {
        questions: questionsReducer,
        exam: examReducer,
        inputFields: inputFieldsReducer,
        instructions: instructionsReducer,
        choices: choicesReducer,
        examData: examDataReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
