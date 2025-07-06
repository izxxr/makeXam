import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import type { ReactNode } from "react";
import type { Identifier, XYCoord } from "dnd-core";

export interface DraggableItemProps {
    id: any
    index: number
    type: string
    moveItem: (dragIndex: number, hoverIndex: number) => void
    renderComponent: (arg0: any, arg1: Identifier | null, arg2: DraggableItemProps, arg3: number) => ReactNode
}

interface DragItem {
    index: number
    id: string
    type: string
}

export function DraggableItem (props: DraggableItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
        accept: props.type,
        collect(monitor) { return { handlerId: monitor.getHandlerId() } },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return
            }

            const dragIndex = item.index
            const hoverIndex = props.index

            if (dragIndex === hoverIndex) {
                return
            }

            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            const clientOffset = monitor.getClientOffset()
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            // Time to actually perform the action
            props.moveItem(dragIndex, hoverIndex)

            // Note: we"re mutating the monitor item here!
            // Generally it"s better to avoid mutations,
            // but it"s good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: props.type,
        item: () => {
            return { id: props.id, index: props.index }
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0.5 : 1
    drag(drop(ref))

    return props.renderComponent(ref, handlerId, props, opacity)
}
