const FEN_REGEX =
  /((([rnbkqpRNBKQP1-8]{1,8})\/?){8})\s+(b|w)\s+(-|K?Q?k?q?)\s+(-|[a-h](3|6))\s+\d+\s+\d+/g;

const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0";

export const parseFEN = (fen) => {
  let FEN = fen;
  if (!FEN_REGEX.test(fen)) FEN = START_FEN;

  const [positions, move, castle, enP, halfMove, fullMove] = FEN.split(" ");
  const board = positions.split("/").map((file) =>
    file.split("").flatMap((piece) => {
      if (!Number(piece)) return piece;
      return Array(Number(piece)).fill("");
    })
  );

  return { board, move, castle, enP, halfMove, fullMove };
};
