/* eslint-disable no-console */
const faker = require('faker');
const fs = require('file-system');
const path = require('path');

// Number of records
const numberOfListings = 100;
const numberOfUsers = 100;
const numberOfResponses = 250;
const numberOfReviews = 1000;

// Create 10 Million listings

// Fake data points
const avatar = faker.image.avatar();
const firstName = 'fred';
const title = 'house';

const wsListing = fs.createWriteStream(path.join(__dirname, 'listings.csv'));

const createListing = () => `${title},${avatar},${firstName}\n`;

const tenMillionListings = (writer, data, encoding) => {
  let i = numberOfListings;
  writer.write('name,host_pic,host_name\n');
  const write = () => {
    let ok = true;
    do {
      i -= 1;
      if (i === 0) {
        writer.write(data(), encoding);
        console.log('Writing last listing...\n');
      } else {
        ok = writer.write(data(), encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
};

tenMillionListings(wsListing, createListing, 'utf8');


// Create 10 Million Users

const wsUser = fs.createWriteStream(path.join(__dirname, 'users.csv'));

const createUser = () => `${avatar},${firstName}\n`;

const tenMillionUsers = (writer, data, encoding) => {
  let i = numberOfUsers;
  writer.write('pic,name\n');
  const write = () => {
    let ok = true;
    do {
      i -= 1;
      if (i === 0) {
        writer.write(data(), encoding);
        console.log('Writing last user...\n');
      } else {
        ok = writer.write(data(), encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
};

tenMillionUsers(wsUser, createUser, 'utf8');


// Create 25 Milliion Responses

const wsResponse = fs.createWriteStream(path.join(__dirname, 'responses.csv'));

// Fake description
const description = 'hello world';

const createResponse = () => `${description}\n`;

const twentyFiveMillionResponses = (writer, data, encoding) => {
  let i = numberOfResponses;
  writer.write('comment\n');
  const write = () => {
    let ok = true;
    do {
      i -= 1;
      if (i === 0) {
        writer.write(data(), encoding);
        console.log('Writing last response...\n');
      } else {
        ok = writer.write(data(), encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
};

twentyFiveMillionResponses(wsResponse, createResponse, 'utf8');


// Create 100 Million Reviews

const randomListingId = (listings = numberOfListings) => {
  const randomListing = Math.ceil(Math.random() * listings);
  if (randomListing === 0) {
    return randomListingId();
  }
  return randomListing;
};

const randomUserId = (users = numberOfUsers) => {
  const randomUser = Math.ceil(Math.random() * users);
  if (randomUser === 0) {
    return randomUserId();
  }
  return randomUser;
};

// Assign first 2.5 million reviews a responseId
let assignedResponses = 0;
const getResponseId = (responses = numberOfResponses) => {
  assignedResponses += 1;
  if (assignedResponses > responses) {
    return '';
  }
  return assignedResponses;
};

const randomRating = (max = 5) => Math.ceil(Math.random() * max);

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const createReviewDate = () => {
  let reviewDate = new Date(`${faker.date.past()}`);
  reviewDate = `${months[reviewDate.getMonth()]} ${reviewDate.getFullYear()}`;
  return reviewDate;
};

const wsReviews = fs.createWriteStream(path.join(__dirname, 'reviews.csv'));

let reviewCounter = 0;
const createReview = () => {
  let responseID;
  reviewCounter += 1;
  if (reviewCounter < numberOfResponses) {
    responseID = getResponseId();
  } else {
    responseID = '';
  }
  return `${randomListingId()},${randomUserId()},${responseID},${createReviewDate()},${description},${randomRating()},${randomRating()},${randomRating()},${randomRating()},${randomRating()},${randomRating()}\n`;
};

const hundredMillionReviews = (writer, data, encoding) => {
  let i = numberOfReviews;
  writer.write('listings_id,users_id,responses_id,date,comment,accuracy,communication,cleanliness,location,checkin,value\n');
  const write = () => {
    let ok = true;
    do {
      i -= 1;
      if (i === 0) {
        writer.write(data(), encoding);
        console.log('Writing last review...\n');
      } else {
        ok = writer.write(data(), encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      writer.once('drain', write);
    }
  };
  write();
};

hundredMillionReviews(wsReviews, createReview, 'utf8');
