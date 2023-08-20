import { useEffect, useState } from 'react'
import { parseFEN } from './utils/parsers'
import { FILES } from './utils/constants'
import { Board, bgType, rankType, fileType, pieceType } from './types'
import './App.css'

function App() {
  const init = parseFEN()
  const [board, setBoard] = useState<Board>(init.board)
  const [isFlipped, setFlipped] = useState(false)
  const [prevCell, setPrevCell] = useState<Array<number> | null>()

  const getBg: bgType = (i, j, x) => {
    const piece = getPiece(x)
    const isDark = (i + j) % 2 !== 0
    const style = isDark ? 'text-bg-success' : 'bg-primary-subtle text-success'
    return `${style} ${piece} cell`
  }

  const getRank: rankType = n => (isFlipped ? n + 1 : 8 - n)
  const getFile: fileType = n => (isFlipped ? FILES[7 - n] : FILES[n])

  const getPiece: pieceType = x => {
    if (!x) return ''
    const piece = x.toLowerCase()
    return x === piece ? `b${piece}` : `w${piece}`
  }

  useEffect(() => {
    setBoard(board.reverse().map(x => x.reverse()))
  }, [isFlipped])

  const movePiece = (rank: number, file: number) => {
    const boardCopy = structuredClone(board)
    const [prevRank, prevFile] = prevCell || []
    boardCopy[rank][file] = boardCopy[prevRank][prevFile]
    boardCopy[prevRank][prevFile] = ''
    setBoard(boardCopy)
  }

  const handleMove = (rank: number, file: number, piece: string) => {
    if (prevCell && !board[rank][file]) movePiece(rank, file)
    if (piece) setPrevCell([rank, file])
    else setPrevCell(null)
  }

  return (
    <div className='chess-grid'>
      {board.map((row, rank) =>
        row.map((piece, file) => (
          <div
            key={`${rank}${file}`}
            className={getBg(rank, file, piece)}
            onClick={() => handleMove(rank, file, piece)}
          >
            {file === 0 && <span className='rank'>{getRank(rank)}</span>}
            {rank === 7 && <span className='file'>{[getFile(file)]}</span>}
          </div>
        ))
      )}
      <button onClick={() => setFlipped(f => !f)}>flip</button>
    </div>
  )
}

export default App
