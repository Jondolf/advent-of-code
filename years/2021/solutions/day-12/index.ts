// https://adventofcode.com/2021/day/12

import { Graph } from "../../utils";

export function part1(input: string) {
  const caves = createCaveGraph(formatInput(input));
  const paths = dfs(caves, "start", 0);
  return paths?.length || 0;
}

export function part2(input: string) {
  const caves = createCaveGraph(formatInput(input));
  const paths = dfs(caves, "start", 1);
  return paths?.length || 0;
}

function formatInput(input: string): string[][] {
  return input.split("\n").map((line) => line.trim().split("-"));
}

function createCaveGraph(input: string[][]): Graph {
  const g = new Graph();
  for (const line of input) {
    const [from, to] = line;
    g.addVertex(from);
    g.addVertex(to);
    g.addEdge(from, to);
  }
  return g;
}

function dfs(
  graph: Graph,
  room: string,
  availableRevisits: number,
  paths: string[][] = [],
  currPath: string[] = []
): string[][] {
  // "start" can only be visited once
  if (room === "start" && currPath.includes("start")) {
    return [];
  }

  // Return if all available revisits to small caves used
  if (room.toLowerCase() === room && currPath.includes(room)) {
    if (availableRevisits > 0) {
      availableRevisits--;
    } else {
      return [];
    }
  }

  // Add path to all paths when "end" cave found
  if (room === "end") {
    paths.push(currPath.concat(room));
    return [];
  }

  // Find paths for neighbors recursively until all paths found
  graph.neighbors(room)?.forEach((n) => {
    dfs(graph, n, availableRevisits, paths, currPath.concat(room));
  });

  return paths;
}
