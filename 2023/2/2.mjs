import fs from 'fs';

const input = fs.readFileSync('./test.txt', 'utf8');
const data = input.split(/\n/);

const MAX_COLORS = {
  red: 12,
  green: 13,
  blue: 14
}

const isHandInvalid = (shown) => {
  const hand = {
    red: 0,
    green: 0,
    blue: 0,
    invalid: false
  };

  const matches = Array.from(shown.matchAll(/(\d+) (blue|red|green)/g), x => {
    const [_, num, color] = x;
    hand[color] = parseInt(num);

    if (hand[color] > MAX_COLORS[color]) {
      hand.invalid = true;
    }
  });

  return hand.invalid;
}


const result = data.reduce((acc, game, index) => {
  const hands = game.split(':')[1].split(';');
  const isInvalid = hands.some(hand => isHandInvalid(hand))
  return isInvalid ? acc : acc + index + 1
}, 0)

console.info(result);
