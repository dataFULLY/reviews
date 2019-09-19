DROP KEYSPACE IF EXISTS reviews_module;

CREATE KEYSPACE reviews_module WITH REPLICATION={'class':'SimpleStrategy', 'replication_factor': 1};

USE reviews_module;

CREATE TABLE listings(
  id INT,
  name TEXT,
  host_pic TEXT,
  host_name TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE users(
  id INT,
  pic VARCHAR,
  name VARCHAR,
  PRIMARY KEY (id)
);

CREATE TABLE responses(
  id INT,
  comment TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE reviews(
  id INT,
  listings_id INT,
  users_id INT,
  responses_id INT,
  date VARCHAR,
  comment TEXT,
  accuracy SMALLINT,
  communication SMALLINT,
  cleanliness SMALLINT,
  location SMALLINT,
  checkin SMALLINT,
  value SMALLINT,
  PRIMARY KEY ((id), listings_id, users_id)
);

COPY listings(id, name, host_pic, host_name) FROM '/Users/boss/HRSF122/reviews/database/listings.csv' WITH HEADER = TRUE;

COPY users(id, pic, name) FROM '/Users/boss/HRSF122/reviews/database/users.csv' WITH HEADER = TRUE;

COPY responses(id, comment) FROM '/Users/boss/HRSF122/reviews/database/responses.csv' WITH HEADER = TRUE;

COPY reviews(id, listings_id, users_id, responses_id, date, comment, accuracy, communication, cleanliness, location, checkin, value) FROM '/Users/boss/HRSF122/reviews/database/reviews.csv' WITH HEADER = TRUE;

CREATE INDEX idx_review_listings_id
ON reviews(listings_id);

CREATE INDEX idx_review_users_id
ON reviews(users_id);

CREATE INDEX idx_review_responses_id
ON reviews(responses_id);

/*

  Execute this file from the command line by typing:
    cqlsh -u root -f schema.cql
*/
