// https://adventofcode.com/2021/day/13

interface FoldInstruction {
  dir: "x" | "y";
  pos: number;
}

export function part1(input: string) {
  const [points, instructions] = formatInput(input);
  return fold(points, instructions[0]).size;
}

export function part2(input: string) {
  let [points, instructions] = formatInput(input);
  instructions.forEach((instruction) => {
    points = fold(points, instruction);
  });
  return getPaper(points);
}

function formatInput(input: string): [points: Set<string>, instructions: FoldInstruction[]] {
  const [points, instructions] = input.split(/\n\n/g).map((i) => i.split("\n"));
  const instructionObjects: FoldInstruction[] = instructions.map((instruction) => {
    const [dir, pos] = instruction.split("fold along ")[1].split("=");
    return { dir: dir as "x" | "y", pos: +pos };
  });
  return [new Set(points), instructionObjects];
}

function fold(points: Set<string>, instruction: FoldInstruction): Set<string> {
  const folded = new Set<string>([]);
  pointSetToArr(points).forEach(([x, y]) => {
    if (instruction.dir === "x" && x > instruction.pos) {
      folded.add(`${instruction.pos - (x - instruction.pos)},${y}`);
    } else if (instruction.dir === "y" && y > instruction.pos) {
      folded.add(`${x},${instruction.pos - (y - instruction.pos)}`);
    } else {
      folded.add(`${x},${y}`);
    }
  });
  return folded;
}

function getPaper(points: Set<string>): string {
  const arr = pointSetToArr(points);
  const largestX = Math.max(...arr.map((point) => point[0]));
  const largestY = Math.max(...arr.map((point) => point[1]));
  let paper = "";

  for (let y = 0; y <= largestY; y++) {
    paper += "\n";
    for (let x = 0; x <= largestX; x++) {
      if (points.has(`${x},${y}`)) {
        paper += "#";
      } else {
        paper += ".";
      }
    }
  }
  return paper;
}

function pointSetToArr(points: Set<string>): number[][] {
  return [...points.values()].map((point) => point.split(",").map((val) => +val));
}
