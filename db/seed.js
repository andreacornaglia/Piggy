const db = require('APP/db')

const seedTransactions = () => db.Promise.map([
  {date:'3/9/2017 12:20 pm', place:'Open Market', amount:'670', category: 'Lunch' },
  {date:'3/9/2017 8:40 am', place:'MTA', amount:'2880', category: 'Transportation' },
  {date:'3/9/2017 4:20 pm', place:'Starbucks', amount:'390', category: 'Coffee' },
  {date:'3/8/2017 9:20 pm', place:'Beron beron', amount:'6530', category: 'Dinner' },
  {date:'3/8/2017 10:35 pm', place:'Sunrise Market', amount:'3550', category: 'Groceries' },
  {date:'3/8/2017 1:25 pm', place:'Leos Bagels', amount:'1240', category: 'Lunch' },
  {date:'3/8/2017 1:25 pm', place:'Netflix', amount:'1000', category: 'Entertainment' },
  {date:'3/7/2017 12:10 pm', place:'Open Market', amount:'690', category: 'Lunch' },
  {date:'3/7/2017 3:40 pm', place:'Amazon', amount:'7330', category: 'Pets' },
  {date:'3/7/2017 3:20 pm', place:'La Colombe Coffee', amount:'490', category: 'Coffee' },
  {date:'3/6/2017 10:25 pm', place:'Pizza Antica', amount:'4590', category: 'Dinner' },
  {date:'3/6/2017 10:35 pm', place:'Traders Joe', amount:'8650', category: 'Groceries' },
  {date:'3/5/2017 2:25 pm', place:'Al Horno', amount:'1080', category: 'Lunch' },
  {date:'3/4/2017 9:25 pm', place:'East Village Cinemas', amount:'2500', category: 'Entertainment' },
  {date:'3/3/2017 9:25 pm', place:'Zara', amount:'5300', category: 'Clothing' },
  {date:'3/2/2017 9:25 pm', place:'Strand Books', amount:'1700', category: 'Books' },
  {date:'3/1/2017 9:25 pm', place:'Starbucks', amount:'300', category: 'Coffee' }
], transaction => db.model('transactions').create(transaction))

const seedUsers = () => db.Promise.map([
  {name: 'so many', email: 'god@example.com', password: '1234'},
  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
], user => db.model('users').create(user))

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedTransactions)
  .then(transactions => console.log(`Seeded ${transactions.length} transactions OK`))
  .catch(error => console.error(error))    
  .finally(() => db.close())
