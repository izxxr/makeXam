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
import { SaveOutlined } from "@ant-design/icons";
import { useRef, useState, useEffect } from "react";
import { TextList } from "./TextList";
import type { Question } from "../types";

interface QuestionModalProps {
    questions: Question[]
    index: number
    isOpen: boolean
    onOpenChange: any
    updateQuestion: (arg0: number, arg1: Question) => void
}

export function QuestionModal ({ questions, updateQuestion, index, isOpen, onOpenChange, ...props }: QuestionModalProps) {
    let question = questions[index];

    const targetRef = useRef(null);
    const {moveProps} = useDraggable({targetRef, isDisabled: !isOpen}); 
    const [text, setText] = useState(question.text);
    const [marks, setMarks] = useState(question.marks);
    const [workingSpace, setWorkingSpace] = useState(question.working_space);
    const [choices, setChoices]: [string[], any] = useState(question.choices || []);
    const [newQuestion, setNewQuestion]: [Question, any] = useState({ ...question });

    useEffect(() => {
        setNewQuestion({ text, marks, choices, working_space: workingSpace })
    }, [text, marks, workingSpace, choices])

    return (
        <Modal
            scrollBehavior="inside"
            className="pb-5"
            ref={targetRef}
            draggable
            size="2xl"
            isOpen={isOpen}
            onOpenChange={(open) => {
                updateQuestion(index, newQuestion);
                onOpenChange(open);
            }}
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader {...moveProps} className="flex flex-col gap-1">Question {index + 1}</ModalHeader>
                        <ModalBody>
                            <Textarea
                                label="Content"
                                description="Typst markup syntax is supported, you can include mathematical equations, code blocks, and other elements."
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
                                    onValueChange={(v) => setMarks(v)}
                                />
                                <NumberInput
                                    isClearable
                                    label="Working Space"
                                    labelPlacement="outside"
                                    minValue={0}
                                    description={"Number of lines to provide for showing working"}
                                    value={workingSpace}
                                    onValueChange={(v) => setWorkingSpace(v)}
                                />
                            </div>
                            <h1 className="font-bold text-md text-default-800">Multiple Choices</h1>
                            <h1 className="text-sm text-default-600">Create choices for multiple choice question.</h1>
                            <Divider />
                            <TextList values={choices} setValues={setChoices} type="question-choice" addNewLabel="Add Choice" {...props} />
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
