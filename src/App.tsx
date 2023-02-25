import "./App.css";

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

function App() {
  const board = Array(8)
    .fill(0)
    .map(() => Array(8).fill(0));

  const getBg = (i: number, j: number) =>
    (i + j) % 2 !== 0 ? "text-bg-success" : "bg-primary-subtle text-success";

  return (
    <div className="chess-grid">
      {board.map((rank, i) =>
        rank.map((_, j) => (
          <div key={j} className={getBg(i, j)}>
            {j === 0 && <span className="cell rank">{8 - i}</span>}
            {i === 7 && <span className="cell file">{FILES[j]}</span>}
          </div>
        ))
      )}
    </div>
  );
}

export default App;
