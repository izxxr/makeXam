export interface Identified {
    id: string
}

export interface WithContent {
    content: string
}

export type TextField = Identified & WithContent;

export interface MoveAction {
    fromIndex: number
    toIndex: number
}
