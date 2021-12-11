import {
  ADD_TODO,
  DELETE_TODO,
  TOGGLE_TODO,
  DELETE_ALL,
  SET_FILTER,
  TOGGLE_THEME
} from './actionTypes'

export function addTodo(item) {
  return {
    type: ADD_TODO,
    payload: {
      item
    }
  }
}

export function deleteTodo(id) {
  return {
    type: DELETE_TODO,
    payload: {
      id
    }
  }
}

export function toggleTodo(id) {
  return {
    type: TOGGLE_TODO,
    payload: {
      id
    }
  }
}

export function deleteAllTodos() {
  return {
    type: DELETE_ALL
  }
}

export function setFilter(filter) {
  return {
    type: SET_FILTER,
    payload: {
      filter
    }
  }
}

export function toggleTheme() {
  return {
    type: TOGGLE_THEME
  }
}
