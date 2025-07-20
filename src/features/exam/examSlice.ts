import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type Exam from './types'


interface ExamInitialState {
    value: Exam
}

const initialState: ExamInitialState = {
    value: {
        title: "MATH 100: Calculus 1",
        subtitle: "Final Exam",
        instructionsHeader: "Guidelines",
        frontPageFormat: false,
        includeGradingTable: false,
        includeBranding: true,
        includePageNumbers: true,
    }
}

export const examSlice = createSlice({
    initialState,
    name: 'exam',
    reducers: {
        setData: (state, data: PayloadAction<Exam>) => {
            state.value = data.payload
        },
        setTitle: (state, title: PayloadAction<string>) => {
            state.value.title = title.payload
        },
        setSubtitle: (state, subtitle: PayloadAction<string>) => {
            state.value.subtitle = subtitle.payload
        },
        setInstructionsHeader: (state, instructionsHeader: PayloadAction<string>) => {
            state.value.instructionsHeader = instructionsHeader.payload
        },
        setFrontPageFormat: (state, frontPageFormat: PayloadAction<boolean>) => {
            state.value.frontPageFormat = frontPageFormat.payload
        },
        setIncludeGradingTable: (state, includeBranding: PayloadAction<boolean>) => {
            state.value.includeGradingTable = includeBranding.payload
        },
        setIncludeBranding: (state, includeBranding: PayloadAction<boolean>) => {
            state.value.includeBranding = includeBranding.payload
        },
        setIncludePageNumbers: (state, includePageNumbers: PayloadAction<boolean>) => {
            state.value.includePageNumbers = includePageNumbers.payload
        },
    }
})

export const {
    setData,
    setTitle,
    setSubtitle,
    setInstructionsHeader,
    setFrontPageFormat,
    setIncludeBranding,
    setIncludeGradingTable,
    setIncludePageNumbers,
} = examSlice.actions

export default examSlice.reducer
