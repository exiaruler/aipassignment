CREATE DATABASE aipassignmentdata;


CREATE TABLE owefavour (
favour_ID SERIAL ,
user_ID INT ,
user_name VARCHAR(255) ,
title VARCHAR(255) ,
favour_description VARCHAR(255) ,
rewards VARCHAR(255) ,
recieving_userID  INT ,
recieving_username VARCHAR(255) ,
favour_image Bytea,
complete_image Bytea,
	PRIMARY KEY (favour_ID),
CONSTRAINT fk_user
FOREIGN KEY (user_ID)
REFERENCES userData(user_ID)

); 


CREATE TABLE favourRequest (
  favourID INT,
  user_ID INT,
  user_name VARCHAR(255),
  title VARCHAR(255),
  favour_description VARCHAR(255),
  rewards VARCHAR(255),
  completing_UserID INT,
  completing_Username VARCHAR,
  favour_image Bytea,
  complete_image Bytea,
  CONSTRAINT fk_user
  PRIMARY KEY (favourID),
  FOREIGN KEY (user_ID)
  REFERENCES userData(user_ID)
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