const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin
})

const lines = []

rl.on('line', (line) => {
  lines.push(line)
})

function solve(lines) {
  for (let time = 1; time < Number(lines[0]) + 1; time++) {
    const num = Number(lines[time])
    const arr = []
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        arr.push(i)
      }
    }
    if (arr.length === 2) {
      console.log('Prime')
    } else {
      console.log('Composite')
    }
  }
}

rl.on('close', () => {
  solve(lines)
})
