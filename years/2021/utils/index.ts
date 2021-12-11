export interface Coordinate {
  x: number;
  y: number;
}

export function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b);
}

export function multiply(arr: number[]): number {
  return arr.reduce((a, b) => a * b);
}

export function median(arr: any[]): any {
  return arr[Math.round(arr.length / 2)];
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
