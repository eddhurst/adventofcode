import { basicFolder, folders} from './test.mjs'
import input from './input.mjs'

const COMMAND_START = '$'
const COMMAND_CD = 'cd'
const COMMAND_LS = 'ls'
const COMMAND_UP_DIR = '..'
const FILE_DIR = 'dir'

const MAGIC_NUMBER = 100000
const TOTAL_DISK_SIZE = 70000000
const SPACE_NEEDED = 30000000

const couldDelete = (data) => {
  if (Object.keys(data.folders).length) {
    Object.keys(data.folders).forEach(folder => {
      couldDelete(data.folders[folder])
    })
  }

  // console.info(TOTAL_DISK_SIZE, ' - ', data.totalSize, ' = ', (TOTAL_DISK_SIZE - data.totalSize))

  if (data.totalSize >= space_to_remove) {
    if (data.totalSize < part2) {
      part2 = data.totalSize
      console.info('part2', part2)
    }
  }

  // if ((TOTAL_DISK_SIZE - data.totalSize) < (TOTAL_DISK_SIZE - SPACE_TO_REMOVE)) {
  //   part2.push(data.totalSize);
  // }
}

const calculateSize = (data) => {
  let foldersSize = 0;

  if (Object.keys(data.folders).length) {
    Object.keys(data.folders).forEach(folder => {
      foldersSize += calculateSize(data.folders[folder])
    })
  }

  data.totalSize = data.files + foldersSize;

  if (data.totalSize <= MAGIC_NUMBER) {
    part1.push(data.totalSize);
  }

  return data.totalSize;
}


const buildFileSystem = (acc, line) => {
  const lineDetails = line.split(' ')
  if (lineDetails[0] === COMMAND_START) {
    if (lineDetails[1] === COMMAND_LS) {
      return acc;
    } else if (lineDetails[1] === COMMAND_CD) {
      switch (lineDetails[2]) {
        case COMMAND_UP_DIR:
          acc.pointer = acc.pointer.split('/').slice(0, -1).join('/')
          break;
        case '/':
          acc.pointer = ''
          break;
        default:
          acc.pointer += '/' + lineDetails[2]
          break;
      }
      return acc;
    }
  }

  let ref
  acc.pointer.split('/').forEach(pointer => {
    ref = pointer ? ref.folders[pointer] : acc
  })

  if (lineDetails[0] === FILE_DIR) {
    ref.folders[lineDetails[1]] = { folders: {}, files: 0, totalSize: 0 };
    return acc
  }

  const index = acc.pointer.split('/').slice(-1).join('');

  if (index === '') {
    return {
      ...acc,
      files: acc.files += Number(lineDetails[0])
    }
  }

  ref.files += Number(lineDetails[0])

  return {
    ...acc,
  }
}


const result = input.split(/\n/).reduce(buildFileSystem, { pointer: '', folders: {}, files: 0, totalSize: 0});
const part1 = [];
calculateSize(result);

const availableSpace = TOTAL_DISK_SIZE - result.totalSize
const space_to_remove = SPACE_NEEDED - availableSpace;

console.info('total', TOTAL_DISK_SIZE, ' / used: ', result.totalSize);

console.info('space needed', space_to_remove);

let part2 = result.totalSize;
couldDelete(result);
// console.info('part2', part2);
// console.info(part2.reduce((acc, next) => ((acc < next) ? acc : next), TOTAL_DISK_SIZE))


console.info( part1.reduce((acc, size) => acc + size, 0) )



//