import axios from 'axios'

const reducer = (state=null, action) => {
  switch(action.type) {
    case GET_DATA:
      return action.data
    default:
      return state   
    }
}

const GET_DATA = 'GET_DATA'
export const getData = data => ({type: GET_DATA, data})

export const fetchData = () =>
  dispatch =>
    axios.get('/api/transactions/')
      .then(data => dispatch(getData(data.data)))
      .catch(err => console.error('fetching data unsuccessful', err))

export default reducer