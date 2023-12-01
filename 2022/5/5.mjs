import { cargo, instructions } from './input.mjs'
// import { cargo, instructions } from './test.mjs'

const moveCargo = (instruction, stacks) => {
  for (let i = 0; i < instruction[0]; i += 1) {
    let container = stacks[instruction[1] - 1].pop()
    stacks[instruction[2] - 1].push(container)
  }

  return stacks;
}

const moveCargo9001 = ([moveNum, from, to], stacks) => {
  let containers = stacks[from - 1].splice(stacks[from - 1].length - moveNum, Infinity)
  stacks[to - 1].push(...containers)
  return stacks
}

const handleInstructions = () => {
  const instructionsSplit = instructions.split(/\n/);
  return instructionsSplit.reduce(
    (acc, instruction) => moveCargo9001(instruction.match(/\d+/g), acc),
    [...cargo]
  );
}

const whosOnFirst = (shipyard) => shipyard.reduce((acc, containers) => [...acc, containers.pop()], [])

const finalConfig = handleInstructions();
const result = whosOnFirst(finalConfig);

console.info(result.join(''))