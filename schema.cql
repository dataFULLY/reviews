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
  PRIMARY KEY (id)
);

COPY listings(id, name, host_pic, host_name) FROM '/Users/boss/HRSF122/reviews/database/listings.csv' WITH DELIMITER = ',' AND HEADER = TRUE;

COPY users(id, pic, name) FROM '/Users/boss/HRSF122/reviews/database/users.csv' WITH DELIMITER = ',' AND HEADER = TRUE;

COPY responses(id, comment) FROM '/Users/boss/HRSF122/reviews/database/responses.csv' WITH DELIMITER = ',' AND HEADER = TRUE;

COPY reviews(id, listings_id, users_id, responses_id, date, comment, accuracy, communication, cleanliness, location, checkin, value) FROM '/Users/boss/HRSF122/reviews/database/reviews.csv' WITH DELIMITER = ',' AND HEADER = TRUE;

/*

WITH CLUSTERING ORDER BY (id ASC, listings_id DESC, users_id DESC, responses_id DESC)


  Execute this file from the command line by typing:
    psql -h localhost -f schema.sql
*/
