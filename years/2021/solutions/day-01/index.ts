export function part1(input: string) {
  const numbers = formatInput(input);
  const numIncreases = countIncrements(numbers);
  return numIncreases;
}

export function part2(input: string) {
  const numbers = formatInput(input);
  let sums: number[] = [];
  for (let i = 0; i < numbers.length - 2; i++) {
    sums.push(numbers[i] + numbers[i + 1] + numbers[i + 2]);
  }
  const numIncreases = countIncrements(sums);
  return numIncreases;
}

function formatInput(input: string): number[] {
  return input.split("\n").map((val) => +val);
}

function countIncrements(arr: number[]): number {
  let count = 0;
  let prev: number | null = null;
  for (const val of arr) {
    if (prev && val > prev) {
      count++;
    }
    prev = val;
  }
  return count;
}
