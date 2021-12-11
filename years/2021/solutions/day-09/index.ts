import { Coordinate, multiply, sortDesc, sum } from "../../utils";

export function part1(input: string) {
  const points = formatInput(input);
  const lowPoints = getLowPoints(points).map(({ x, y }) => points[y][x]);
  const riskLevels = lowPoints.map((point) => point + 1);
  return sum(riskLevels);
}

export function part2(input: string) {
  const points = formatInput(input);
  const lowPoints = getLowPoints(points);
  const basinSizes = sortDesc(
    lowPoints.map((point) => {
      return getBasin(points, point, []).length;
    })
  );
  return multiply(basinSizes.slice(0, 3));
}

function formatInput(input: string) {
  const lines = input.split("\n");
  return lines.map((line) =>
    line
      .trim()
      .split("")
      .map((val) => +val)
  );
}

function getLowPoints(points: number[][]) {
  const lowPoints: Coordinate[] = [];
  for (let y = 0; y < points.length; y++) {
    for (let x = 0; x < points[0].length; x++) {
      const neighbors = adjacent(points, x, y).map(({ x, y }) => points[y][x]);
      if (points[y][x] < Math.min(...neighbors)) {
        lowPoints.push({ x, y });
      }
    }
  }
  return lowPoints;
}

function getBasin(
  points: number[][],
  currPoint: Coordinate,
  basin: Coordinate[]
): Coordinate[] {
  adjacent(points, currPoint.x, currPoint.y).forEach(({ x, y }) => {
    if (
      points[y][x] !== 9 &&
      !basin.find((point) => point.x === x && point.y === y)
    ) {
      basin.push({ x, y });
      getBasin(points, { x, y }, basin);
    }
  });
  return basin;
}

function adjacent(points: number[][], x: number, y: number): Coordinate[] {
  return [
    { x, y: y - 1 },
    { x, y: y + 1 },
    { x: x - 1, y: y },
    { x: x + 1, y: y },
  ].filter(
    (point) =>
      point.x >= 0 &&
      point.x < points[0].length &&
      point.y >= 0 &&
      point.y < points.length
  );
}
