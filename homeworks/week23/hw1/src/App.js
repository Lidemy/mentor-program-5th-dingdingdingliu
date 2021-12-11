import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import GlobalStyle from './constants/globalStyle'
import Header from './components/header'
import MainTodoList from './components/mainTodoList'
import ThemeButton from './components/themeButton'
import { useSelector } from 'react-redux'
import { colorThemeSelector } from './redux/selector'

const AppDiv = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ThemeButtonDiv = styled.div`
  position: absolute;
  top: 10%;
  left: 90%;
`

function App() {
  const theme = useSelector(colorThemeSelector)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AppDiv>
        <ThemeButtonDiv>
          <ThemeButton />
        </ThemeButtonDiv>
        <Header />
        <MainTodoList />
      </AppDiv>
    </ThemeProvider>
  )
}

export default App
