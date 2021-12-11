import { useState, useCallback } from 'react'

export default function useShowState() {
  const [todoState, setTodoState] = useState('all')

  const handleShowAll = useCallback(() => {
    setTodoState('all')
  }, [])

  const handleShowDone = useCallback(() => {
    setTodoState('done')
  }, [])

  const handleShowUndone = useCallback(() => {
    setTodoState('undone')
  }, [])

  return {
    todoState,
    setTodoState,
    handleShowAll,
    handleShowDone,
    handleShowUndone
  }
}
