/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const db = require('../database/index.js');

const app = express();
const port = 3210;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());
app.use(cors());
app.use('/', express.static(`${__dirname}/../client/dist`));

// CREATE
app.post('/api/listings/:id/reviews', (req, res) => {
  db.insertListing(req, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// READ
app.get('/api/listings/:listing_id/reviews', (req, res) => {
  const listingID = req.params.listing_id;
  db.getListingReviews(listingID, (error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/api/listings/:listing_id/host', (req, res) => {
  const listingID = req.params.listing_id;
  db.getListingHost(listingID, (error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/api/listings/users/:user_id', (req, res) => {
  const userID = req.params.user_id;
  db.getReviewUser(userID, (error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/api/listings/review/response/:response_id', (req, res) => {
  const responseID = req.params.response_id;
  db.getReviewResponse(responseID, (error, data) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.status(200).send(data);
    }
  });
});

// UPDATE
app.put('/api/reviews/:review_id', (req, res) => {
  const reviewID = req.params.review_id;
  const { comment } = req.body;

  db.updateListing(reviewID, comment, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// DELETE
app.delete('/api/reviews/:review_id', (req, res) => {
  const reviewID = req.params.review_id;
  db.deleteListing(reviewID, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
