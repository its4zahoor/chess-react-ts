export const validIndex = (i: number) => i >= 0 && i <= 7

export const pawnMoves = (rank: number, file: number) => {
  console.log('Zahoor: ~ file: validMoves.ts:2 ~ rank, file:', rank, file)
  return [rank, file]
}

type movesT = Array<Array<number>>

const shiftBy2 = (v: number) => [v - 2, v + 2].filter(validIndex)
const shiftBy1 = (v: number) => [v - 1, v + 1].filter(validIndex)

export const knightMoves = (rank: number, file: number): movesT => {
  const slices = [
    [shiftBy1(rank), shiftBy2(file)],
    [shiftBy2(rank), shiftBy1(file)],
  ]

  return slices.flatMap(([R, F]) => R.flatMap(r => F.map(f => [r, f])))
}

const indices = [1, 2, 3, 4, 5, 6, 7, 8]

const addN = (x: number, y: number) => (n: number) => [x + n, y + n]
const subN = (x: number, y: number) => (n: number) => [x - n, y - n]
const addNsubN = (x: number, y: number) => (n: number) => [x + n, y - n]
const subNaddN = (x: number, y: number) => (n: number) => [x - n, y + n]

export const bishopMoves = (rank: number, file: number): movesT => {
  const moves = [
    indices.map(x => addN(rank, file)(x)).filter(x => x.every(validIndex)),
    indices.map(x => subN(rank, file)(x)).filter(x => x.every(validIndex)),
    indices.map(x => addNsubN(rank, file)(x)).filter(x => x.every(validIndex)),
    indices.map(x => subNaddN(rank, file)(x)).filter(x => x.every(validIndex)),
  ]

  return moves.flatMap(x => x)
}
