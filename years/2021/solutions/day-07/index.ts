// https://adventofcode.com/2021/day/7

import { average, median, sortAsc, sum } from "../../utils";

export function part1(input: string) {
  const positions = sortAsc(formatInput(input));
  return sum(consumptions(positions, median(positions)));
}

export function part2(input: string) {
  const positions = formatInput(input);
  const target = Math.floor(average(positions));
  const baseConsumption = consumptions(positions, target); // 1 step costs 1 fuel
  return sum(baseConsumption.map((val) => (val ** 2 + val) / 2)); // Step cost increases by 1 fuel for every step
}

const formatInput = (input: string) => input.split(",").map((pos) => +pos);

/** Fuel consumption of moving to target when 1 step costs 1 fuel */
const consumptions = (positions: number[], targetPos: number) =>
  positions.map((pos) => Math.abs(pos - targetPos));
