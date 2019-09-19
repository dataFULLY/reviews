/* eslint-disable no-console */
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  database: 'reviews',
});

client.connect()
  .then(() => console.log('Connected successfully'))
  .catch((err) => console.log(err, 'from index.js'));

const getListingReviews = (listingID, callback) => {
  client.query(`SELECT * FROM reviews WHERE listings_id=${listingID}`, (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const getListingHost = (listingID, callback) => {
  client.query(`SELECT host_pic, host_name FROM listings WHERE id=${listingID}`, (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const getReviewUser = (userID, callback) => {
  client.query(`SELECT * FROM users WHERE id=${userID}`, (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const getReviewResponse = (responseID, callback) => {
  client.query(`SELECT * FROM responses WHERE id = ${responseID}`, (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  getListingReviews,
  getListingHost,
  getReviewUser,
  getReviewResponse,
};
