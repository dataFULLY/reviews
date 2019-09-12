DROP DATABASE IF EXISTS reviewsmodule;

CREATE DATABASE reviewsmodule;

USE reviewsmodule;

CREATE TABLE listings (
  id int AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  host_pic VARCHAR(100) NOT NULL,
  host_name VARCHAR(50) NOT NULL
);

CREATE TABLE users (
  id int AUTO_INCREMENT PRIMARY KEY,
  pic VARCHAR(100) NOT NULL,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE responses (
  id int AUTO_INCREMENT PRIMARY KEY,
  comment TEXT NOT NULL
);

CREATE TABLE reviews (
  id int AUTO_INCREMENT PRIMARY KEY,
  listings_id INT NOT NULL,
  users_id INT NOT NULL,
  date VARCHAR(50),
  comment TEXT NOT NULL,
  accuracy INT NOT NULL,
  communication INT NOT NULL,
  cleanliness INT NOT NULL,
  location INT NOT NULL,
  check_in INT NOT NULL,
  value INT NOT NULL,
  responses_id INT NULL,
  FOREIGN KEY (listings_id) REFERENCES listings (id),
  FOREIGN KEY (users_id) REFERENCES users (id),
  FOREIGN KEY (responses_id) REFERENCES responses (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u <USER> -p < schema.sql
*/