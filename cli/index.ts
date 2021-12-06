import { getInput } from "./get-input";
import { runDay } from "./run-day";

const argv = process.argv.slice(2);
const [year, day] = argv;

function run() {
  if ((year === "all" && day === "all") || (year === "all" && !day)) {
    for (let year = 2015; year <= 2021; year++) {
      console.log(`\n-- ${year} --`);
      for (let day = 1; day <= 25; day++) {
        try {
          runDay(+year, day);
        } catch (_) {}
      }
    }
  } else if (year && day === "all") {
    console.log(`-- ${year} --`);
    for (let day = 1; day <= 25; day++) {
      try {
        runDay(+year, day);
      } catch (_) {}
    }
  } else if (year === "all" && day) {
    for (let year = 2015; year <= 2021; year++) {
      console.log(`\n-- ${year} --`);
      try {
        runDay(+year, +day);
      } catch (_) {}
    }
  } else {
    try {
      console.log(`-- ${year} --`);
      runDay(+year, +day);
    } catch (error) {
      console.error(error);
    }
  }
}

export { run, runDay, getInput };
