import * as fs from "fs";
import path = require("path");

export function getInput(year: number, day: number): string {
  const dayPath = `years/${year}/solutions/day-${day
    .toString()
    .padStart(2, "0")}`;
  const input = fs.readFileSync(path.join(dayPath, "input.txt"), {
    encoding: "utf-8",
  });
  return input;
}
