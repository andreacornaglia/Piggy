//script that generates the random data do seed the DB
//for now, I'm running it and copy the results manually into the seed file
//next steps would be researching how to do this more automated
const Coffee = {
  category: 'Coffee',
  place:['Starbucks', 'La Colombe', 'Pushcart Coffee'],
  minAmount: 200,
  maxAmount: 700
}

const Lunch = {
  category: 'Lunch',
  place:['Sweetgreens', 'Leos Bagels', 'Open Market'],
  minAmount: 600,
  maxAmount: 1200
}

const Dinner = {
  category: 'Dinner',
  place:['Pizza Antica', 'Ichiran Ramen', 'Caccio e Peppe'],
  minAmount: 3000,
  maxAmount: 7000
}

const Groceries = {
  category: 'Groceries',
  place:['Sunrise Market', 'Traders Joe'],
  minAmount: 3000,
  maxAmount: 9000
}

function getDaysInMonth(month, year, today) {
  let date = new Date(year, month, 1);
  let days = [];
  function makeDay(){
    let day = new Date(date)
    let formattedStr = day.toISOString().substr(0, 10)
    days.push(formattedStr);
    date.setDate(date.getDate() + 1);
  }
  if(today){
   for(var i = 0; i < today; i++) {
      makeDay()
    }
  }
  else{
   while (date.getMonth() === month) {
      makeDay()
   }
  }
  return days;
}
        
const dates = getDaysInMonth(1, 2017).concat(getDaysInMonth(2, 2017, 9))
const data = []

function generateData(Coffee, Lunch, Groceries, Dinner){
  function makeDataPoint(cat, date){
    let place = cat.place[Math.floor(Math.random() * cat.place.length)];
    let amount = Math.floor(Math.random() * (cat.maxAmount - cat.minAmount)) + cat.minAmount
    let obj = {category: cat.category, place: place, amount: amount , date: date}
    data.push(obj)
  }
  dates.forEach(date => {
    if(Math.random() < 0.1){
      makeDataPoint(Groceries, date)
    }
    if(Math.random() < 0.2){
      makeDataPoint(Dinner, date)
    } 
    if(Math.random()< 0.8){
      makeDataPoint(Coffee, date)
      makeDataPoint(Lunch, date)
    }
  })
  return data;
}

generateData(Coffee, Lunch, Groceries, Dinner)