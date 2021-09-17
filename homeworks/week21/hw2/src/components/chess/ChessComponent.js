import styled, { css } from 'styled-components'

const SquareStyle = styled.button`
  background: #d2b48c;
  border: 2px solid black;
  font-size: 20px;
  font-weight: bold;
  line-height: 30px;
  height: 30px;
  margin-right: -2px;
  margin-top: -2px;
  padding: 0;
  padding-left: 2px;
  width: 31px;

  &:hover {
    cursor: pointer;
  }
`

const ChessStyle = styled.div`
  border-radius: 50%;
  height: 22px;
  width: 23px;

  ${(props) =>
    props.value === 'B'
      ? css`
          background: black;
        `
      : css`
          background: white;
        `}
`

export default function Square({ onClick, value }) {
  return (
    <SquareStyle onClick={onClick}>
      {value && <ChessStyle value={value} />}
    </SquareStyle>
  )
}
