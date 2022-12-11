import test, { basic, sameHeight } from './test.mjs'
import input from './input.mjs'

const checkIfOnEdge = (row, col) => {
  let directionEdge = {}

  if (row === 0) {
    directionEdge.north = true
    directionEdge.visibleNorth = 0
  }
  if (col === 0) {
    directionEdge.east = true
    directionEdge.visibleEast = 0
  }
  if (row === data.length - 1) {
    directionEdge.south = true
    directionEdge.visibleSouth = 0
  }
  if (col === data[row].length - 1) {
    directionEdge.west = true
    directionEdge.visibleWest = 0
  }

  return directionEdge;
}

const parseData = (data) => {
  for (let row = 0; row < data.length; row += 1) { //row
    visibility[row] = Array(data.length).fill([])

    for (let x = 0; x < data[row].length; x += 1) {
      const currentTree = data[row][x]

      let isBlockedEast = false
      let visibleEast = 0
      let isBlockedWest = false
      let visibleWest = 0

      for (let checkCol = 0; checkCol < data[row].length; checkCol += 1) {
        if (checkCol === x) { continue; } // currentTree

        const comparisonTree = data[row][checkCol]

        if (checkCol < x) {
          visibleEast += 1
          if (!isBlockedEast) {
            if (comparisonTree >= currentTree) {
              isBlockedEast = true
              visibleEast = 1
            }
          }
        }

        if (checkCol > x) {
          if (!isBlockedWest) {
            visibleWest += 1
            if (comparisonTree >= currentTree) {
              isBlockedWest = true
            }
          }
        }
      }

      let isBlockedNorth = false
      let visibleNorth = 0
      let isBlockedSouth = false
      let visibleSouth = 0
      for (let checkRow = 0; checkRow < data.length; checkRow += 1) {
        if (checkRow === row) { continue; } // currentTree
        const comparisonTree = data[checkRow][x]

        if (checkRow < row) {
          visibleNorth += 1
          if (!isBlockedNorth) {
            if (comparisonTree >= currentTree) {
              isBlockedNorth = true
              visibleNorth = 1;
            }
          }
        }

        if (checkRow > row) {
          if (!isBlockedSouth) {
            if (comparisonTree >= currentTree) {
              isBlockedSouth = true
            }
          }
        }
      }

      const scenic = (visibleNorth) * (visibleEast) * (visibleSouth) * (visibleWest);

      visibility[row][x] = {
        ...{
          north: !isBlockedNorth, east: !isBlockedEast, south: !isBlockedSouth, west: !isBlockedWest, size: data[row][x],
          visibleNorth, visibleEast, visibleSouth, visibleWest
        },
        ...checkIfOnEdge(row, x)
      }

      visibility[row][x].scenic = (visibility[row][x].visibleNorth) * (visibility[row][x].visibleEast) * (visibility[row][x].visibleSouth) * (visibility[row][x].visibleWest);

      const { north, east, south, west } = visibility[row][x];
      if (north || east || south || west) {
        numTreesVisible += 1
      }
    }
  }
}

const getTreeScenicValue = (rowIndex, colIndex, data) => {
  let treeView = 0

  const currentTree = data[rowIndex][colIndex]

  console.info(currentTree)

  let nVisibility = 0;
  let eVisibility = 0;
  let sVisibility = 0;
  let wVisibility = 0;

  for (let n = rowIndex - 1; n >= 0; n -= 1) {
    const nTree = data[n][colIndex];
    if (nTree >= currentTree) {
      nVisibility += 1
      break
    } else {
      nVisibility += 1
    }
  }

  for (let e = colIndex - 1; e >= 0; e -= 1) {
    const eTree = data[rowIndex][e]
    if (eTree >= currentTree) {
      eVisibility += 1
      break
    } else {
      eVisibility += 1
    }
  }

  for (let s = rowIndex + 1; s <= data.length - 1; s += 1) {
    const sTree = data[s][colIndex]
    if (sTree >= currentTree) {
      sVisibility += 1
      break
    } else {
      sVisibility += 1
    }
  }

  for (let w = colIndex + 1; w <= data[rowIndex].length - 1; w += 1) {
    const wTree = data[rowIndex][w]
    if (wTree >= currentTree) {
      wVisibility += 1
      break
    } else {
      wVisibility += 1
    }
  }

  console.info({nVisibility, eVisibility, sVisibility, wVisibility})

  return treeView = nVisibility * eVisibility * sVisibility * wVisibility
}


const getScenicScore = (data) => {
  return data.reduce((acc, row, rowIndex) => {
    const highestRowScore = row.split('').reduce((acc, currentTree, colIndex) => {
      let treeView = getTreeScenicValue(rowIndex, colIndex, data)
      return treeView > acc ? treeView : acc
    }, 0)

    return highestRowScore > acc ? highestRowScore : acc
  }, 0)
}



// DEBUGGING
const isVisible = (row, col) => {
  const tree = visibility[row][col];
  console.info(tree.visibleNorth, tree.visibleEast, tree.visibleSouth, tree.visibleWest, '=', tree.scenic)
  // return visible
}


// SETUP
const data = input.split(/\n/)
const visibility = []
let numTreesVisible = 0

// RUN
parseData(data);
// console.info(numTreesVisible)

console.info(getScenicScore(data))





//