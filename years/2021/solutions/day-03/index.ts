// https://adventofcode.com/2021/day/3

export function part1(input: string) {
  const columns = getColumns(formatInput(input)).map((num) => num.join(""));
  let [gammaRate, epsilonRate] = ["", ""];
  for (const column of columns) {
    const zeroCount = countOccurrences(column, "0");
    gammaRate += zeroCount > column.length / 2 ? "1" : "0";
    epsilonRate += zeroCount > column.length / 2 ? "0" : "1";
  }
  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
}

export function part2(input: string) {
  const formattedInput = formatInput(input);
  let [generatorRatingArr, scrubberRatingArr] = [
    formattedInput,
    formattedInput,
  ];
  for (let i = 0; generatorRatingArr.length > 1; i++) {
    const column = [];
    for (let j = 0; j < generatorRatingArr.length; j++) {
      column.push(generatorRatingArr[j][i]);
    }
    const [zero, one] = [
      countOccurrences(column.join(""), "0"),
      countOccurrences(column.join(""), "1"),
    ];
    generatorRatingArr = generatorRatingArr.filter(
      (num) => num[i] === (zero <= one ? "1" : "0")
    );
  }
  for (let i = 0; scrubberRatingArr.length > 1; i++) {
    const column = [];
    for (let j = 0; j < scrubberRatingArr.length; j++) {
      column.push(scrubberRatingArr[j][i]);
    }
    const [zero, one] = [
      countOccurrences(column.join(""), "0"),
      countOccurrences(column.join(""), "1"),
    ];
    scrubberRatingArr = scrubberRatingArr.filter(
      (num) => num[i] === (zero <= one ? "0" : "1")
    );
  }
  const [generatorRating, scrubberRating] = [
    parseInt(generatorRatingArr[0].join(""), 2),
    parseInt(scrubberRatingArr[0].join(""), 2),
  ];
  return generatorRating * scrubberRating;
}

const formatInput = (input: string) =>
  input.split("\n").map((num) => num.trim().split(""));

/**
 * Gets the columns of a 2D array. The length of each sub-array **must** be the same.
 */
function getColumns<T>(arr: T[][]): T[][] {
  const columns: T[][] = [];
  for (let i = 0; i < arr[0].length; i++) {
    columns.push(getColumAt(arr, i));
  }
  return columns;
}

function getColumAt<T>(arr: T[][], pos: number): T[] {
  const column = [];
  for (let i = 0; i < arr.length; i++) {
    column.push(arr[i][pos]);
  }
  return column;
}

function countOccurrences(target: string, str: string): number {
  return (target.match(new RegExp(str, "g")) || []).length;
}
