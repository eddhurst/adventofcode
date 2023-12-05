const parseData = (raw) => {
  const data = {};
  let key = 'seeds';

  return raw.reduce((acc, line) => {
    if (line === '') return acc;

    switch (line) {
      case 'seeds:':
      case 'seed-to-soil map:':
      case 'soil-to-fertilizer map:':
      case 'fertilizer-to-water map:':
      case 'water-to-light map:':
      case 'light-to-temperature map:':
      case 'temperature-to-humidity map:':
      case 'humidity-to-location map:':
        key = line.replace(/(\Wmap)?:/g, '');
        acc[key] = {};
        return acc;
    }

    if (key === 'seeds') {
      acc[key] = line.split(' ');
    } else {
      const [source, destination, range] = line.split(' ');
      acc[key][destination] = {
        destination: parseInt(destination), source: parseInt(source), range: parseInt(range),
        diff: parseInt(source) - parseInt(destination)
      };
    }

    return acc;
  }, {});
}

const partOne = (data) => {
  const result = data.seeds.map(seed => {
    console.info('SEED: ', seed);

    const keys = [
      'seed-to-soil',
      'soil-to-fertilizer',
      'fertilizer-to-water',
      'water-to-light',
      'light-to-temperature',
      'temperature-to-humidity',
      'humidity-to-location',
    ];


    return keys.reduce((location, key) => {
      console.info('----------')
      const previousLocation = location;

      let range;
      const availableRanges = Object.keys(data[key]);

      // OCCURS INSIDE RANGE
      for (let i = 0; i < availableRanges.length; i += 1) {
        const index = availableRanges[i];

        if (previousLocation >= parseInt(index)) {
          if (previousLocation < parseInt(index) + data[key][index].range) {
            range = data[key][index];
            break;
          }
        }

        if (i === availableRanges.length - 1) {
          console.info('TOO LARGE')
        }
      }

      if (!range) {
        console.info('TOO SMALL');
        location = previousLocation;
      } else {
        console.info(range);
        // const diff = range.source - range.destination;
        location = location + range.diff;
      }

      console.info(key, 'ends on', location);

      return location
    }, parseInt(seed));
  });

  return result;
}

import fs from 'fs';

const input = fs.readFileSync('./input.txt', 'utf8');
const data = input.split(/\n/);

const parsed = parseData(data);

console.info(parsed);

const pOne = partOne(parsed);

console.info('====================')

console.info(pOne);

console.info(pOne.sort((a,b) => {
  if (a === b) return 0;
  return a < b ? -1 : 1
}));
