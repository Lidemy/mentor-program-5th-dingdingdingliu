const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
})

const lines = []

rl.on('line', (line) => {
  lines.push(line)
})

function compare(a, b, r) {
  if (a === b) {
    return 'DRAW'
  }

  if (r === '-1') {
    const temp = a
    a = b
    b = temp
  }

  if (a.length !== b.length) {
    return a.length > b.length ? 'A' : 'B'
  }
  return a > b ? 'A' : 'B'
}

function solve(lines) {
  for (let i = 1; i < lines.length; i++) {
    const arr = lines[i].split(' ')
    console.log(compare(...arr))
  }
}

rl.on('close', () => {
  solve(lines)
})
