import message, { message0, message1, message2, message3, message4 } from './input.mjs'

const findPacket = (input, lengthOfPacket) => {
  let compare = ''

  for (let i = 0; i < input.length; i += 1) {
    if (compare.length !== lengthOfPacket) {
      compare += input[i]
      continue;
    }

    const compareArr = compare.split('')
    const checkUnique = compareArr.filter((value, index, self) => self.indexOf(value) === index)

    if (checkUnique.length === lengthOfPacket) {
      console.info('Packet market located at position', i)
      break
    }

    compare = compare.slice(1, Infinity) + input[i]
  }
}

findPacket(message, 4)
