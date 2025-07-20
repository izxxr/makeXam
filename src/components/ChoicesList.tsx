import * as choicesActions from "../features/choices/choicesSlice"
import { Textarea, Button, Tooltip } from "@heroui/react";
import { DragOutlined, DeleteOutlined, PlusOutlined, EnterOutlined } from "@ant-design/icons";
import { DraggableItem } from "./DraggableItem";
import { useAppDispatch, useAppSelector } from "../hooks";
import type Choice from "../features/choices/types";

interface ChoicesListProps {
    questionId: string
}

export function ChoicesList({ questionId }: ChoicesListProps) {
    const dispatch = useAppDispatch()
    const choices = useAppSelector(state => state.choices.value)

    const renderValue = (value: Choice, index: number) => {
        return (
            <DraggableItem
                key={value.id}
                id={value.id}
                index={index}
                moveItem={(fromIndex, toIndex) => dispatch(choicesActions.moveChoice({questionId: questionId, data: {fromIndex, toIndex} }))}
                renderComponent={(ref, dataHandlerId, props, opacity) => {
                    return (
                        <div className="flex flex-row gap-3">
                            <DragOutlined ref={ref} data-handler-id={dataHandlerId} className="cursor-move" />
                            <Textarea
                                maxRows={5}
                                minRows={1}
                                value={value.content}
                                onChange={(e) => 
                                    dispatch(choicesActions.updateChoice(
                                        {questionId, data: {id: value.id, content: e.target.value}}
                                    ))
                                }
                                onFocusChange={(focused) => {
                                    if (!focused && !value.content) {
                                        dispatch(choicesActions.removeChoice({questionId, data: value.id}))
                                    }
                                }}
                                startContent={
                                    <span className="font-bold">
                                        {((props.index < 26) ? String.fromCharCode(65 + props.index) : (props.index + 1)) + ". "}
                                    </span>
                                }
                                className="!w-100"
                                size="sm"
                                style={{opacity: opacity}}
                            />
                            <div className="flex flex-col justify-around">
                                <div className="flex flex-row gap-3">
                                    <Tooltip
                                        content={`Show this choice on a new line (${value.onNewLine ? "enabled" : "disabled"})`}
                                        closeDelay={0}
                                        size="md"
                                    >
                                        <Button
                                            isIconOnly
                                            onMouseDown={() => dispatch(choicesActions.updateChoice({questionId, data: {id: value.id, onNewLine: !value.onNewLine}}))}
                                            color={value.onNewLine ? "primary" : "default"}
                                            variant={value.onNewLine ? "solid" : "ghost"}
                                        >
                                            <EnterOutlined />
                                        </Button>
                                    </Tooltip>
                                    <Button
                                        isIconOnly
                                        onMouseDown={() => dispatch(choicesActions.removeChoice({questionId, data: value.id}))}
                                        color="danger"
                                        variant="ghost"
                                    >
                                        <DeleteOutlined />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )
                }}
                type="choice"
            />
        )
    }

    return (
        <div>
            <div className={"flex flex-col gap-3 " + (choices[questionId]?.length ? "pb-5" : "")}>
                {choices[questionId]?.map((v, i) => renderValue(v, i))}
            </div>
            <Button size="sm" onMouseDown={() => {
                dispatch(choicesActions.createChoice({questionId, data: {content: "", onNewLine: false}}))
            }}>
                <PlusOutlined />
                Add Choice
            </Button>            
        </div>
    )
}

