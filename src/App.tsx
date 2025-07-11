import Navbar from './components/Nav';
import Options from './sections/Options';
import Preview from './sections/Preview';
import { useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import type { Exam } from './types';

export default function App() {
    const [exam, setExam]: [Exam, any] = useState({
        front_page_format: false,
        include_branding: true,
        include_grading_table: false,
        include_page_numbers: true,
        input_fields: [],
        instructions: [],
        instructions_header: "Instructions",
        questions: [],
        title: "",
        subtitle: ""
    });
    const [fromData, setFromData] = useState(false);

    useEffect(() => {
        const options = new URLSearchParams(window.location.search);
        const b64data = options.get("data");

        if (b64data) {
            setExam(JSON.parse(atob(b64data)));
            setFromData(true);
        }
    }, [])

    return (
        <>
            <Navbar />
            <main className="overflow-hidden flex flex-row h-screen items-stretch grow shrink basis-[0%]">
                <DndProvider backend={HTML5Backend}>
                    <Options fromData={fromData} exam={exam} setExamData={setExam} />
                </DndProvider>
                <Preview exam={exam} />
            </main>
        </>
    )
}
