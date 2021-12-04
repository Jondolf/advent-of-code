import { getInput } from "./get-input";

export function runDay(year: number, day: number) {
  try {
    const input = getInput(year, day);
    const { part1, part2 } = require(`../years/${year}/solutions/day-${day
      .toString()
      .padStart(2, "0")}`);
    console.log(`\n✨ AoC ${year} day ${day} part 1:`, part1(input));
    console.log(`✨ AoC ${year} day ${day} part 2:`, part2(input));
  } catch (error) {
    throw new Error(`Couldn't run year ${year} day ${day}.`);
  }
}
