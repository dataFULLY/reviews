DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

\c reviews;

CREATE TABLE listings (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  host_pic VARCHAR(300) NOT NULL,
  host_name VARCHAR(50) NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  pic VARCHAR(300) NOT NULL,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE responses (
  id SERIAL PRIMARY KEY,
  comment TEXT NOT NULL
);

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  listings_id INT NOT NULL,
  users_id INT NOT NULL,
  responses_id INT NULL,
  date VARCHAR(50) NOT NULL,
  comment TEXT NOT NULL,
  accuracy SMALLINT NOT NULL,
  communication SMALLINT NOT NULL,
  cleanliness SMALLINT NOT NULL,
  location SMALLINT NOT NULL,
  checkin SMALLINT NOT NULL,
  value SMALLINT NOT NULL
);

COPY listings(name, host_pic, host_name) FROM '/Users/boss/HRSF122/reviews/database/listings.csv' CSV HEADER;

COPY users(pic, name) FROM '/Users/boss/HRSF122/reviews/database/users.csv' CSV HEADER;

COPY responses(comment) FROM '/Users/boss/HRSF122/reviews/database/responses.csv' CSV HEADER;

COPY reviews(listings_id, users_id, responses_id, date, comment, accuracy, communication, cleanliness, location, checkin, value) FROM '/Users/boss/HRSF122/reviews/database/reviews.csv' CSV HEADER;


ALTER TABLE reviews
ADD CONSTRAINT foreign1 FOREIGN KEY (listings_id) REFERENCES listings (id),
ADD CONSTRAINT foreign2 FOREIGN KEY (users_id) REFERENCES users (id),
ADD CONSTRAINT foreign3 FOREIGN KEY (responses_id) REFERENCES responses (id);


CREATE INDEX idx_review_listings_id
ON reviews(listings_id);

CREATE INDEX idx_review_users_id
ON reviews(users_id);

CREATE INDEX idx_review_responses_id
ON reviews(responses_id);

/*
  Execute this file from the command line by typing:
    psql -h localhost -f schema.sql
*/