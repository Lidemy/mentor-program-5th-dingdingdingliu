import styled from 'styled-components'
import FormComponent from './components/form'
import FooterComponent from './components/footer'

const MainDiv = styled.div`
  margin: 0;
  display: flex;
  background: #d3d3d3;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
`

function App() {
  return (
    <MainDiv>
      <FormComponent />
      <FooterComponent />
    </MainDiv>
  )
}

export default App
