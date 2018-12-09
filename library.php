<?php

function Login($username, $password) {

	$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
	$statement = $database -> prepare("SELECT user_id FROM users WHERE username = :username AND password = :password");
	$statement -> bindParam(':username', $username);
	$statement -> bindParam(':password', $password);
	$statement -> execute();
	$result = $statement -> fetchAll();
	if (sizeof($result) == 1) {
		return $result[0][0];
	} else {
		return 0;
	}
}

function UsernameExists($username) {

	$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
	$statement = $database -> prepare("SELECT user_id FROM users WHERE username = :username");
	$statement -> bindParam(':username', $username);
	$statement -> execute();
	$result = $statement -> fetchAll();
	if (sizeof($result) == 1) {
		return true;
	} else {
		return false;
	}
}

function Signup($username, $password) {

	$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
	$statement = $database -> prepare("INSERT INTO users (user_id, username, password, administrator) VALUES (NULL, :username, :password, FALSE)");
	$statement -> bindParam(':username', $username);
	$statement -> bindParam(':password', $password);
	$statement -> execute();
	$statement = $database -> prepare("SELECT user_id FROM users WHERE username = :username");
	$statement -> bindParam(':username', $username);
	$statement -> execute();
	$result = $statement -> fetchAll();
	if (sizeof($result) == 1) {
		return $result[0][0];
	} else {
		return 0;
	}
}

function GetMessages() {

	$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
	$statement = $database -> query("SELECT user_id, contents FROM messages");
	return $statement -> fetchAll();
}

function SendMessage($user_id, $contents) {

	$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
	$statement = $database -> prepare("INSERT INTO messages (message_id, user_id, contents) VALUES (NULL, :user_id, :contents)");
	$statement -> bindParam(':user_id', $user_id);
	$statement -> bindParam(':contents', $contents);
	$statement -> execute();
}

?>