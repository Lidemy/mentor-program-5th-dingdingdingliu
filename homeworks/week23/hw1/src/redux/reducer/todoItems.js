import { ADD_TODO, DELETE_TODO, TOGGLE_TODO, DELETE_ALL } from '../actionTypes'
const listInLocalStorage = JSON.parse(getItemFromLocalStorage())
let todoId =
  listInLocalStorage && listInLocalStorage.length > 0
    ? listInLocalStorage.todoItems[0].id + 1
    : 3

const initialState = {
  todoItems: [
    {
      id: 2,
      content: '聽蛋堡',
      isDone: true
    },
    {
      id: 1,
      content: '看星星',
      isDone: false
    }
  ]
}

function getItemFromLocalStorage() {
  return window.localStorage.getItem('todoItems')
}

export default function todoItemsReducer(
  state = listInLocalStorage || initialState,
  action
) {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case ADD_TODO: {
      return {
        todoItems: [
          ...state.todoItems,
          {
            id: todoId++,
            content: action.payload.item,
            isDone: false
          }
        ]
      }
    }

    case DELETE_TODO: {
      return {
        todoItems: state.todoItems.filter(
          (item) => item.id !== action.payload.id
        )
      }
    }

    case TOGGLE_TODO: {
      return {
        todoItems: state.todoItems.map((item) => {
          if (item.id !== action.payload.id) return item
          return {
            ...item,
            isDone: !item.isDone
          }
        })
      }
    }

    case DELETE_ALL: {
      return {
        todoItems: []
      }
    }

    default: {
      return state
    }
  }
}
