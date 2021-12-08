import FILTERS from '../constants/filtersConstant'

export const todoItemsSelector = (store) =>
  store.todoListState.todoItemsState.todoItems

const filtersSelector = (store) => store.todoListState.filterState

export const showTodoList = (store) => {
  const allTodoItems = todoItemsSelector(store)
  const filter = filtersSelector(store)
  switch (filter) {
    case FILTERS.ALL:
      return allTodoItems
    case FILTERS.DONE:
      return allTodoItems.filter((item) => item.isDone === true)
    case FILTERS.UNDONE:
      return allTodoItems.filter((item) => item.isDone === false)
    default:
      return allTodoItems
  }
}

export const colorThemeSelector = (store) => store.todoListState.themeState
