CREATE DATABASE aipassingmentdata;


CREATE TABLE owefavour (
favour_ID INT ,
user_ID INT ,
user_name VARCHAR(255) ,
title VARCHAR(255) ,
favour_description VARCHAR(255) ,
rewards VARCHAR(255) ,
recieving_userID  INT ,
recieving_username VARCHAR(255) ,
favour_image Bytea,
complete_image Bytea
CONSTRAINT fk_user
PRIMARY KEY (favourID)
FOREIGN KEY (user_ID)
REFERENCES userData(user_ID)

); 

INSERT INTO  owefavour (favourID,userID,username,title,favourdescription,rewards,recievinguserID,recievingusername,complete,favourimage) VALUES
(1,1,'jesus','coffee owe','brought a coffee','coffee',2,'michael','null','null');



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