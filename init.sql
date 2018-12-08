DROP DATABASE IF EXISTS db;

CREATE DATABASE db;

CREATE TABLE users (
	user_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(255) UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL
) ENGINE = INNODB;
	
INSERT INTO users (user_id, username, password) VALUES (NULL, "Jonathan", "password"), (NULL, "Kyleigh", "password");

CREATE TABLE messages (
	message_id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user_id INT UNSIGNED NOT NULL,
	contents VARCHAR(255) NOT NULL,
	FOREIGN KEY (user_id) REFERENCES users(user_id)
) ENGINE = INNODB;

INSERT INTO messages (message_id, user_id, contents) VALUES (NULL, 1, "Hello"), (NULL, 2, "Hey");