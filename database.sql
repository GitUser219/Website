DROP DATABASE IF EXISTS db;

CREATE DATABASE db;

CREATE TABLE users (
	username VARCHAR(255) NOT NULL PRIMARY KEY,
	password VARCHAR(255) NOT NULL,
	messages_sent INT UNSIGNED NOT NULL,
	administrator BOOLEAN NOT NULL
) ENGINE = INNODB;
	
INSERT INTO users (username, password, messages_sent, administrator) VALUES ("Jonathan", "password", 0, TRUE), ("KyleighMcCoy", "password", 0, FALSE);

CREATE TABLE messages (
	message_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	contents VARCHAR(255) NOT NULL
) ENGINE = INNODB;

INSERT INTO messages (message_id, username, contents) VALUES (NULL, "Jonathan", "Hello"), (NULL, "KyleighMcCoy", "Hey");

CREATE TABLE registration (
	registration_key INT UNSIGNED NOT NULL PRIMARY KEY
) ENGINE = INNODB;
