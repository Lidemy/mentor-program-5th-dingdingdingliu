function countTotal(value, board, stepX, stepY, directionX, directionY) {
  let PositionX = stepX
  let PositionY = stepY
  let Total = 0
  while (true) {
    PositionX += directionX
    PositionY += directionY
    if (board[PositionX] && board[PositionX][PositionY] === value) {
      Total++
    } else {
      break
    }
  }
  return Total
}

function checkWinner(value, board, x, y) {
  let winner
  if (
    countTotal(value, board, x, y, 1, 0) +
      countTotal(value, board, x, y, -1, 0) >=
      4 ||
    countTotal(value, board, x, y, 0, 1) +
      countTotal(value, board, x, y, 0, -1) >=
      4 ||
    countTotal(value, board, x, y, 1, 1) +
      countTotal(value, board, x, y, -1, -1) >=
      4 ||
    countTotal(value, board, x, y, 1, -1) +
      countTotal(value, board, x, y, -1, 1) >=
      4
  ) {
    winner = value
  }
  return winner
}

export { countTotal, checkWinner }
