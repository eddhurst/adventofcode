import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');
const data = input.split(/\n/);

const checkMaxCubes = (shown, maxCubes) => {
  const cubes = {...maxCubes};
  Array.from(shown.matchAll(/(\d+) (blue|red|green)/g), x => {
    const [_, num, color] = x;
    const colorShown = parseInt(num)

    if (colorShown > cubes[color]) {
      cubes[color] = colorShown
    }
  });
  return cubes;
}

const result = data.reduce((acc, game) => {
  const hands = game.split(':')[1].split(';');
  const cubes = hands.reduce((acc, hand) => checkMaxCubes(hand, acc), { red: 0, green: 0, blue: 0 });
  return acc + (cubes.red * cubes.green * cubes.blue);
}, 0)

console.info(result);
