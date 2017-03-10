import axios from 'axios'

const reducer = (state=null, action) => {
  switch(action.type) {
    case GET_TOTAL:
      return action.total
    default:
      return state   
    }
}

const GET_TOTAL = 'GET_TOTAL'
export const getTotal = total => ({type: GET_TOTAL, total})

export const fetchTotalData = () =>
  dispatch =>
    axios.get('/api/transactions/total')
      .then(data => {
        console.log('in axios, we get:', data.data)
        dispatch(getTotal(data.data))})
      .catch(err => console.error('fetching data unsuccessful', err))

export default reducer