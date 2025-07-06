export interface Question {
    text: string,
    marks?: number,
    working_space?: number,
    choices?: string[],
}

export interface Exam {
    front_page_format: boolean,
    include_branding: boolean,
    include_page_numbers: boolean,
    include_grading_table: boolean,
    title: string,
    subtitle: string,
    input_fields: string[],
    instructions: string[],
    instructions_header: string,
    questions: Question[],
}
