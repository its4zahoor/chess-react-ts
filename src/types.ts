export type Board = Array<Array<string>>
export type bgType = (i: number, j: number, x: string) => string
export type rankType = (x: number) => number
export type fileType = (x: number) => string
export type pieceType = (x: string) => string
