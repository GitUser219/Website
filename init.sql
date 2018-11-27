DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
	`user_id` int(4) NOT NULL auto_increment,
	`username` varchar(20) NOT NULL UNIQUE,
	`password` varchar(20) NOT NULL,
	PRIMARY KEY (`user_id`)
)

INSERT INTO 'Users' VALUES ('Jonathan', 'password');
INSERT INTO 'Users' VALUES ('Ian', 'password');

DROP TABLE IF EXISTS 'Posts';
CREATE TABLE 'Posts' (
	'post_id' int(6) NOT NULL auto_increment,
	'contents' varchar(250) NOT NULL
	PRIMARY KEY ('post_id')
)
