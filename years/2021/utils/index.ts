export class Graph {
  private adjList = new Map<string, Set<string>>();

  constructor() {}

  neighbors(v: string): Set<string> | undefined {
    return this.adjList.get(v);
  }

  addVertex(v: string) {
    if (!this.adjList.has(v)) {
      this.adjList.set(v, new Set());
    }
  }

  removeVertex(v: string): boolean {
    return this.adjList.delete(v);
  }

  addEdge(v: string, w: string) {
    this.adjList.get(v)?.add(w);
    this.adjList.get(w)?.add(v);
  }

  removeEdge(v: string, w: string): boolean | undefined {
    return this.adjList.get(v)?.delete(w);
  }
}

export class PriorityQueue<T> {
  constructor(public elements: PriorityQueueElement<T>[] = []) {}

  get size() {
    return this.elements.length;
  }

  get names() {
    return this.elements.map((val) => val.key);
  }

  enqueue(value: T, priority: number) {
    const newEl = new PriorityQueueElement<T>(value, priority);
    let added = false;

    for (let i = 0; i < this.elements.length; i++) {
      if (newEl.priority < this.elements[i].priority) {
        this.elements.splice(i, 0, newEl);
        added = true;
        break;
      }
    }

    if (!added) {
      this.elements.push(newEl);
    }
    return this.elements;
  }

  dequeue() {
    return this.elements.shift();
  }
}

class PriorityQueueElement<T> {
  constructor(public key: T, public priority: number) {}
}

export interface Coordinate {
  x: number;
  y: number;
}

export type CoordString = `${number},${number}`;

export function strToCoord(str: CoordString): Coordinate {
  const [x, y] = str.split(",");
  return { x: +x, y: +y };
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

export function countOccurrences(arr: (string | number)[], val: string | number): number {
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
