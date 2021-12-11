import { combineReducers } from 'redux'
import todoItems from './todoItems'
import filter from './filter'
import colorTheme from './colorTheme'

export default combineReducers({
  todoItemsState: todoItems,
  filterState: filter,
  themeState: colorTheme
})
