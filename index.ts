import { runDay } from "./util/run-day";

const argv = process.argv.slice(2);
const [year, day] = argv;

async function main() {
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
      runDay(+year, +day);
    } catch (_) {
      console.error(`Year ${year} day ${day} not implemented.`);
    }
  }
}

main();
