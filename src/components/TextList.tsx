import { Input, Button } from "@heroui/react";
import { DragOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { DraggableItem } from "./DraggableItem";
import { useAppDispatch } from "../hooks";
import type { TextField, MoveAction } from "../types";

interface TextListProps<T extends TextField> {
    values: T[]
    createValue: (arg0: Omit<T, "id">) => any
    removeValue: (arg0: string) => any
    updateValue: (arg0: T) => any
    moveValue: (arg0: MoveAction) => any
    addNewLabel: string
    type: string
    useActions: boolean
}

export function TextList(props: TextListProps<TextField>) {
    const { values, createValue, removeValue, updateValue, moveValue } = props
    const dispatch = useAppDispatch()
    const callAction = (action: any) => {
        if (props.useActions) {
            dispatch(action)
        }
    }

    const renderValue = (value: TextField, index: number) => {
        return (
            <DraggableItem
                key={value.id}
                id={value.id}
                index={index}
                moveItem={(fromIndex, toIndex) => callAction(moveValue({ fromIndex, toIndex }))}
                renderComponent={(ref, dataHandlerId, props, opacity) => {
                    return (
                        <div className="flex flex-row gap-5">
                            <DragOutlined ref={ref} data-handler-id={dataHandlerId} className="cursor-move" />
                            <Input
                                value={value.content}
                                onChange={(e) => callAction(updateValue({ id: value.id, content: e.target.value  }))}
                                onFocusChange={(focused) => {
                                    if (!focused && !value.content) {
                                        callAction(removeValue(value.id))
                                    }
                                }}
                                startContent={<span className="font-bold">{(props.index + 1).toString() + ". "}</span>}
                                className="!w-100"
                                style={{opacity: opacity}}
                            />
                            <Button isIconOnly onMouseDown={() => callAction(removeValue(value.id))} color="danger" variant="ghost">
                                <DeleteOutlined />
                            </Button>
                        </div>
                    )
                }}
                type={props.type}
            />
        )
    }

    return (
        <div>
            <div className={"flex flex-col gap-3 " + (values?.length ? "pb-5" : "")}>
                {values?.map((v, i) => renderValue(v, i))}
            </div>
            <Button size="sm" onMouseDown={() => {
                callAction(createValue({ content: "" }))
            }}>
                <PlusOutlined />
                {props.addNewLabel}
            </Button>            
        </div>
    )
}

