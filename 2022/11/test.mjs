export default [
  {
    items: [79, 98],
    operation: (x) => x * 19,
    test: (x) => x % 23,
    modulo: 23,
    ifTrue: 2,
    ifFalse: 3,
    interactions: 0
  },
  {
    items: [54, 65, 75, 74],
    operation: (x) => x + 6,
    test: (x) => x % 19,
    modulo: 19,
    ifTrue: 2,
    ifFalse: 0,
    interactions: 0
  },
  {
    items: [79, 60, 97],
    operation: (x) => x * x,
    test: (x) => x % 13,
    modulo: 13,
    ifTrue: 1,
    ifFalse: 3,
    interactions: 0
  },
  {
    items: [74],
    operation: (x) => x + 3,
    test: (x) => x % 17,
    modulo: 17,
    ifTrue: 0,
    ifFalse: 1,
    interactions: 0
  }
]