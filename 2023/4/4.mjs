const partOne = (data) => {
  let totalWinners = 0;

  for(let i = 0; i < data.length; i = i + 1) {
    const [results, numbers] = data[i].replace(/^Card\W*\d+: /g, '').split('| ');
    
    const winning = {};
    let multiplier = 0;
    
    [...results.matchAll(/\d+/g)].forEach(([match]) => {
      winning[parseInt(match)] = true;
    });

    [...numbers.matchAll(/\d+/g)].forEach(([match]) => {
      if (winning[parseInt(match)]) {
        multiplier = multiplier === 0 ? 1 : multiplier * 2;
      }
    });

    console.info('Line', i, multiplier)
    
    if (multiplier) {
      totalWinners += multiplier;
    }    
  }

  return totalWinners;
}

import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');
const data = input.split(/\n/);

const pOne = partOne(data);
// const pTwo = partTwo();

console.info('====================')
console.info(pOne);
