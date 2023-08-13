import { useEffect, useState } from 'react'
import { parseFEN } from './utils/parsers'
import { knightMoves } from './utils/validMoves'
import { Board, bgType, rankType, fileType, pieceType } from './types'
import './App.css'

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

function App() {
  const init = parseFEN()
  const [board, setBoard] = useState<Board>(init.board)
  const [isFlipped, setFlipped] = useState(false)

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

  const handleMove = (r, f, p) => {
    console.log(
      'Zahoor: ~ file: App.tsx:36 ~ knightMoves(r, f):',
      knightMoves(r, f)
    )
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
            {/* {file === 0 && <span className="rank">{getRank(rank)}</span>}
            {rank === 7 && <span className="file">{[getFile(file)]}</span>} */}
            {rank}, {file}
          </div>
        ))
      )}
      <button onClick={() => setFlipped(f => !f)}>flip</button>
    </div>
  )
}

export default App
