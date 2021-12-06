import { sum } from "../../utils/sum";

export function part1(input: string) {
  const timers = input.split(",").map((val) => +val);
  return simulatePopulationGrowth(timers, 6, 2, 80);
}

export function part2(input: string) {
  const timers = input.split(",").map((val) => +val);
  return simulatePopulationGrowth(timers, 6, 2, 256);
}

function simulatePopulationGrowth(
  timers: number[],
  adultReproRate: number,
  timeToAdult: number,
  simLength: number
): number {
  const childTimeToRepro = timeToAdult + adultReproRate;
  // Counter for how many individuals have the same time until next reproduction
  let timerCounter = arrToCounterMap(timers, 0, childTimeToRepro);

  for (let i = 0; i < simLength; i++) {
    // This generation's timer counter
    const genTimerCounter = arrToCounterMap([], 0, childTimeToRepro);

    for (let [timer, count] of timerCounter.entries()) {
      if (timer === 0) {
        // Create children and reset adults' timers
        genTimerCounter.set(childTimeToRepro, count);
        genTimerCounter.set(adultReproRate, count);
      } else {
        // Decrease timer counters
        const prevTimerCount = genTimerCounter.get(timer - 1)!;
        genTimerCounter.set(timer - 1, prevTimerCount + count);
      }
    }
    timerCounter = genTimerCounter;
  }

  return sum([...timerCounter.values()]);
}

/**
 * Creates a counter map from an array.
 * The map will have the occurrence rates of the array's values in a given range.
 */
function arrToCounterMap(
  arr: number[],
  min: number,
  max: number
): Map<number, number> {
  const counter = new Map<number, number>();
  for (let i = min; i <= max; i++) {
    counter.set(i, arr.filter((val) => val === i).length);
  }
  return counter;
}
