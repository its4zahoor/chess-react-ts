import { useState } from "react";
import "./App.css";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const BLACK = ["p", "r", "b", "n", "k", "q"];
const WHITE = ["P", "R", "B", "N", "K", "Q"];

const FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

const BOARD = FEN.split("/").map((file) =>
  file.split("").flatMap((piece) => {
    if (BLACK.includes(piece)) return piece;
    if (WHITE.includes(piece)) return piece;
    return Array(Number(file)).fill("");
  })
);

function App() {
  const [board, setBoard] = useState(BOARD);
  const [isFlipped, setFlipped] = useState(false);

  const getBg = (i: number, j: number) =>
    (i + j) % 2 !== 0 ? "text-bg-success" : "bg-primary-subtle text-success";

  const getRank = (n: number) => (isFlipped ? n + 1 : 8 - n);
  const getFile = (n: number) => (isFlipped ? 7 - n : n);

  return (
    <div className="chess-grid">
      {board.map((row, rank) =>
        row.map((piece, file) => (
          <div key={`${rank}${file}`} className={`cell ${getBg(rank, file)}`}>
            {file === 0 && <span className="rank">{getRank(rank)}</span>}
            {rank === 7 && <span className="file">{FILES[getFile(file)]}</span>}
            {piece}
          </div>
        ))
      )}

      <button onClick={() => setFlipped((f) => !f)}>flip</button>
    </div>
  );
}

export default App;
