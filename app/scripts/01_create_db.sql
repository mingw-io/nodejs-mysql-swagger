DROP DATABASE IF EXISTS testdb;

CREATE DATABASE testdb;

USE testdb;

CREATE TABLE IF NOT EXISTS `courses` (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  description varchar(255),
  university varchar(255),
  level varchar(255),
  logo varchar(255),
  code varchar(255),
  fee varchar(255),
  duration varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;