import { useEffect, useState } from "react";
import "./App.css";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const BLACK = ["p", "r", "b", "n", "k", "q"];
const WHITE = ["P", "R", "B", "N", "K", "Q"];

const FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";

const BOARD = FEN.split("/").map((file) =>
  file.split("").flatMap((piece) => {
    if (!Number(piece)) return piece;
    return Array(Number(file)).fill("");
  })
);

function App() {
  const [board, setBoard] = useState(BOARD);
  const [isFlipped, setFlipped] = useState(false);

  const getBg = (i: number, j: number, x: string) => {
    const piece = getPiece(x);
    const style =
      (i + j) % 2 !== 0 ? "text-bg-success" : "bg-primary-subtle text-success";
    return `${style} ${piece} cell`;
  };

  const getRank = (n: number) => (isFlipped ? n + 1 : 8 - n);
  const getFile = (n: number) => (isFlipped ? FILES[7 - n] : FILES[n]);

  const getPiece = (x: string) => {
    if (!x) return "";
    let piece = x.toLowerCase();
    if (BLACK.includes(x)) piece = `b${piece}`;
    if (WHITE.includes(x)) piece = `w${piece}`;
    return piece;
  };

  useEffect(() => {
    let flippedBoard = [...board];
    if (isFlipped) {
      flippedBoard = [];
      board.reverse();
      board.forEach((x) => {
        flippedBoard.push(x.reverse());
      });
    }
    setBoard([...flippedBoard]);
  }, [isFlipped]);

  return (
    <div className="chess-grid">
      {board.map((row, rank) =>
        row.map((piece, file) => (
          <div key={`${rank}${file}`} className={getBg(rank, file, piece)}>
            {file === 0 && <span className="rank">{getRank(rank)}</span>}
            {rank === 7 && <span className="file">{[getFile(file)]}</span>}
          </div>
        ))
      )}
      <button onClick={() => setFlipped((f) => !f)}>flip</button>
    </div>
  );
}

export default App;
