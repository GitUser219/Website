DROP DATABASE IF EXISTS db;

CREATE DATABASE db;

CREATE TABLE users (
	username VARCHAR(255) NOT NULL PRIMARY KEY,
	password VARCHAR(255) NOT NULL, 
	administrator BOOLEAN NOT NULL
) ENGINE = INNODB;
	
INSERT INTO users (username, password, administrator) VALUES ("Jonathan", "password", TRUE), ("KyleighMcCoy", "password", FALSE);

CREATE TABLE messages (
	message_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(255) NOT NULL,
	contents VARCHAR(255) NOT NULL,
	FOREIGN KEY (username) REFERENCES users(username)
) ENGINE = INNODB;

INSERT INTO messages (message_id, username, contents) VALUES (NULL, "Jonathan", "Hello"), (NULL, "KyleighMcCoy", "Hey");
