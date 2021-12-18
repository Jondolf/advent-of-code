import * as fs from "fs";
import axios from "axios";
const TurndownService = require("turndown");
const sessionCookie = fs.readFileSync("session-cookie.txt").toString();

const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});

export function createDay(year: number, day: number) {
  try {
    const dir = `years/${year}/solutions/day-${day.toString().padStart(2, "0")}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    createSolutionFile(dir, year, day);
    createInputFile(dir, year, day);
    createDescriptionFile(dir, year, day);
  } catch (error) {
    throw new Error(`❌ Couldn't create year ${year} day ${day} file. ${error}`);
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
      console.log(`✔ Year ${year} day ${day} solution file successfully created.`);
    } else {
      console.log(`Year ${year} day ${day} solution file already exists.`);
    }
  } catch (error) {
    throw new Error(`❌ Couldn't create year ${year} day ${day} solution file. ${error}`);
  }
}

async function createInputFile(dir: string, year: number, day: number) {
  try {
    if (!fs.existsSync(`${dir}/input.txt`)) {
      const response = await axios.get(`https://adventofcode.com/${year}/day/${day}/input`, {
        headers: { cookie: `session=${sessionCookie}` },
        responseType: "text",
      });
      const input = (response.data as string).trimEnd();
      fs.writeFileSync(`${dir}/input.txt`, input);
      console.log(`✔ Year ${year} day ${day} input file successfully created.`);
    } else {
      console.log(`Year ${year} day ${day} input file already exists.`);
    }
  } catch (error) {
    throw new Error(`❌ Couldn't create year ${year} day ${day} input file. ${error}`);
  }
}

async function createDescriptionFile(dir: string, year: number, day: number) {
  try {
    const file: string | null = fs.existsSync(`${dir}/README.md`)
      ? fs.readFileSync(`${dir}/README.md`).toString()
      : null;
    const description = await getDescriptionMarkdown(year, day);
    if (!file || (file && !file.includes("Part Two") && description.includes("Part Two"))) {
      fs.writeFileSync(`${dir}/README.md`, description);
      console.log(
        !file
          ? `✔ Year ${year} day ${day} description file successfully created.`
          : `✔ Year ${year} day ${day} part 2 description successfully created.`
      );
    } else {
      console.log(`Year ${year} day ${day} description file already exists.`);
    }
  } catch (error) {
    throw new Error(`❌ Couldn't create year ${year} day ${day} description file. ${error}`);
  }
}

async function getDescriptionMarkdown(year: number, day: number): Promise<string> {
  try {
    const response = await axios.get(`https://adventofcode.com/${year}/day/${day}`, {
      headers: { cookie: `session=${sessionCookie}` },
      responseType: "text",
    });
    const markdown: string = turndownService.turndown(
      formatDescriptionHtml(response.data, year, day)
    );
    return markdown;
  } catch (error) {
    throw new Error(`${error}`);
  }
}

function formatDescriptionHtml(html: string, year: number, day: number): string {
  return html
    .match(/<article class="day-desc">(.|\n)*?<\/article>/g)!
    .join("\n")
    .replace(/<h2>--- /g, `<h2><a href="https://adventofcode.com/${year}/day/${day}">`)
    .replace(
      /<h2 id="part2">--- /g,
      `<h2 id="part2"><a href="https://adventofcode.com/${year}/day/${day}#part2">`
    )
    .replace(/ ---<\/h2>/g, "</a></h2>")
    .replace(/<em/g, "<strong")
    .replace(/<\/em>/g, "</strong>");
}
