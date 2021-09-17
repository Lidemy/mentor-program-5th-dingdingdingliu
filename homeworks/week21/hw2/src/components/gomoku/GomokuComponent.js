import styled from 'styled-components'
import { useState, useRef, useCallback, memo } from 'react'
import ChessComponent from '../chess'
import { checkWinner } from '../../utils/utils'

const BoardDiv = styled.div`
  margin: 20px auto;
  display: flex;
  flex-direction: column;
`

const RowSquareDiv = styled.div`
  display: flex;
`

const WinnerDiv = styled.div`
  margin: 10px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`

const ResetButtonStyle = styled.button`
  max-width: 100px;
  margin: 10px auto;
  padding: 6px 10px;
  font-size: 16px;
  border-radius: 5px;
  background: white;
  border: 2px solid black;

  :hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`

function ResetButton({ onClick }) {
  return <ResetButtonStyle onClick={onClick}>RESET</ResetButtonStyle>
}

export default function Board() {
  const size = 19
  const blackIsNext = useRef(true)
  const stepRow = useRef()
  const stepCol = useRef()

  const [boardState, setBoardState] = useState(
    Array(size).fill(Array(size).fill(null))
  )

  const [winner, setWinner] = useState()

  const newBoard = useCallback(
    (x, y, newValue) => {
      const newBoardState = JSON.parse(JSON.stringify(boardState))
      newBoardState[x][y] = newValue
      return newBoardState
    },
    [boardState]
  )

  const getWinnerName = useCallback((winner) => {
    if (!winner) return
    let winnerName
    winner === 'B' ? (winnerName = 'BLACK') : (winnerName = 'WHITE')
    return winnerName
  }, [])

  const handleResetClick = useCallback(() => {
    blackIsNext.current = true
    stepRow.current = null
    stepRow.current = null
    setBoardState((boardState) => Array(size).fill(Array(size).fill(null)))
    setWinner((winner) => null)
  }, [])

  const handleChessClick = useCallback(
    (row, col, value) => {
      if (winner || value) return
      stepRow.current = row
      stepCol.current = col
      let newValue
      blackIsNext.current ? (newValue = 'B') : (newValue = 'W')
      setBoardState((boardState) => newBoard(row, col, newValue))
      blackIsNext.current = !blackIsNext.current

      let winnerColor = checkWinner(newValue, boardState, row, col)
      setWinner((winner) => getWinnerName(winnerColor))
    },
    [boardState, winner, newBoard, getWinnerName]
  )

  const MemoResetButton = memo(ResetButton)

  function RenderSquare({ row, col, value, className }) {
    return (
      <ChessComponent
        className={className}
        row={row}
        col={col}
        value={value}
        onClick={() => {
          handleChessClick(row, col, value)
        }}
      ></ChessComponent>
    )
  }

  return (
    <BoardDiv>
      {winner && <WinnerDiv>Winner is... {winner} !</WinnerDiv>}
      <MemoResetButton onClick={handleResetClick} />
      {boardState.map((row, rowIndex) => {
        return (
          <RowSquareDiv key={rowIndex}>
            {row.map((col, colIndex) => {
              return (
                <RenderSquare
                  key={colIndex}
                  row={rowIndex}
                  col={colIndex}
                  value={boardState[rowIndex][colIndex]}
                ></RenderSquare>
              )
            })}
          </RowSquareDiv>
        )
      })}
    </BoardDiv>
  )
}
