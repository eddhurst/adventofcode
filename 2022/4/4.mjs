import input from './input.mjs'
import test from './test.mjs'

const debug = (a,b) => console.info(a, Object.keys(b).join('-'));

const quickCheck = (elf1, elf2) => {
  const elf1Range = elf1.split('-')
  const elf2Range = elf2.split('-')

  if (parseInt(elf1Range[0]) >= parseInt(elf2Range[0])) {
    if (parseInt(elf1Range[1]) <= parseInt(elf2Range[1])) {
      return true;
    }
  }

  if (parseInt(elf2Range[0]) >= parseInt(elf1Range[0])) {
    if (parseInt(elf2Range[1]) <= parseInt(elf1Range[1])) {
      return true;
    }
  }

  return false;
}

const doesOverlap = (elf1, elf2) => {
  const elf1Range = elf1.split('-')
  const elf1Start = parseInt(elf1Range[0])
  const elf1End = parseInt(elf1Range[1])
  const elf2Range = elf2.split('-')
  const elf2Start = parseInt(elf2Range[0])
  const elf2End = parseInt(elf2Range[1])

  if (elf1Start >= elf2Start && elf1End <= elf2End) {
    return true
  }
  if (elf1Start <= elf2Start && elf1End >= elf2Start) {
    return true
  }
  if (elf1End >= elf2Start && elf1End <= elf2End) {
    return true
  }

  if (elf2Start >= elf1Start && elf2End <= elf1End) {
    return true
  }
  if (elf2Start <= elf1Start && elf2End >= elf1Start) {
    return true
  }
  if (elf2End >= elf1Start && elf2End <= elf1End) {
    return true
  }

  return false;
}

const data = input.split(/\n/);

let rangesSubsumed = 0;
for (let i = 0; i < data.length; i += 1) {
  const elves = data[i].split(',');

  if (doesOverlap(elves[0], elves[1])) {
    rangesSubsumed += 1
  } else {
    console.info(elves)
  }
}

console.info(rangesSubsumed);



// Grand aspirations

// const spreadRange = (range) => {
//   let actualRange = {}
//   const rangeParts = range.split('-')
//   for (let i = rangeParts[0]; i <= rangeParts[1]; i++) {
//     actualRange[i] = 1;
//   }

//   debug('range', actualRange);
//   return actualRange;
// }

// const doesRangeSubsume = (range1, range2) => {
//   const maybeDuplicates = {...range2};

//   Object.keys(range1).forEach((zone) => {
//     if (maybeDuplicates[zone]) {
//       delete maybeDuplicates[zone];
//     }
//   });

//   return !!!Object.keys(maybeDuplicates).length
// }

// const doesPairRangeOverlay = (elf1, elf2) => {
//   const elf1Range = spreadRange(elf1);
//   const elf2Range = spreadRange(elf2);

//   if (doesRangeSubsume(elf1Range, elf2Range)) {
//     return true
//   } else if (doesRangeSubsume(elf2Range, elf1Range)) {
//     return true
//   }

//   return false;
// }
