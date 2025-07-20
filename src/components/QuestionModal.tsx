import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Textarea,
    NumberInput,
    Divider,
    useDraggable,
} from "@heroui/react";
import * as questionActions from "../features/questions/questionsSlice";
import { SaveOutlined } from "@ant-design/icons";
import { useRef, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { ChoicesList } from "./ChoicesList";
import type { UnidentifiedQuestion } from "../features/questions/types";
import type Question from "../features/questions/types";

interface QuestionModalProps {
    question: Question
    isOpen: boolean
    onOpenChange: any
}

export function QuestionModal ({ question, isOpen, onOpenChange }: QuestionModalProps) {
    const targetRef = useRef<HTMLElement>(null);
    const dispatch = useAppDispatch();
    const questions = useAppSelector(state => state.questions.value)
    const questionsChoices = useAppSelector(state => state.choices.value)
    const choices = questionsChoices[question.id]

    // @ts-ignore
    const {moveProps} = useDraggable({targetRef, isDisabled: !isOpen});
    const [text, setText] = useState(question.text);
    const [marks, setMarks] = useState(question.marks);
    const [workingSpace, setWorkingSpace] = useState(question.working_space);
    const [newQuestion, setNewQuestion]: [UnidentifiedQuestion, any] = useState({ ...question });

    useEffect(() => {
        setNewQuestion({ text, marks, choices, working_space: workingSpace })
    }, [text, marks, workingSpace])

    return (
        <Modal
            scrollBehavior="inside"
            className="pb-5"
            ref={targetRef}
            draggable
            size="2xl"
            isOpen={isOpen}
            onOpenChange={(open) => {
                dispatch(questionActions.updateQuestion({id: question.id, ...newQuestion}));
                onOpenChange(open);
            }}
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader {...moveProps} className="flex flex-col gap-1">
                            Question {questions.findIndex((q) => q.id == question.id) + 1}
                        </ModalHeader>
                        <ModalBody>
                            <Textarea
                                label="Content"
                                description={
                                    <h1>
                                        <a
                                            href="https://typst.app/docs/reference/syntax/#markup"
                                            className="underline text-blue-300"
                                            target="_blank"
                                        >
                                                Typst markup syntax
                                        </a> is supported in question and choices content, you can include
                                        mathematical equations, code blocks, and other elements.
                                    </h1>
                                }
                                placeholder="What is 2 + 2?"
                                className="pb-2"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                            <div className="flex flex-row gap-5 pb-10">
                                <NumberInput
                                    isClearable
                                    label="Marks"
                                    labelPlacement="outside"
                                    minValue={0}
                                    description={"The score this question carries"}
                                    value={marks}
                                    onClear={() => setMarks(undefined)}
                                    onValueChange={(v) => {
                                        if (v <= 0 || Number.isNaN(v)) {
                                            setMarks(undefined)
                                        } else {
                                            setMarks(v)
                                        }
                                    }}
                                />
                                <NumberInput
                                    isClearable
                                    label="Working Space"
                                    labelPlacement="outside"
                                    minValue={0}
                                    description={"Number of lines to provide for showing working"}
                                    value={workingSpace}
                                    onClear={() => setWorkingSpace(undefined)}
                                    onValueChange={(v) => {
                                        if (v < 1 || Number.isNaN(v)) {
                                            setWorkingSpace(undefined)
                                        } else {
                                            setWorkingSpace(v)
                                        }
                                    }}
                                />
                            </div>
                            <h1 className="font-bold text-md text-default-800">Multiple Choices</h1>
                            <h1 className="text-sm text-default-600">
                                Create choices for multiple choice question. Multi-line choices are
                                supported.
                            </h1>
                            <Divider />
                            <ChoicesList questionId={question.id} />
                            <Divider className="mb-5" />
                            <div className="flex flex-row gap-2 justify-center">
                                {/* <div className="flex flex-col justify-around"></div> */}
                                <SaveOutlined style={{color: "gray"}} />
                                <p className="text-sm text-default-500 mb-[0.5pt]">Changes are saved upon exiting this dialog.</p>
                            </div>
                        </ModalBody>
                        {/* <ModalFooter>
                        </ModalFooter> */}
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
