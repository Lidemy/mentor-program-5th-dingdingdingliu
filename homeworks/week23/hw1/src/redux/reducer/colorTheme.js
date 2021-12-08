import { lightTheme, darkTheme } from '../../theme/theme'
import { TOGGLE_THEME } from '../actionTypes'

export default function colorTheme(state = darkTheme, action) {
  switch (action.type) {
    case TOGGLE_THEME:
      return (state = state === darkTheme ? lightTheme : darkTheme)

    default:
      return state
  }
}
