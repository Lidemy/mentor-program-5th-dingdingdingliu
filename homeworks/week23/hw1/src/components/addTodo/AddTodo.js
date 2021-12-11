import styled from 'styled-components'
import { useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { LargeButtonStyle } from '../button/Button'
import useInput from '../../hooks/useInput'
import { addTodo } from '../../redux/actions'
import { useSelector } from 'react-redux'
import { todoItemsSelector } from '../../redux/selector'

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

export default function AddTodo() {
  const dispatch = useDispatch()
  const { value, setValue, handleInputChange } = useInput()
  const todoItemsState = useSelector(todoItemsSelector)

  function setItemIntoLocalStorage(todoItemList) {
    const localList = { todoItems: todoItemList }
    window.localStorage.setItem('todoItems', JSON.stringify(localList))
  }

  useEffect(() => {
    setItemIntoLocalStorage(todoItemsState)
  }, [todoItemsState])

  const handleAddTodo = useCallback(() => {
    if (!value.trim('')) return setValue('')
    dispatch(addTodo(value))
    setValue('')
  }, [dispatch, value, setValue])

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === 'Enter') handleAddTodo()
    },
    [handleAddTodo]
  )

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
