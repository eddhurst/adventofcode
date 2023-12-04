const matches = {
  symbols: {},
  numbers: {}
};

const touching = {}

const symbolMatch = new RegExp(/(\d+)|([^a-z\n\.])/, 'gi');

const partOne = (data) => {
  for (let i=0; i < data.length; i=i+1) {
    [...data[i].matchAll(symbolMatch)].forEach(x => {
      if (x[1]) {
        if (!matches.numbers[i]) matches.numbers[i] = []
        matches.numbers[i].push({
          number: parseInt(x[0]),
          startIndex: x.index,
          endIndex: x.index + x[0].length - 1,
        })

      } else {
        if (!matches.symbols[i]) matches.symbols[i] = {}
        matches.symbols[i][x.index] = x[0];

        if (x[0] === '*') {
          if (!touching[i]) touching[i] = {}
          touching[i][x.index] = [];
        }
      }
    });
  }

  const results = Object.keys(matches.numbers).reduce((acc, key) => {
    const line = parseInt(key); // object keys are always parsed as strings

    return acc + matches.numbers[line].reduce((acc, match) => {
      let touchesSymbol = false;

      for (let i = match.startIndex - 1; i <= match.endIndex + 1; i = i + 1) {
        // ABOVE
        if (matches.symbols[line - 1] && matches.symbols[line - 1][i]) {
          touchesSymbol = true;
          if (matches.symbols[line - 1][i] === '*') touching[line - 1][i].push(match.number);
        }

        // INFRONT
        if (i === match.startIndex - 1) {
          if (matches.symbols[line] && matches.symbols[line][i]) {
            touchesSymbol = true;
            if (matches.symbols[line][i] === '*') touching[line][i].push(match.number);
          }
        }

        // BEHIND
        if (i === match.endIndex + 1) {
          if (matches.symbols[line] && matches.symbols[line][i]) {
            touchesSymbol = true;

            if (matches.symbols[line][i] === '*') touching[line][i].push(match.number);
          }
        }

        // BELOW
        if (matches.symbols[line + 1] && matches.symbols[line + 1][i]) {
          touchesSymbol = true;

          if (matches.symbols[line + 1][i] === '*') touching[line + 1][i].push(match.number);
        }
      }

      if (touchesSymbol) {
        return acc + match.number
      }

      return acc
    }, 0)
  }, 0)

  return results;
}

const partTwo = () => (
  Object.keys(touching).reduce((acc, line) => {
    console.info(line);

    const ratio = Object.keys(touching[line]).reduce((acc, match) => {
      const gear = touching[line][match]

      if (gear.length !== 2) {
        return acc;
      }

      console.info(gear);

      return acc + gear.reduce((acc, x) => acc * x, 1);
    }, 0);

    return acc + ratio;
  }, 0)
)

import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');
const data = input.split(/\n/);

const pOne = partOne(data);
const pTwo = partTwo();

console.info('====================')
console.info(pTwo);





/**
 *
{
  symbols: {
    '0': { '3': '+', '6': '$', '7': '!' },
    '1': { '6': '/' },
    '2': { '3': '*' }
  },
  numbers: { '1': [ [Object] ] }
}
 *
 */