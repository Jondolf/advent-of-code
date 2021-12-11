import { median, sum } from "../../utils";

type OpeningBracket = "(" | "[" | "{" | "<";
type ClosingBracket = ")" | "]" | "}" | ">";
type Bracket = OpeningBracket | ClosingBracket;

export function part1(input: string) {
  const lines = formatInput(input);
  const corrupt = lines.filter((line) => getScore(line, false));
  const scores = corrupt.map((line) => getScore(line, false)!);
  return sum(scores);
}

export function part2(input: string) {
  const lines = formatInput(input);
  const incomplete = lines.filter((line) => !getScore(line, false));
  const scores = incomplete.map((line) => getScore(line, true)!);
  return median(scores);
}

function formatInput(input: string): Bracket[][] {
  return input.split("\n").map((line) => line.trim().split("")) as Bracket[][];
}

const opening = ["(", "[", "{", "<"];

const bracketMatching = {
  "(": ")" as ClosingBracket,
  "[": "]" as ClosingBracket,
  "{": "}" as ClosingBracket,
  "<": ">" as ClosingBracket,
};

const bracketIllegalPoints = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const bracketAutocompletePoints = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
};

function getScore(line: Bracket[], incomplete: boolean): number | undefined {
  const openingBrackets: OpeningBracket[] = [];

  for (const bracket of line) {
    if (opening.includes(bracket)) {
      openingBrackets.push(bracket as OpeningBracket);
    } else {
      const lastBracket = openingBrackets.pop()!;
      if (bracketMatching[lastBracket] !== bracket) {
        return bracketIllegalPoints[bracket as ClosingBracket];
      }
    }
  }

  if (incomplete) {
    return getCompletionScore(
      openingBrackets.reverse().map((bracket) => bracketMatching[bracket])
    );
  }
}

function getCompletionScore(brackets: ClosingBracket[]): number {
  return brackets
    .map((b) => bracketAutocompletePoints[b])
    .reduce((prev, curr) => prev * 5 + curr);
}
