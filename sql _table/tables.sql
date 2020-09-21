CREATE DATABASE aipassingmentdata;


CREATE TABLE owefavour (
PRIMARY KEY  favourID INT ,
userID INT ,
username VARCHAR,
title VARCHAR,
favourdescription VARCHAR,
rewards VARCHAR,
recievinguserID  INT ,
recievingusername VARCHAR,
complete Boolean,
favourimage Bytea,

/*
FOREIGN KEY (userID)
FOREIGN KEY (recievinguserID)
REFERENCES user (userID)
*/
); 


CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);