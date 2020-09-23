CREATE DATABASE aipassignmentdata;


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

INSERT INTO  owefavour (favourID,userID,username,title,favourdescription,rewards,recievinguserID,recievingusername,complete,favourimage) VALUES
(1,1,'jesus','coffee owe','brought a coffee','coffee',2,'michael',false,'null');



CREATE TABLE todo(
  todo_id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);

CREATE TABLE userData(
  user_ID SERIAL,
  user_fullName VARCHAR(255) not null,
  user_name VARCHAR(255) not null,
  user_password VARCHAR(255) not null,
  user_email VARCHAR(255) not null,
  user_role VARCHAR(255) not null,
  PRIMARY KEY (user_ID)
)
