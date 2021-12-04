interface Command {
  dir: Direction;
  val: number;
}

type Direction = "forward" | "up" | "down";

export function part1(input: string) {
  const commands = formatInput(input);
  let [x, depth] = move(commands);
  return x * depth;
}

export function part2(input: string) {
  const commands = formatInput(input);
  let [x, depth] = moveWithAim(commands);
  return x * depth;
}

function formatInput(input: string): Command[] {
  return input.split("\n").map((command) => {
    const [dir, val] = command.split(" ");
    return {
      dir,
      val: +val,
    } as Command;
  });
}

function move(commands: Command[]): [number, number] {
  let [x, depth] = [0, 0, 0];
  for (const command of commands) {
    switch (command.dir) {
      case "forward":
        x += command.val;
        break;
      case "up":
        depth -= command.val;
        break;
      case "down":
        depth += command.val;
        break;
    }
  }
  return [x, depth];
}

function moveWithAim(commands: Command[]): [number, number] {
  let [x, depth, aim] = [0, 0, 0];
  for (const command of commands) {
    switch (command.dir) {
      case "forward":
        x += command.val;
        depth += command.val * aim;
        break;
      case "up":
        aim -= command.val;
        break;
      case "down":
        aim += command.val;
        break;
    }
  }
  return [x, depth];
}
