import { SET_FILTER } from '../actionTypes'
import FILTERS from '../../constants/filtersConstant'

const initialFilter = FILTERS.ALL

const filter = (state = initialFilter, action) => {
  switch (action.type) {
    case SET_FILTER: {
      return action.payload.filter
    }

    default: {
      return state
    }
  }
}

export default filter
