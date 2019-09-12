const faker = require('faker');
const db = require('./index.js');

const five = 5;
const hundred = 100;
const randomInt = function (max) {
  let num = Math.ceil(Math.random() * max);
  // all IDs start at 1 and not 0
  if (num < 1) {
    num = 1;
  }

  // I'm assuming no ratings will be lower than 2 stars
  if (max === five && num < 2) {
    return randomInt(max);
  }

  return num;
};

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

for (let i = 0; i < hundred; i++) {
  // seed listings table
  const listing = {
    name: `${faker.lorem.words()}`,
    host_pic: `${faker.image.avatar()}`,
    host_name: `${faker.name.firstName()}`,
  };

  db.connection.query('INSERT INTO listings SET ?', listing, (error, results, fields) => {
    if (error) {
      console.log('LISTING INSERT ERROR:');
      console.log(error);
    } else {
      console.log('LISTING INSERT SUCCESS');
    }
  });

  // seed users table
  const user = {
    pic: `${faker.image.avatar()}`,
    name: `${faker.name.firstName()}`,
  };

  db.connection.query('INSERT INTO users SET ?', user, (error, results, fields) => {
    if (error) {
      console.log('USER INSERT ERROR:');
      console.log(error);
    } else {
      console.log('USER INSERT SUCCESS');
    }
  });

  // seed responses table
  const response = {
    comment: `${faker.lorem.paragraph()}`,
  };

  db.connection.query('INSERT INTO responses SET ?', response, (error, results, fields) => {
    if (error) {
      console.log('RESPONSE INSERT ERROR:');
      console.log(error);
    } else {
      console.log('RESPONSE INSERT SUCCESS');
    }
  });
}

for (let i = 0; i < 2100; i++) {
  // seed reviews table
  let reviewDate = new Date(`${faker.date.past().toString()}`);
  reviewDate = `${months[reviewDate.getMonth()]} ${reviewDate.getFullYear()}`;

  const review = {
    listings_id: `${randomInt(hundred)}`,
    users_id: `${randomInt(hundred)}`,
    date: reviewDate,
    comment: `${faker.lorem.paragraph()}`,
    accuracy: `${randomInt(five)}`,
    communication: `${randomInt(five)}`,
    cleanliness: `${randomInt(five)}`,
    location: `${randomInt(five)}`,
    checkin: `${randomInt(five)}`,
    value: `${randomInt(five)}`,
    responses_id: `${randomInt(hundred)}` < 25 ? `${randomInt(hundred)}` : null,
  };

  db.connection.query('INSERT INTO reviews SET ?', review, (error, results, fields) => {
    if (error) {
      console.log('RESPONSE INSERT ERROR:');
      console.log(error);
    } else {
      console.log('REVIEW INSERT SUCCESS');
    }
  });
}

console.log('seeder running');

db.connection.end();
