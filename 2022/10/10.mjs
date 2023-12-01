import test from './test.mjs'
import input from './input.mjs'

const data = input.split(/\n/)

let tick = 0
let registerX = 1;

let screenOutput = ['','','','','','', '']
let screenRow = 0

const drawPixel = (tick) => {
  let output = '.'
  let screenCol = tick - (screenRow * 40)

  if ([screenCol - 2, screenCol - 1, screenCol].indexOf(registerX) > -1) {
    output = '#'
  }

  screenOutput[screenRow] += output

  if (tick % 40 === 0) {
    screenRow += 1
  }

  console.info(`During cycle  ${tick}: CRT draws pixel in position ${screenOutput[screenRow].length - 1}`)
  console.info(`Current CRT row: ${screenOutput[screenRow]}`)
}

const run = () => {
  for (let i = 0; i < data.length; i += 1) {
    const instruction = data[i].match(/[a-z]+/g)[0]
    let num = 0;
    let busy = 0

    switch (instruction) {
      case 'noop':
        busy = 1
        break
      case 'addx':
        busy = 2
        num = data[i].match(/[-?\d]+/g)[0]
        break
      default:
        busy = 0
        break
    }

    console.info(`Start cycle   ${tick + 1}: begin executing ${instruction}${num ? ` ${num}` : ''}`)

    while (busy > 0) {
      tick += 1

      drawPixel(tick)
      busy -= 1

      if (busy === 0 && num) {
        registerX += Number(num)
      } else {
        console.info('');
      }
    }

    console.info(`End of cycle  ${tick}: finish executing ${instruction}${num ? ` ${num}` : ''} (Register X is now ${registerX})`)

    const spritePos = Array(40).fill('.')
    spritePos[registerX - 1] = '#'
    spritePos[registerX] = '#'
    spritePos[registerX + 1] = '#'

    console.info(`Sprite position: ${spritePos.join('')}`)
    console.info('')
  }
}

run()

console.info()


screenOutput.forEach(row => {
  console.info(row)
})


// registerX = 8
// screenOutput[0] = '##..##..'
// tick = 9
// drawPixel(tick)

// tick += 1
// drawPixel(tick)

/**
 *
 *
 *
 *

During cycle  8: CRT draws pixel in position 7
Current CRT row: ##..##..
End of cycle  8: finish executing addx -3 (Register X is now 8)
Sprite position: .......###..............................

Start cycle   9: begin executing addx 5
During cycle  9: CRT draws pixel in position 8
Current CRT row: ##..##..#

During cycle  10: CRT draws pixel in position 9
Current CRT row: ##..##..#.
End of cycle  10: finish executing addx 5 (Register X is now 13)
Sprite position: ............###.........................

 *
 */