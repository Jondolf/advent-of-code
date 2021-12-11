// https://adventofcode.com/2021/day/11

import { Coordinate, coordsInRange, countOccurrences } from "../../utils";

type EnergyGrid = number[][];

export function part1(input: string) {
  const octopuses = formatInput(input);
  let flashes = 0;
  for (let step = 0; step < 100; step++) {
    simulateFlash(octopuses);
    flashes += countOccurrences(octopuses.flat(), 0);
  }
  return flashes;
}

export function part2(input: string) {
  const octopuses = formatInput(input);
  for (let step = 0; true; step++) {
    simulateFlash(octopuses);
    const flashCount = countOccurrences(octopuses.flat(), 0);
    if (flashCount === octopuses.flat().length) {
      return step + 1;
    }
  }
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

function simulateFlash(octopuses: EnergyGrid): EnergyGrid {
  const [rowLen, colLen] = [octopuses[0].length - 1, octopuses.length - 1];
  const allPositions = coordsInRange(0, 0, rowLen, colLen);
  incrementEnergy(octopuses, allPositions);
  return flashed(octopuses, allPositions);
}

function incrementEnergy(octopuses: EnergyGrid, targets: Coordinate[]) {
  for (const { x, y } of targets) {
    octopuses[y][x] += 1;
  }
}

function flashed(octopuses: EnergyGrid, targets: Coordinate[]): EnergyGrid {
  for (const { x, y } of targets) {
    if (octopuses[y][x] > 9) {
      octopuses[y][x] = 0;
      octopuses = flashNeighbors(octopuses, { x, y });
    }
  }
  return octopuses;
}

function flashNeighbors(octopuses: EnergyGrid, curr: Coordinate): EnergyGrid {
  const neighbors = adjacent(octopuses, curr.x, curr.y);
  for (const { x, y } of neighbors) {
    if (octopuses[y][x] !== 0) {
      octopuses[y][x]++;
    }
    if (octopuses[y][x] > 9) {
      octopuses[y][x] = 0;
      flashNeighbors(octopuses, { x, y });
    }
  }
  return octopuses;
}

function adjacent(octopuses: EnergyGrid, x: number, y: number): Coordinate[] {
  return coordsInRange(x - 1, y - 1, x + 1, y + 1).filter(
    (point) =>
      !(point.x === x && point.y === y) &&
      point.x >= 0 &&
      point.x < octopuses[0].length &&
      point.y >= 0 &&
      point.y < octopuses.length
  );
}
