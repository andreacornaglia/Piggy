import axios from 'axios'

const reducer = (state=null, action) => {
  switch(action.type) {
    case GET_COFFEE:
      return action.coffee
    default:
      return state   
    }
}

const GET_COFFEE = 'GET_COFFEE'
export const getCoffee = coffee => ({type: GET_COFFEE, coffee})

export const fetchCoffeeData = () =>
  dispatch =>
    axios.get('/api/transactions/coffee')
      .then(data => {
        console.log('in axios, we get:', data.data)
        dispatch(getCoffee(data.data))})
      .catch(err => console.error('fetching data unsuccessful', err))

export default reducer