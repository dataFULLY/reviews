/* eslint-disable no-console */
const express = require('express');

const app = express();
const port = 3210;
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const db = require('../database/index.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(compression());
app.use(cors());
app.use('/listings/:listing_id', express.static(`${__dirname}/../client/dist`));

app.get('/api/listings/:listing_id/reviews', (req, res) => {
  const listingID = req.params.listing_id;
  db.getListingReviews(listingID, (error, data) => {
    if (error) {
      console.log('SERVER GET LISTING REVIEWS ERROR: ', error);
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
      console.log('SERVER GET LISTING HOST ERROR: ', error);
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
      console.log('SERVER GET REVIEW USER ERROR: ', error);
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
      console.log('SERVER GET REVIEW RESPONSE ERROR: ', error);
      res.status(500).send(error);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
