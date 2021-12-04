type Board = number[][];

export function part1(input: string) {
  const [bingoNumbers, boards] = formatInput(input);
  const marked: number[] = [];

  for (const num of bingoNumbers) {
    marked.push(num);

    for (const board of boards) {
      if (hasBingo(board, marked)) {
        const unmarked = board.flat().filter((num) => !marked.includes(num));
        const unmarkedSum = unmarked.reduce((a, b) => a + b);
        const latestMarked = marked[marked.length - 1];
        return unmarkedSum * latestMarked;
      }
    }
  }
}

export function part2(input: string) {
  const [bingoNumbers, boards] = formatInput(input);
  const marked: number[] = [];
  const winningBoards: Board[] = [];

  for (const num of bingoNumbers) {
    marked.push(num);

    for (const board of boards) {
      if (hasBingo(board, marked) && !winningBoards.includes(board)) {
        winningBoards.push(board);

        if (winningBoards.length === boards.length) {
          const lastWinningBoard = winningBoards[winningBoards.length - 1];
          const unmarked = lastWinningBoard
            .flat()
            .filter((num) => !marked.includes(num));
          const unmarkedSum = unmarked.reduce((a, b) => a + b);
          const latestMarked = marked[marked.length - 1];
          return unmarkedSum * latestMarked;
        }
      }
    }
  }
}

function formatInput(input: string): [number[], Board[]] {
  const items = input.replace(/[\r]| +(?= )/g, "").split("\n\n");
  const bingoNumbers = items[0].split(",").map((num) => +num);
  const boards = items.slice(1).map((board) =>
    board.split("\n").map((row) =>
      row
        .trim()
        .split(" ")
        .map((num) => +num)
    )
  );
  return [bingoNumbers, boards];
}

function hasBingo(board: Board, marked: number[]): boolean {
  for (let i = 0; i < board.length; i++) {
    const hasBingo =
      checkRow((j: number) => board[i][j], board.length, marked) ||
      checkRow((j: number) => board[j][i], board.length, marked);
    if (hasBingo) {
      return true;
    }
  }

  return false;
}

function checkRow(
  criteria: (i: number) => number,
  length: number,
  marked: number[]
): boolean {
  let hasBingo = true;

  for (let i = 0; i < length; i++) {
    if (!marked.includes(criteria(i))) {
      hasBingo = false;
      break;
    }
  }

  return hasBingo;
}
