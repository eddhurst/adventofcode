import test from './test.mjs'
import input from './input.mjs'

const data = input;

const debugBusiness = () => {
  data.forEach((monkey, index) => {
    console.info(`Monkey ${index}: ${monkey.items.join(', ')}`)
  })
}

const modulo = data.reduce((acc, monkey) => monkey.modulo * acc, 1)
console.info(modulo)

const monkeyBusiness = (data) => {
  for (let i = 1; i <= 10000; i += 1 ) {

    if ([1, 20, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000].includes(i)) {
      console.info(`\n== After round ${i} ==`)
    }

    data.forEach((monkey, index) => {
      monkey.items.forEach(x => {
        monkey.interactions += 1

        let item = monkey.operation(x)

        while (item > modulo) {
          item -= modulo
        }

        // item = Math.floor(item / 3)
        // item = monkey.operation(monkey.item % modulo) /// not quite...
        // const test = !!((item) === 0)

        const test = !!(monkey.test(item) === 0)


        if (test) {
          data[monkey.ifTrue].items.push(item)
        } else {
          data[monkey.ifFalse].items.push(item)
        }
      })

      monkey.items = []

      if ([1, 20, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000].includes(i)) {
        console.info(`Monkey ${index} inspected items ${monkey.interactions} times.`)
      }
    })

  }
}

monkeyBusiness(data)

const result = data.reduce((acc, monkey) => {
  acc.push(monkey.interactions)
  return acc
}, []).sort((a,b) => Number(a) - Number(b))

console.info(result[result.length - 1] * result[result.length - 2])





//