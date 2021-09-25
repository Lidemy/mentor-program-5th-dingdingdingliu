import styled from 'styled-components'
import GomokuComponent from './components/gomoku'

const BoardWrapperStyle = styled.div`
  display: flex;
  justify-content: center;
`

function App() {
  return (
    <BoardWrapperStyle>
      <GomokuComponent />
    </BoardWrapperStyle>
  )
}

export default App
