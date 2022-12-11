import test, { testLarge, custom } from './test.mjs'
import input from './input.mjs'

const data = input.split(/\n/)

// why fight the loop when I can just set the initial value we expect
let touched = { 12: { 15: true } }
let snake = [[12,15],[12,15],[12,15],[12,15],[12,15],[12,15],[12,15],[12,15],[12,15],[12,15]]
let numTouched = 0

const debugBoard = () => {
  console.info('\n')
  for (let y = 1; y <= 25; y += 1) {
    let row = '';

    for (let x = 1; x <= 25; x += 1) {
      let snakeInSpot = snake.every((knot, index) => {
        if (knot[0] === x && knot[1] === y) {
          row += index ? `${index} ` : 'H ' // H is 0
          return false; // allows us to short citcuit loop once found
        }
        return true; // have to return so it'll still loop
      })

      if (!snakeInSpot) {
        continue; // bail out if column filled by snake
      }

      if (touched[x] && touched[x][y]) {
        row += '# '
        continue
      }

      row += '. '
    }

    console.info(String(y).padStart(2), row);
  }
  console.info('\n')
}

const isTouchingTail = (snakeIndex) => {
  const head = snake[snakeIndex]
  const tail = snake[snakeIndex + 1]

  for (let yBound = head[1] - 1; yBound <= head[1] + 1; yBound += 1) {
    for (let xBound = head[0] - 1; xBound <= head[0] + 1; xBound += 1) {
      if (tail[0] === xBound && tail[1] === yBound) {
        return true
      }
    }
  }

  return false;
}

const newPosition = (direction, elem) => {
  elem[0] += direction[0]
  elem[1] += direction[1]
}

const move = (direction, snakeIndex) => {
  const head = snake[snakeIndex]
  newPosition(direction, head);

  if (snake.length === snakeIndex + 1) {
    touched[head[0]] = { ...touched[head[0]], [head[1]]: true }
    return;
  }

  if (!isTouchingTail(snakeIndex)) {
    let newDirection = [0,0]
    const tail = snake[snakeIndex + 1]

    if (head[0] < tail[0]) {
      newDirection[0] = -1
    } else if (head[0] > tail[0]) {
      newDirection[0] = 1
    }

    if (head[1] < tail[1]) {
      newDirection[1] = -1
    } else if (head[1] > tail[1]) {
      newDirection[1] = 1
    }

    move(newDirection, snakeIndex + 1)
  }
}

const UP = [0,-1]
const LEFT = [-1, 0]
const RIGHT = [1, 0]
const DOWN = [0, 1]

const playSnake = (data) => {
  data.forEach(instruction => {
    console.info(instruction)

    let dir = instruction.match(/[RUDL]/g)[0]
    let count = instruction.match(/\d+/g)[0]

    for (let i = count; i > 0; i -= 1) {
      switch (dir) {
        case 'U':
          move(UP, 0)
          break
        case 'R':
          move(RIGHT, 0)
          break
        case 'D':
          move(DOWN, 0)
          break
        case 'L':
          move(LEFT, 0)
          break
      }
    }
  })
}

playSnake(data)

// move(LEFT, 0);
// move(LEFT, 0);
// move(LEFT, 0);
// move(LEFT, 0);
// debugBoard()

console.info(touched);

numTouched = Object.keys(touched).reduce((acc, row) => acc + Object.keys(touched[row]).length, 0)
console.info(numTouched)