interface Coordinate {
  x: number;
  y: number;
}

export function part1(input: string) {
  const lines: Coordinate[][] = formatInput(input).filter(
    (line) => line[0].x === line[1].x || line[0].y === line[1].y
  );
  return getOverlapCount(lines);
}

export function part2(input: string) {
  const lines: Coordinate[][] = formatInput(input);
  return getOverlapCount(lines);
}

function formatInput(input: string): Coordinate[][] {
  return input.split("\n").map((line) =>
    line.split(" -> ").map((point) => {
      const [x, y] = point.split(",").map((num) => +num);
      return { x, y };
    })
  );
}

function getOverlapCount(lines: Coordinate[][]): number {
  const points = new Map<string, number>();

  let [xLargest, yLargest] = [0, 0];
  for (const line of lines) {
    const [pos1, pos2] = line;

    for (const point of getPointsInRange(pos1.x, pos1.y, pos2.x, pos2.y)) {
      const pointCount = points.get(`${point.x},${point.y}`);

      // For the diagram, doesn't affect the actual solution
      if (point.x > xLargest) {
        xLargest = point.x;
      }
      if (point.y > yLargest) {
        yLargest = point.y;
      }

      if (!pointCount) {
        points.set(`${point.x},${point.y}`, 1);
      } else {
        points.set(`${point.x},${point.y}`, pointCount + 1);
      }
    }
  }

  // drawDiagram(points, xLargest, yLargest);

  return [...points.values()].filter((count) => count >= 2).length;
}

function drawDiagram(
  map: Map<string, number>,
  xLargest: number,
  yLargest: number
) {
  let diagram: string = "";

  for (let y = 0; y <= yLargest; y++) {
    diagram += "\n";

    for (let x = 0; x <= xLargest; x++) {
      const pointCount = map.has(`${x},${y}`)
        ? `\u001b[33m#\u001b[0m`
        : `\u001b[34m#\u001b[0m`;

      if (pointCount) {
        diagram += pointCount.toString();
      }
    }
  }

  console.log(diagram);
}

function getPointsInRange(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): Coordinate[] {
  let points: Coordinate[] = [];

  // Horizontal
  if (y1 === y2) {
    points = getLine(x1, x2).map((x) => ({ x, y: y1 }));
  }

  // Vertical
  if (x1 === x2) {
    points = getLine(y1, y2).map((y) => ({ x: x1, y: y }));
  }

  // Diagonal 45 deg
  if (Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
    for (let i = 0; i <= Math.max(y1, y2) - Math.min(y1, y2); i++) {
      const x = x1 < x2 ? x1 + i : x1 - i;
      const y = y1 < y2 ? y1 + i : y1 - i;
      points.push({ x, y });
    }
  }

  return points;
}

function getLine(num1: number, num2: number): number[] {
  const arr: number[] = [];
  for (let i = Math.min(num1, num2); i <= Math.max(num1, num2); i++) {
    arr.push(i);
  }
  return arr;
}
