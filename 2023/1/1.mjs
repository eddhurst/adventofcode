import fs from 'fs';

const input = fs.readFileSync('./partTwo.txt', 'utf8');
const data = input.split(/\n/);

let result = 0;

const convertToIntString = (word) => {
  switch (word) {
    case 'one':
      return '1';
    case 'two':
      return '2';
    case 'three':
      return '3';
    case 'four':
      return '4';
    case 'five':
      return '5';
    case 'six':
      return '6';
    case 'seven':
      return '7';
    case 'eight':
      return '8';
    case 'nine':
      return '9';
    default:
      return word;
  }
}

for(let i = 0; i < data.length; i += 1) {  
  const matches = Array.from(data[i].matchAll(/(?=(one)|(?=t)(two)|(three)|(?=f)(four)|(five)|(?=s)(six)|(seven)|(eight)|(nine)|(\d))/g), x=> x.join(''));
  const localResult = convertToIntString(matches[0]) + convertToIntString(matches[matches.length - 1]);
  result = parseInt(result) + parseInt(localResult);
}

console.info(result);