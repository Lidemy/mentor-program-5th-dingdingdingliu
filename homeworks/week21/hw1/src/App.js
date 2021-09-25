import styled, { ThemeProvider } from 'styled-components'
import HeaderComponent from './components/header'
import AddTodoComponent from './components/addTodo'
import TodoItemComponent from './components/todoItem'
import ThemeButtonComponent from './components/themeButton'
import useTodos from './hooks/useTodos'

const AppDiv = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
`
const ThemeButtonDiv = styled.div`
  position: absolute;
  top: 10%;
  left: 90%;
`
const HeaderDiv = styled.div``
const MainDiv = styled.div``

function App() {
  const {
    value,
    handleInputChange,
    showTodoList,
    handleAddTodo,
    handleToggle,
    handleDelete,
    handleDeleteAll,
    handleShowAll,
    handleShowDone,
    handleShowUndone,
    theme,
    handleThemeChange,
    handleKeyPress,
  } = useTodos()

  return (
    <ThemeProvider theme={theme}>
      <AppDiv>
        <ThemeButtonDiv>
          <ThemeButtonComponent handleThemeChange={handleThemeChange}>
            Mode
          </ThemeButtonComponent>
        </ThemeButtonDiv>
        <HeaderDiv>
          <HeaderComponent
            handleDeleteAll={handleDeleteAll}
            handleShowAll={handleShowAll}
            handleShowDone={handleShowDone}
            handleShowUndone={handleShowUndone}
          />
        </HeaderDiv>
        <MainDiv>
          <AddTodoComponent
            value={value}
            handleInputChange={handleInputChange}
            handleAddTodo={handleAddTodo}
            handleKeyPress={handleKeyPress}
          />
          {showTodoList.map((todo) => (
            <TodoItemComponent
              key={todo.id}
              todo={todo}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
            />
          ))}
        </MainDiv>
      </AppDiv>
    </ThemeProvider>
  )
}

export default App
