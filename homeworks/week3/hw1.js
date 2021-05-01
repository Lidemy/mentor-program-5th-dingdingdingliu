const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
})

const lines = []

rl.on('line', (line) => {
  lines.push(line)
})

function solve(lines) {
  const number = Number(lines[0])
  let str = ''
  for (let i = 1; i <= number; i++) {
    str += '*'
    console.log(str)
  }
}

rl.on('close', () => {
  solve(lines)
})
