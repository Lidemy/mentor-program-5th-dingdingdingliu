const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
})

const lines = []

rl.on('line', (line) => {
  lines.push(line)
})

function solve(lines) {
  const line = lines[0].split(' ')
  const numOne = Number(line[0])
  const numTwo = Number(line[1])
  for (let i = numOne; i <= numTwo; i++) {
    const str = String(i)
    let sum = 0
    for (let n = 0; n < str.length; n++) {
      sum += Number(str[n]) ** str.length
    }
    if (sum === i) {
      console.log(i)
    }
  }
}

rl.on('close', () => {
  solve(lines)
})
