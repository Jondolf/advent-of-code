// https://adventofcode.com/2021/day/15

import { Coordinate, CoordString, PriorityQueue, strToCoord } from "../../utils";

type RiskVertices = Map<CoordString, number>;
type RiskArray = number[][];

export function part1(input: string) {
  const risksArr = formatInput(input);
  const risks = createRiskMap(risksArr);
  return dijkstra(risksArr, risks);
}

export function part2(input: string) {
  const risksArr = repeatRisks(formatInput(input), 5);
  const risks = createRiskMap(risksArr);
  return dijkstra(risksArr, risks);
}

function formatInput(input: string): RiskArray {
  const rows = input.split("\n");
  return rows.map((r) => r.split("").map((risk) => +risk));
}

function createRiskMap(risks: RiskArray): RiskVertices {
  const riskMap: RiskVertices = new Map();
  for (let y = 0; y < risks.length; y++) {
    for (let x = 0; x < risks[0].length; x++) {
      riskMap.set(`${x},${y}`, Infinity);
    }
  }
  riskMap.set("0,0", 0);
  return riskMap;
}

function repeatRisks(risks: RiskArray, times: number): RiskArray {
  const repeated: RiskArray[] = [];
  const horRepeated = growHorizontal(risks, times);
  // For each vertical repeat, repeat horizontally and increment risks
  for (let i = 0; i < times; i++) {
    repeated.push(horRepeated);
    repeated[i] = repeated[i].map((row) => incrementRisks(row, i));
  }
  return repeated.flat();
}

function growHorizontal(risks: RiskArray, times: number): RiskArray {
  const newRisks = [...risks].map((row) => [...row]); // Copy risks
  // For each row, repeat horizontally a given amount of times and increment risks
  for (let y = 0; y < risks.length; y++) {
    const row = newRisks[y];
    const originalRow = risks[y];
    for (let i = 1; i < times; i++) {
      row.push(...incrementRisks(originalRow, i));
    }
  }
  return newRisks;
}

function incrementRisks(risks: number[], amount: number): number[] {
  let newRisks = [...risks];
  for (let i = 1; i <= amount; i++) {
    newRisks = newRisks.map((risk) => (risk + 1 <= 9 ? risk + 1 : 1));
  }
  return newRisks;
}

function dijkstra(risksArr: RiskArray, risks: RiskVertices) {
  const visited: RiskVertices = new Map();
  const queue = new PriorityQueue<CoordString>(); // Risks will be added to queue in ascending order
  queue.enqueue("0,0", 0);

  const end = `${risksArr[0].length - 1},${risksArr.length - 1}`;

  while (queue.size > 0) {
    const lowestRisk = queue.dequeue()!;

    if (visited.has(lowestRisk.key)) {
      continue;
    }
    visited.set(lowestRisk.key, lowestRisk.priority);

    const neighbors = adjacent(risks, strToCoord(lowestRisk.key));
    const unvisitedNeighbors = neighbors.filter(([coord, _]) => !visited.has(coord));
    for (let [coord, oldRisk] of unvisitedNeighbors) {
      const { x, y } = strToCoord(coord);
      // Total risk to current position + neighbor's risk
      const neighborTotalRisk = lowestRisk.priority + risksArr[y][x];
      queue.enqueue(coord, neighborTotalRisk);
      // Found lower risk path to neighbor -> set neighbor's new total risk
      if (neighborTotalRisk < oldRisk) {
        risks.set(coord, neighborTotalRisk);
      }
    }
    // Return lowest possible risk when end reached
    if (lowestRisk.key === end) {
      return lowestRisk.priority;
    }
  }
  return Infinity;
}

function adjacent(risks: RiskVertices, { x, y }: Coordinate) {
  const neighborCoords = [
    [x, y - 1],
    [x, y + 1],
    [x - 1, y],
    [x + 1, y],
  ];
  return neighborCoords
    .map(([x, y]) => [`${x},${y}`, risks.get(`${x},${y}`)!] as [CoordString, number])
    .filter((val) => risks.has(val[0]));
}
