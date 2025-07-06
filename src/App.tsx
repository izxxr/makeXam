import Navbar from './components/Nav';
import Options from './sections/Options';
import Preview from './sections/Preview';
import { useState } from 'react';
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

  return (
    <>
      <Navbar />
      <main className="overflow-hidden flex flex-row h-screen items-stretch grow shrink basis-[0%]">
        <DndProvider backend={HTML5Backend}>
          <Options setExamData={setExam} />
        </DndProvider>
        <Preview exam={exam} />
      </main>
    </>
  )
}
