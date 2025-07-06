import { Input, Button } from "@heroui/react";
import { DragOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { DraggableItem } from "./DraggableItem";

interface TextListProps {
    values: string[]
    setValues: (arg0: string[]) => void
    addNewLabel: string
    type: string
}

export function TextList(props: TextListProps) {
    const [values, setValues] = [props.values, props.setValues]

    const addValue = (value: string) => {
        setValues(values.concat([value]))
    }

    const removeValue = (value_idx: number) => {
        setValues(values.filter((_, idx) => idx != value_idx ))
    }

    const updateValue = (index: number, new_value: string) => {
        setValues(
            values
                .slice(0, index)
                .concat([new_value])
                .concat(values.slice(index + 1))
        )
    }

    const moveValue = (prevIndex: number, newIndex: number) => {
        let copy = values.concat([])
        let old = copy[prevIndex];
        copy[prevIndex] = copy[newIndex];
        copy[newIndex] = old;

        setValues(copy);
    }

    const renderValue = (value: string, index: number) => {
        return (
            <DraggableItem
                key={index.toString()}
                index={index}
                id={index.toString()}
                moveItem={moveValue}
                renderComponent={(ref, dataHandlerId, props, opacity) => {
                    return (
                        <div className="flex flex-row gap-5">
                            <DragOutlined ref={ref} data-handler-id={dataHandlerId} className="cursor-move" />
                            <Input
                                value={value}
                                onChange={(e) => updateValue(props.index, e.target.value)}
                                onFocusChange={(focused) => {
                                    if (!focused && !value) {
                                        removeValue(props.index)
                                    }
                                }}
                                startContent={<span className="font-bold">{(props.index + 1).toString() + ". "}</span>}
                                className="!w-100"
                                style={{opacity: opacity}}
                            />
                            <Button isIconOnly onMouseDown={() => removeValue(props.index)} color="danger" variant="ghost">
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
            <div className={"flex flex-col gap-3 " + (values.length ? "pb-5" : "")}>
                {values.map((v, i) => renderValue(v, i))}
            </div>
            <Button size="sm" onMouseDown={() => {
                addValue("")
            }}>
                <PlusOutlined />
                {props.addNewLabel}
            </Button>            
        </div>
    )
}

