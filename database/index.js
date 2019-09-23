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

const deleteListing = (reviewID, callback) => {
  client.query(`DELETE FROM reviews WHERE id=${reviewID}`, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

const updateListing = (reviewID, updatedComment, callback) => {
  client.query(`UPDATE reviews SET comment='${updatedComment}' WHERE id=${reviewID}`, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

const insertListing = (info, callback) => {
  client.query(`INSERT INTO reviews (listings_id, users_id, responses_id, date, comment, accuracy, communication, cleanliness, location, checkin, value) VALUES (${+info.params.id}, ${info.body.users_id}, ${info.body.responses_id}, '${info.body.date}', '${info.body.comment}', ${info.body.accuracy}, ${info.body.communication}, ${info.body.cleanliness}, ${info.body.location}, ${info.body.checkin}, ${info.body.value})`, (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);
    }
  });
};

// client.end();

module.exports = {
  getListingReviews,
  getListingHost,
  getReviewUser,
  getReviewResponse,
  deleteListing,
  updateListing,
  insertListing,
};
