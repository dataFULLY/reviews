/* eslint-disable no-console */
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'reviewsmodule',
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connection established');
  }
});

const getListingReviews = (listingID, callback) => {
  connection.query(`SELECT * FROM reviews WHERE listings_id = ${listingID}`, (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const getListingHost = (listingID, callback) => {
  connection.query(`SELECT host_pic, host_name FROM listings WHERE id = ${listingID}`, (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const getReviewUser = (userID, callback) => {
  connection.query(`SELECT * FROM users WHERE id = ${userID}`, (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

const getReviewResponse = (responseID, callback) => {
  connection.query(`SELECT * FROM responses WHERE id = ${responseID}`, (error, results) => {
    if (error) {
      callback(error);
    } else {
      callback(null, results);
    }
  });
};

module.exports = {
  connection,
  getListingReviews,
  getListingHost,
  getReviewUser,
  getReviewResponse,
};
