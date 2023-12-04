const partOne = (data) => {
  const realLength = data.length;

  console.info('Starting length:', data.length);

  for(let i = 0; i < data.length; i = i + 1) {
    const cardIndex = [...data[i].matchAll(/Card\W*(\d*)/g)].map(x => parseInt(x[1]))[0] - 1;
    
    // if (i > realLength) console.info('Rerunning card:', cardIndex);

    console.info(cardIndex);

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

    // console.info('Line', i, multiplier)
    
    if (multiplier) {
      // console.info('CARD: ', cardIndex, 'WINS', multiplier);

      for (let j = cardIndex + 1 ; j < cardIndex + 1 + multiplier; j += 1) {
        // console.info('WINNER: ', j);
        data.push(data[j])
      }
    }    
  }

  console.info('Ending length:', data.length);
}

import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');
const data = input.split(/\n/);

const pOne = partOne(data);
// const pTwo = partTwo();

console.info('====================')
console.info(pOne);
