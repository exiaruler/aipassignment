CREATE TABLE owefavour (
favourID INT ,
userID INT ,
username VARCHAR,
title VARCHAR,
favourdescription VARCHAR,
rewards VARCHAR,
recievinguserID  INT ,
recievingusername VARCHAR,
complete Boolean,
favourimage Bytea,
PRIMARY KEY (favourID)
/*
FOREIGN KEY (userID)
FOREIGN KEY (recievinguserID)
REFERENCES user (userID)
*/
); 

