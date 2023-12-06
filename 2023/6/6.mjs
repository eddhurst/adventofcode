const parseData = (data) => {
  const result = [...data[0].replace(/\W/g,'').matchAll(/\d+/g)].map(x => ({ time: x[0] }));
  [...data[1].replace(/\W/g,'').matchAll(/\d+/g)].forEach(
    (x, index) => {result[index] = {...result[index], distance: x[0]}}
  );

  return result;
}

const partOne = (data) => {
  const result = data.reduce((acc, round) => {
    let wins = 0;
    
    for (let i = 0; i < round.time; i += 1) {
      if (i * (round.time - i) > round.distance) {
        wins += 1;
      }
    }

    return [...acc, wins];
  }, [])

  return result.reduce((acc, wins) => acc * wins, 1);
}

import fs from 'fs';

console.time('test')
const input = fs.readFileSync('./input.txt', 'utf8');
const data = input.split(/\n/);

const parsed = parseData(data);
const one = partOne(parsed);

console.info('=================')
console.info(one);

console.timeEnd('test');