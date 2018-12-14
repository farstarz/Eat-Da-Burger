-- Create the database burgers_db and specify it for use
CREATE DATABASE burgers_db;
USE burgers_db;
--create the table burgers
CREATE TABLE burgers
(
    id int NOT NULL AUTO_INCREMENT,
    burger_name VARCHAR(255) NOT NULL,
    devoured TINYINT(1),
    PRIMARY KEY (id)
);

