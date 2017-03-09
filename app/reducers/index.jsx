import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,  
  data: require('./data').default
})

export default rootReducer
