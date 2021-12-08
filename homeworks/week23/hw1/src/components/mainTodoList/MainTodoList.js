import AddTodoComponent from '../addTodo'
import { toggleTodo, deleteTodo } from '../../redux/actions'
import { TodoItem } from './TodoItem'
import { useSelector, useDispatch } from 'react-redux'
import { showTodoList } from '../../redux/selector'

export default function MainTodoList() {
  const todoItemsState = useSelector(showTodoList)
  const dispatch = useDispatch()

  return (
    <div>
      <AddTodoComponent />
      {todoItemsState.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          handleToggle={() => dispatch(toggleTodo(todo.id))}
          handleDelete={() => dispatch(deleteTodo(todo.id))}
        />
      ))}
    </div>
  )
}
