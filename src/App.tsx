import Navbar from './components/Nav';
import Options from './sections/Options';
import Preview from './sections/Preview';
import * as examActions from "./features/exam/examSlice";
import * as inputFieldsActions from "./features/inputFields/inputFieldsSlice";
import * as instructionsActions from "./features/instructions/instructionsSlice";
import * as questionsActions from "./features/questions/questionsSlice";
import * as choicesActions from "./features/choices/choicesSlice";
import * as examDataActions from "./features/examData/examDataSlice";
import { useAppSelector, useAppDispatch } from './hooks';
import { useEffect } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


export default function App() {
    const dispatch = useAppDispatch()
    const exam = useAppSelector(state => state.exam.value);
    const inputFields = useAppSelector(state => state.inputFields.value);
    const instructions = useAppSelector(state => state.instructions.value);
    const questions = useAppSelector(state => state.questions.value);
    const choices = useAppSelector(state => state.choices.value);

    const makeExamData = () => {
        return {
            ...exam,
            inputFields,
            instructions,
            questions,
            choices,
        }
    }

    useEffect(() => {
        const options = new URLSearchParams(window.location.search);
        const b64data = options.get("data");

        if (b64data) {
            let data = JSON.parse(atob(b64data));

            dispatch(inputFieldsActions.setData(data.inputFields))
            dispatch(instructionsActions.setData(data.instructions))
            dispatch(questionsActions.setData(data.questions))
            dispatch(choicesActions.setData(data.choices))

            delete data.inputFields
            delete data.instructions
            delete data.questions
            delete data.choices

            dispatch(examActions.setData(data))
            dispatch(examDataActions.setFromSharedData(true));
        } else {
            dispatch(examDataActions.setFromSharedData(false));
        }
    }, [])

    useEffect(() => {
        dispatch(examDataActions.setData(makeExamData()))
    }, [exam, inputFields, instructions, questions, choices])

    return (
        <>
            <Navbar />
            <main className="overflow-hidden flex flex-row h-screen items-stretch grow shrink basis-[0%]">
                <DndProvider backend={HTML5Backend}>
                    <Options />
                </DndProvider>
                <Preview />
            </main>
        </>
    )
}
