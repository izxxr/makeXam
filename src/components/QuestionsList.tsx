import { Button } from "@heroui/react";
import { PlusOutlined } from "@ant-design/icons";
import { DraggableItem } from "./DraggableItem";
import { QuestionListItem } from "./QuestionListItem";
import { useAppDispatch, useAppSelector } from "../hooks";
import * as questionActions from "../features/questions/questionsSlice"; 
import type Question  from "../features/questions/types";


export function QuestionsList() {
    const dispatch = useAppDispatch();
    const questions = useAppSelector((state) => state.questions.value)

    const renderValue = (question: Question, index: number) => {
        return (
            <DraggableItem
                key={question.id}
                id={question.id}
                index={index}
                moveItem={(fromIndex, toIndex) => dispatch(questionActions.moveQuestion({ fromIndex: fromIndex, toIndex: toIndex }))}
                type="question"
                renderComponent={(ref, dataHandlerId, _, opacity) => {
                    return <QuestionListItem
                                question={question}
                                dragRef={ref}
                                opacity={opacity}
                                dataHandlerId={dataHandlerId}
                            />
                }}
            />
        )
    }

    return (
        <div>
            <div className={"flex flex-col gap-3 " + (questions.length ? "pb-5" : "")}>
                {questions.map((v, i) => renderValue(v, i))}
            </div>
            <Button size="sm" onMouseDown={() => {
                dispatch(questionActions.createQuestion({ text: "" }));
            }}>
                <PlusOutlined />
                New Question
            </Button>
        </div>
    )
}
