export interface Coordinate {
  x: number;
  y: number;
}

export function coordsInRange(
  minX: number,
  minY: number,
  maxX: number,
  maxY: number
): Coordinate[] {
  const coords: Coordinate[] = [];
  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      coords.push({ x, y });
    }
  }
  return coords;
}

export function countOccurrences(
  arr: (string | number)[],
  val: string | number
): number {
  return arr.filter((item) => item === val).length;
}

export function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b);
}

export function multiply(arr: number[]): number {
  return arr.reduce((a, b) => a * b);
}

export function median(arr: any[]): any {
  return sortAsc(arr)[Math.floor(arr.length / 2)];
}

export function average(arr: number[]): number {
  return sum(arr) / arr.length;
}

export function sortAsc(arr: any[]): any[] {
  return arr.sort((a, b) => a - b);
}

export function sortDesc(arr: any[]): any[] {
  return arr.sort((a, b) => b - a);
}
