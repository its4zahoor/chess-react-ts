import { useEffect, useState } from "react";
import "./App.css";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const FEN = "2k3r1/p3r3/4P3/2p1R1p1/1pP3Kp/1P5P/P7/4R3";
const BOARD = FEN.split("/").map((file) =>
  file.split("").flatMap((piece) => {
    if (!Number(piece)) return piece;
    return Array(Number(piece)).fill("");
  })
);

function App() {
  const [board, setBoard] = useState(BOARD);
  const [isFlipped, setFlipped] = useState(false);

  const getBg = (i: number, j: number, x: string) => {
    const piece = getPiece(x);
    const isDark = (i + j) % 2 !== 0;
    const style = isDark ? "text-bg-success" : "bg-primary-subtle text-success";
    return `${style} ${piece} cell`;
  };

  const getRank = (n: number) => (isFlipped ? n + 1 : 8 - n);
  const getFile = (n: number) => (isFlipped ? FILES[7 - n] : FILES[n]);

  const getPiece = (x: string) => {
    if (!x) return "";
    const piece = x.toLowerCase();
    return x === piece ? `b${piece}` : `w${piece}`;
  };

  useEffect(() => {
    setBoard(board.reverse().map((x) => x.reverse()));
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
