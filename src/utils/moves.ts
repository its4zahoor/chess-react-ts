export const validIndex = (i: number) => i >= 0 && i <= 7

export const pawn = (rank: number, file: number) => {
  return [rank, file]
}

type movesT = Array<Array<number>>

const shiftBy2 = (v: number) => [v - 2, v + 2].filter(validIndex)
const shiftBy1 = (v: number) => [v - 1, v + 1].filter(validIndex)

export const knight = (rank: number, file: number): movesT => {
  const slices = [
    [shiftBy1(rank), shiftBy2(file)],
    [shiftBy2(rank), shiftBy1(file)],
  ]

  return slices.flatMap(([R, F]) => R.flatMap(r => F.map(f => [r, f])))
}

const range = [1, 2, 3, 4, 5, 6, 7, 8]

const addN = (r: number, f: number) => (n: number) => [r + n, f + n]
const subN = (r: number, f: number) => (n: number) => [r - n, f - n]
const addNsubN = (r: number, f: number) => (n: number) => [r + n, f - n]
const subNaddN = (r: number, f: number) => (n: number) => [r - n, f + n]

export const bishop = (rank: number, file: number): movesT => {
  const moves = [
    range.map(x => addN(rank, file)(x)).filter(x => x.every(validIndex)),
    range.map(x => subN(rank, file)(x)).filter(x => x.every(validIndex)),
    range.map(x => addNsubN(rank, file)(x)).filter(x => x.every(validIndex)),
    range.map(x => subNaddN(rank, file)(x)).filter(x => x.every(validIndex)),
  ]

  return moves.flatMap(x => x)
}

export const rook = (rank: number, file: number): movesT => {
  const moves = [
    range.map(x => addN(rank, file - x)(x)).filter(x => x.every(validIndex)),
    range.map(x => subN(rank, file + x)(x)).filter(x => x.every(validIndex)),
    range.map(x => addN(rank - x, file)(x)).filter(x => x.every(validIndex)),
    range.map(x => subN(rank + x, file)(x)).filter(x => x.every(validIndex)),
  ]
  return moves.flatMap(x => x)
}

export const queen = (rank: number, file: number): movesT => {
  const moves = [bishop(rank, file), rook(rank, file)]
  return moves.flatMap(x => x)
}

export const king = (rank: number, file: number): movesT => {
  const moves = [
    addN(rank, file)(1),
    subN(rank, file)(1),
    addNsubN(rank, file)(1),
    subNaddN(rank, file)(1),
    addN(rank, file - 1)(1),
    subN(rank, file + 1)(1),
    addN(rank - 1, file)(1),
    subN(rank + 1, file)(1),
  ].filter(x => x.every(validIndex))
  return moves
}
