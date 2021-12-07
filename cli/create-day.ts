import * as fs from "fs";

export function createDay(year: number, day: number) {
  try {
    const dir = `years/${year}/solutions/day-${day
      .toString()
      .padStart(2, "0")}`;
    const daySolutionTemplate = `export function part1(input: string) {
  return "Not implemented yet.";
}

export function part2(input: string) {
  return "Not implemented yet.";
}
`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    if (!fs.existsSync(`${dir}/index.ts`)) {
      fs.writeFileSync(`${dir}/index.ts`, daySolutionTemplate);
      console.log(
        `✔ Year ${year} day ${day} solution file successfully created.`
      );
    } else {
      console.log(`Year ${year} day ${day} solution file already exists.`);
    }

    if (!fs.existsSync(`${dir}/input.txt`)) {
      fs.writeFileSync(`${dir}/input.txt`, "");
      console.log(`✔ Year ${year} day ${day} input file successfully created.`);
    } else {
      console.log(`Year ${year} day ${day} input file already exists.`);
    }
  } catch (error) {
    throw new Error(
      `❌ Couldn't create year ${year} day ${day} file. ${error}`
    );
  }
}
