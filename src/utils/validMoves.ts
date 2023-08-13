export const validIndex = (i: number) => i >= 0 && i <= 7

export const pawnMoves = (rank: number, file: number) => {
  console.log('Zahoor: ~ file: validMoves.ts:2 ~ rank, file:', rank, file)
  return [rank, file]
}

type movesT = Array<Array<number>>

const shiftBy2 = (v: number) => [v - 2, v + 2].filter(validIndex)
const shiftBy1 = (v: number) => [v - 1, v + 1].filter(validIndex)

export const knightMoves = (rank: number, file: number) => {
  const LShapes = [
    [shiftBy1(rank), shiftBy2(file)],
    [shiftBy2(rank), shiftBy1(file)],
  ]

  const moves: movesT = []

  LShapes.forEach(a => {
    const [R, F] = a
    for (let i = 0; i < R.length; i++) {
      for (let j = 0; j < F.length; j++) {
        moves.push([R[i], F[j]])
      }
    }
  })

  return moves
}
