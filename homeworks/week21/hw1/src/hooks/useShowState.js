import { useState, useCallback } from 'react'

export default function useShowState() {
  const [todoState, setTodoState] = useState('all')

  const handleShowAll = useCallback(() => {
    setTodoState((todoState) => 'all')
  }, [])

  const handleShowDone = useCallback(() => {
    setTodoState((todoState) => 'done')
  }, [])

  const handleShowUndone = useCallback(() => {
    setTodoState((todoState) => 'undone')
  }, [])

  return {
    todoState,
    setTodoState,
    handleShowAll,
    handleShowDone,
    handleShowUndone,
  }
}
