import * as questionActions from "../features/questions/questionsSlice"
import * as choicesAction from "../features/choices/choicesSlice"
import { useDisclosure, Button, Chip, Tooltip } from "@heroui/react";
import { EditOutlined, DeleteOutlined, DragOutlined } from "@ant-design/icons";
import { QuestionModal } from "./QuestionModal";
import { useFirstRender, useAppDispatch, useAppSelector } from "../hooks";
import type { Identifier } from "dnd-core";
import type Question from "../features/questions/types";

interface QuestionListItemProps {
    question: Question
    dragRef: any
    dataHandlerId: Identifier | null,
    opacity: number
}

export function QuestionListItem (props: QuestionListItemProps) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const dispatch = useAppDispatch();
    const questions = useAppSelector((state) => state.questions.value)
    const choices = useAppSelector((state) => state.choices.value)
    const fromSharedData = useAppSelector((state) => state.examData.fromSharedData)
    const firstRender = useFirstRender();

    if (firstRender && !fromSharedData) {
        onOpen();
    }

    return (
        <div className="border-solid border-default border-2 p-3 w-170">
            <QuestionModal isOpen={isOpen} onOpenChange={onOpenChange} {...props} />
            <div className="flex flex-row gap-5 justify-between">
                <div style={{opacity: props.opacity}} className="flex flex-col justify-around">
                    <div className="flex flex-row gap-3">
                        <h1 className="font-bold">
                            Q{questions.findIndex((q) => q.id == props.question.id) + 1}. {" "}
                        </h1>
                        <span className="font-normal">
                            {!props.question.text.length ? <span className="italic">No content</span> :
                            ((props.question.text.length > 20) ? props.question.text.slice(0, 20) + "..."
                            : props.question.text)}
                        </span>
                        <div className="flex flex-col justify-around">
                            { choices[props.question.id]?.length ? (
                                <Tooltip closeDelay={0} content="Multiple choice question">
                                    <Chip color="success" size="sm" radius="lg" variant="flat">
                                        MCQ
                                    </Chip>
                                </Tooltip>
                            ) : "" }
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-3">
                    <DragOutlined className="cursor-move" ref={props.dragRef} data-handler-id={props.dataHandlerId} />
                    <Button className="w-10" variant="flat" color="primary" size="sm" onMouseDown={onOpen} isIconOnly>
                        <EditOutlined />
                    </Button>
                    <Button
                        className="w-10"
                        variant="flat"
                        color="danger"
                        size="sm"
                        isIconOnly
                        onMouseDown={() => {
                            dispatch(questionActions.removeQuestion(props.question.id))
                            dispatch(choicesAction.clearChoices({ questionId: props.question.id, data: undefined }))
                        }}
                    >
                        <DeleteOutlined />
                    </Button>
                </div>
            </div>
        </div>
    )
}
