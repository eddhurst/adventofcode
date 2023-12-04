const partTwo = (data) => {
  for(let i = 0; i < data.length; i = i + 1) {
    const cardIndex = [...data[i].matchAll(/Card\W*(\d*)/g)].map(x => parseInt(x[1]))[0] - 1;
    const [results, numbers] = data[cardIndex].replace(/^Card\W*\d+: /g, '').split('| ');
    
    const winning = {};
    let multiplier = 0;
    
    [...results.matchAll(/\d+/g)].forEach(([match]) => {
      winning[parseInt(match)] = true;
    });

    [...numbers.matchAll(/\d+/g)].forEach(([match]) => {
      if (winning[parseInt(match)]) {
        multiplier += 1;
      }
    });
    
    if (multiplier) {
      for (let j = cardIndex + 1 ; j < cardIndex + 1 + multiplier; j += 1) {
        data.push(data[j])
      }
    }    
  }

  return data.length;
}

import fs from 'fs';

const input = fs.readFileSync('./test.txt', 'utf8');
const data = input.split(/\n/);

const results = partTwo(data);

console.info('====================')
console.info(results);
