import { Button } from "@heroui/react";
import { PlusOutlined } from "@ant-design/icons";
import { DraggableItem } from "./DraggableItem";
import { QuestionListItem } from "./QuestionListItem";
import type { Question } from "../types";

interface QuestionsListProps {
    fromData: boolean
    questions: Question[]
    setQuestions: (arg0: Question[]) => void
}

export function QuestionsList(props: QuestionsListProps) {
    const [questions, setQuestions] = [props.questions, props.setQuestions]

    const addQuestion = (question: Question) => {
        setQuestions(questions.concat([question]))
    }

    const removeQuestion = (curIdx: number) => {
        setQuestions(questions.filter((_, idx) => idx != curIdx ))
    }

    const updateQuestion = (index: number, newQuestion: Question) => {
        setQuestions(
            questions
                .slice(0, index)
                .concat([newQuestion])
                .concat(questions.slice(index + 1))
        )
    }

    const moveQuestion = (prevIndex: number, newIndex: number) => {
        let copy = questions.concat([])
        let old = copy[prevIndex];
        copy[prevIndex] = copy[newIndex];
        copy[newIndex] = old;

        setQuestions(copy);
    }

    const renderValue = (_: Question, index: number) => {
        return (
            <DraggableItem
                key={index.toString()}
                index={index}
                id={index.toString()}
                moveItem={moveQuestion}
                type="question"
                renderComponent={(ref, dataHandlerId, draggableProps, opacity) => {
                    return <QuestionListItem
                                index={draggableProps.index}
                                dragRef={ref}
                                opacity={opacity}
                                dataHandlerId={dataHandlerId}
                                questions={questions}
                                updateQuestion={updateQuestion}
                                removeQuestion={() => removeQuestion(index)}
                                fromData={props.fromData}
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
                addQuestion({ text: "" });
            }}>
                <PlusOutlined />
                New Question
            </Button>
        </div>
    )
}
