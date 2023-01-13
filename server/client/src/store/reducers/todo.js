import {
  GET_TESTS,
  SET_TESTS,
  GET_INDEX,
  GET_TOPNUM,
  TEST_LOADING,
  CATEGORY_LOADING,
  GET_CATEGORY,
} from '../constants'

const initialState = {
  tests: [],
  category: '',
  index: 0,
  topNum: 0,
  loading: false,
  categoryLoading: false
}

const todoReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case GET_CATEGORY:
      return {
        ...state,
        category: payload
      }
    case GET_TESTS:
      return {
        ...state,
        tests: payload,
        loading: false
      }
    case SET_TESTS:
      return {
        ...state,
        tests: payload,
        categoryLoading: false
      }
    case GET_INDEX:
      return {
        ...state,
        index: payload
      }
    case GET_TOPNUM:
      return {
        ...state,
        topNum: payload
      }
    case TEST_LOADING:
      return {
        ...state,
        loading: true,
      }
    case CATEGORY_LOADING:
      return {
        ...state,
        categoryLoading: true
      }
    default:
      return state
  }
}

export default todoReducer

