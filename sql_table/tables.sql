CREATE DATABASE aipassignmentdata;


CREATE TABLE owefavour (
favour_ID SERIAL ,
user_ID INT ,
user_name VARCHAR(255) ,
title VARCHAR(255) ,
favour_type VARCHAR,
favour_description VARCHAR(255) ,
rewards VARCHAR(255) ,
recieving_userID  INT ,
recieving_username VARCHAR(255) ,
favour_image VARCHAR,
complete_image VARCHAR,
favour_date VARCHAR,
	PRIMARY KEY (favour_ID),
CONSTRAINT fk_user
FOREIGN KEY (user_ID)
REFERENCES userData(user_ID)

); 


CREATE TABLE favourRequest (
  favour_id SERIAL,
  user_ID INT,
  user_name VARCHAR(255),
  title VARCHAR(255),
  favour_description VARCHAR(255),
  rewards VARCHAR(255),
  completing_userid INT,
  completing_username VARCHAR,
  complete BOOLEAN,
  image Bytea,
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
