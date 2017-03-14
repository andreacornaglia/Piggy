const getPeriodData = function(data, period, type){
  console.log('I am running this function!')
  //we use this data as today because the db is fixed
  const today = new Date('2017-03-09T12:00:00-0500')
  const daysOfWeek = ['SU','MO','TU','WE','TH','FR','SAT']
  const todayIsDay = today.getDay()
  //define period
  let periodDays = []
  let numDays = 0
  if(period == 'week'){
    numDays = 7
  }
  else if(period == 'month'){
    numDays = 30
  }
  else{
    numDays = 14
  }
  for(var i = 0; i < numDays; i++){
    let thisDay = new Date(today)
    thisDay.setDate(thisDay.getDate() + (i - todayIsDay))
    thisDay = thisDay.toISOString().substr(0, 10)
    let dateF
    if(numDays === 7){
      dateF = daysOfWeek[i]
    }
    else {
      dateF = date.substr(5,6) + '/' + date.substr(8,9)
    }
    let obj = {date: thisDay, amount: 0, dateF: dateF, label: '$0', category: null}
    periodDays.push(obj)
  }
  //if more than 1 ocurrence per day, combine instances
  if(data){
    if(type == 'category'){
    for(var i = 0; i < periodDays.length; i++){
      for(var j=0; j < data.length; j++){
        //need to check for more than 1 occurrence if multiple categories!! (for calculating the total)
        if(periodDays[i].date === data[j].date.substr(0, 10)) {  
          periodDays[i].label = '$' + periodDays[i].amount
          periodDays[i].place = data[j].place
          periodDays[i].category = data[j].category
        }
      }
    }
    console.log(periodDays)
    return periodDays
  }
  else if(type == 'total'){
    const totals = [
      {category:"Coffee", total:0},
      {category:"Lunch", total:0},
      {category:"Dinner", total:0},
      {category:"Groceries", total:0}
    ]
    //bug: I'm only getting lunch transactions, not coffee, because are on the same day. need to look into getPeriodData!
    console.log('week is:', week)
    for(var j = 0 ; j < totals.length; j++){
      for(var i = 0; i < data.length; i++){
        if(data[i].category === totals[j].category){
          totals[j].total += week[i].amount
        }
      }
    }
    console.log(totals);
    return totals
  }
}

export default getPeriodData