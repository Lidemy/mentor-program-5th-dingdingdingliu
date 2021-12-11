import { configureStore } from '@reduxjs/toolkit'
import todoItemsReducer from '../redux/reducer'

export const store = configureStore({
  reducer: {
    todoListState: todoItemsReducer
  }
})
