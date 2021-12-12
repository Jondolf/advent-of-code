import { getInput } from "./get-input";
import { performance } from "perf_hooks";

export function runDay(year: number, day: number) {
  try {
    const input = getInput(year, day);
    const { part1, part2 } = require(`../years/${year}/solutions/day-${day
      .toString()
      .padStart(2, "0")}`);

    const startTime1 = performance.now();
    const res1 = part1(input);
    const dur1 = performance.now() - startTime1;

    const startTime2 = performance.now();
    const res2 = part2(input);
    const dur2 = performance.now() - startTime2;

    console.log(`\nDay ${day} part 1:`, res1, `(${dur1.toFixed(2)} ms)`);
    console.log(`Day ${day} part 2:`, res2, `(${dur2.toFixed(2)} ms)`);
  } catch (error) {
    throw new Error(`Couldn't run year ${year} day ${day}. ${error}`);
  }
}
