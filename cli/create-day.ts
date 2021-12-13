import * as fs from "fs";
import axios from "axios";
const TurndownService = require("turndown");

const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});

export function createDay(year: number, day: number) {
  try {
    const dir = `years/${year}/solutions/day-${day
      .toString()
      .padStart(2, "0")}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    createSolutionFile(dir, year, day);
    createInputFile(dir, year, day);
    createDescriptionFile(dir, year, day);
  } catch (error) {
    throw new Error(
      `❌ Couldn't create year ${year} day ${day} file. ${error}`
    );
  }
}

async function createSolutionFile(dir: string, year: number, day: number) {
  try {
    const daySolutionTemplate = `// https://adventofcode.com/${year}/day/${day}

export function part1(input: string) {
  return "Not implemented yet.";
}

export function part2(input: string) {
  return "Not implemented yet.";
}
`;
    if (!fs.existsSync(`${dir}/index.ts`)) {
      fs.writeFileSync(`${dir}/index.ts`, daySolutionTemplate);
      console.log(
        `✔ Year ${year} day ${day} solution file successfully created.`
      );
    } else {
      console.log(`Year ${year} day ${day} solution file already exists.`);
    }
  } catch (error) {
    throw new Error(
      `❌ Couldn't create year ${year} day ${day} solution file. ${error}`
    );
  }
}

async function createInputFile(dir: string, year: number, day: number) {
  try {
    if (!fs.existsSync(`${dir}/input.txt`)) {
      fs.writeFileSync(`${dir}/input.txt`, "");
      console.log(`✔ Year ${year} day ${day} input file successfully created.`);
    } else {
      console.log(`Year ${year} day ${day} input file already exists.`);
    }
  } catch (error) {
    throw new Error(
      `❌ Couldn't create year ${year} day ${day} input file. ${error}`
    );
  }
}

async function createDescriptionFile(dir: string, year: number, day: number) {
  try {
    if (!fs.existsSync(`${dir}/README.md`)) {
      const description = await getPuzzleDescription(year, day);
      fs.writeFileSync(`${dir}/README.md`, description);
      console.log(
        `✔ Year ${year} day ${day} description file successfully created.`
      );
    } else {
      console.log(`Year ${year} day ${day} description file already exists.`);
    }
  } catch (error) {
    throw new Error(
      `❌ Couldn't create year ${year} day ${day} description file. ${error}`
    );
  }
}

async function getPuzzleDescription(
  year: number,
  day: number
): Promise<string> {
  try {
    const response = await axios.get(
      `https://adventofcode.com/${year}/day/${day}`
    );
    const html = (response.data as string)
      .match(/<article class="day-desc">(.|\n)*?<\/article>/g)![0]
      .replace(
        /<h2>--- /g,
        `<h2><a href="https://adventofcode.com/${year}/day/${day}">`
      )
      .replace(/ ---<\/h2>/g, "</a></h2>")
      .replace(/<em/g, "<strong")
      .replace(/<\/em>/g, "</strong>");
    const markdown: string = turndownService.turndown(html);
    return markdown;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
