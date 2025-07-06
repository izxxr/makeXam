import { useDisclosure, Button, Chip, Tooltip } from "@heroui/react";
import { EditOutlined, DeleteOutlined, DragOutlined } from "@ant-design/icons";
import { QuestionModal } from "./QuestionModal";
import { useFirstRender } from "../hooks";
import type { Identifier } from "dnd-core";
import type { Question } from "../types";

interface QuestionListItemProps {
    questions: Question[]
    index: number
    dragRef: any
    dataHandlerId: Identifier | null,
    opacity: number
    removeQuestion: () => void
    updateQuestion: (arg0: number, arg1: Question) => void
}

export function QuestionListItem (props: QuestionListItemProps) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const questionCreate = useFirstRender();

    if (questionCreate) {
        onOpen();
    }

    let question = props.questions[props.index];

    return (
        <div className="border-solid border-default border-2 p-3 w-170">
            <QuestionModal isOpen={isOpen} onOpenChange={onOpenChange} {...props} />
            <div className="flex flex-row gap-5 justify-between">
                <div style={{opacity: props.opacity}} className="flex flex-col justify-around">
                    <div className="flex flex-row gap-3">
                        <h1 className="font-bold">
                            Q{props.index + 1}. {" "}
                        </h1>
                        <span className="font-normal">
                            {!question.text.length ? <span className="italic">No content</span> :
                            ((question.text.length > 20) ? question.text.slice(0, 20) + "..."
                            : question.text)}
                        </span>
                        <div className="flex flex-col justify-around">
                            { question.choices?.length ? (
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
                    <Button className="w-10" variant="flat" color="danger" size="sm" onMouseDown={props.removeQuestion} isIconOnly>
                        <DeleteOutlined />
                    </Button>
                </div>
            </div>
        </div>
    )
}
