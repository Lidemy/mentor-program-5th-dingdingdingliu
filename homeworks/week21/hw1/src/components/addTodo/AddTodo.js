import styled from 'styled-components'
import { LargeButtonStyle } from '../button/Button'
const AddTodoDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`

const AddInputStyle = styled.input`
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
  outline: none;
  border: 1px solid ${(props) => props.theme.colors.border};
`

function AddInput({ type, placeholder, value, onChange, onKeyPress }) {
  return (
    <AddInputStyle
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
    ></AddInputStyle>
  )
}

function AddItemButton({ className, onClick, children }) {
  return (
    <LargeButtonStyle className={className} onClick={onClick}>
      {children}
    </LargeButtonStyle>
  )
}

export default function AddTodo({
  value,
  handleInputChange,
  handleKeyPress,
  handleAddTodo,
}) {
  return (
    <AddTodoDiv>
      <AddInput
        type='text'
        placeholder='Your Todo'
        value={value}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <AddItemButton onClick={handleAddTodo}>Add Todo</AddItemButton>
    </AddTodoDiv>
  )
}
