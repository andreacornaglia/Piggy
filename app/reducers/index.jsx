import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,  
  total: require('./total').default,
  coffee: require('./coffee').default
})

export default rootReducer
