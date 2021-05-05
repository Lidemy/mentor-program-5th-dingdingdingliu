const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
})

const lines = []

rl.on('line', (line) => {
  lines.push(line)
})

function solve(lines) {
  const strA = lines[0]
  const strB = strA.split('').reverse().join('')
  if (strA === strB) {
    console.log('True')
  } else {
    console.log('False')
  }
}

rl.on('close', () => {
  solve(lines)
})
