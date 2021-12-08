import styled from 'styled-components'
import { SmallButtonStyle } from '../button/Button'

const TodoDiv = styled.div`
  margin: 10px auto;
  width: 70vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 20px;
`

const ButtonDiv = styled.div`
  margin-left: 8px;
`

const DoneButtonStyle = styled(SmallButtonStyle)`
  color: ${(props) => props.theme.colors.undone};
  border: 2px solid ${(props) => props.theme.colors.undone};
  border-radius: 5px;

  ${(props) =>
    props.isDone &&
    `
    color: green;
    border: 2px solid green;
  `}
`

const DeleteButtonStyle = styled(SmallButtonStyle)`
  color: ${(props) => props.theme.colors.delete};
  border: 2px solid ${(props) => props.theme.colors.delete};
  border-radius: 5px;
  margin-left: 8px;
`

const TodoItemStyle = styled.div`
  max-width: 50%;
  background: ${(props) => props.theme.colors.font};
  border-radius: 5px;
  color: ${(props) => props.theme.colors.background};
  font-size: 14px;
  padding: 6px 10px 4px 10px;

  ${(props) =>
    props.isDone &&
    `
    text-decoration: line-through;
  `}
`
function TodoContent({ content, isDone }) {
  return <TodoItemStyle isDone={isDone}>{content}</TodoItemStyle>
}

export function TodoItem({ todo, handleToggle, handleDelete }) {
  const handleToggleClick = () => {
    handleToggle(todo.id)
  }

  const handleDeleteClick = () => {
    handleDelete(todo.id)
  }

  return (
    <TodoDiv data-id={todo.id}>
      <TodoContent content={todo.content} isDone={todo.isDone} />
      <ButtonDiv>
        <DoneButtonStyle isDone={todo.isDone} onClick={handleToggleClick}>
          {todo.isDone ? '已完成' : '未完成'}
        </DoneButtonStyle>
        <DeleteButtonStyle onClick={handleDeleteClick}>刪除</DeleteButtonStyle>
      </ButtonDiv>
    </TodoDiv>
  )
}
