import { useState, useRef, useEffect, useCallback } from 'react'
import useInput from './useInput'
import useShowState from './useShowState'
import useTheme from './useTheme'

const initList = [
  {
    id: 2,
    content: '聽蛋堡',
    isDone: true,
  },
  {
    id: 1,
    content: '看星星',
    isDone: false,
  },
]

function setItemIntoLocalStorage(todoList) {
  window.localStorage.setItem('todoList', JSON.stringify(todoList))
}

function getItemFromLocalStorage() {
  return window.localStorage.getItem('todoList')
}

export default function useTodos() {
  const id = useRef(3)
  const { value, setValue, handleInputChange } = useInput()
  const { theme, setTheme, handleThemeChange } = useTheme()
  const { todoState, handleShowAll, handleShowDone, handleShowUndone } =
    useShowState()

  const [todoList, setTodoList] = useState(() => {
    let todoData = JSON.parse(getItemFromLocalStorage()) || initList
    if (todoData.length === 0) {
      id.current = 1
    } else if (todoData !== initList) {
      id.current = todoData[0].id + 1
    }
    return todoData
  })

  const showTodoList = todoList.filter((todo) => {
    if (todoState === 'all') return true
    return todoState === 'done' ? todo.isDone : !todo.isDone
  })

  useEffect(() => {
    setItemIntoLocalStorage(todoList)
  }, [todoList])

  const handleAddTodo = useCallback(() => {
    if (!value.trim('')) return setValue('')
    const newTodo = [
      {
        id: id.current,
        content: value,
        isDone: false,
      },
      ...todoList,
    ]
    setTodoList((todoList) => newTodo)
    setValue('')
    id.current++
  }, [value, setValue, todoList])

  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === 'Enter') handleAddTodo()
    },
    [handleAddTodo]
  )

  const handleToggle = useCallback(
    (id) => {
      const changeTodo = todoList.map((todo) => {
        if (todo.id !== id) return todo
        return {
          ...todo,
          isDone: !todo.isDone,
        }
      })
      setTodoList((todolist) => changeTodo)
    },
    [todoList]
  )

  const handleDelete = useCallback(
    (id) => {
      const deleteTodo = todoList.filter((todo) => todo.id !== id)
      setTodoList((todolist) => deleteTodo)
    },
    [todoList]
  )

  const handleDeleteAll = useCallback(() => {
    setTodoList([])
  }, [])

  return {
    value,
    showTodoList,
    theme,
    setValue,
    handleInputChange,
    setTodoList,
    handleAddTodo,
    handleToggle,
    handleDelete,
    handleDeleteAll,
    handleShowAll,
    handleShowDone,
    handleShowUndone,
    setTheme,
    handleThemeChange,
    handleKeyPress,
  }
}
