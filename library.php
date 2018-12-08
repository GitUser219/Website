<?php

// Returns PDO
function Database() {
	
	try {
		$database_connection = new PDO("mysql:host=localhost;dbname=db", "root", "");
		$database_connection -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	} catch (PDOException $e) {
		echo "Database connection failed: " . $e -> getMessage();
	}
	
	return $database_connection;
}

// Returns user_id on success, 0 on failure
function Login($username, $password) {
	
	$database = Database();
	$statement = $database -> prepare("SELECT user_id FROM users WHERE username = :username AND password = :password");
	$statement -> bindParam(':username', $username);
	$statement -> bindParam(':password', $password);
	$statement -> execute();
	$result = $statement -> fetchAll();
	if (sizeof($result) != 1)
		return 0;
	else
		return $result[0][0];
}

// Returns user_id on success, 0 on failure
function Username($username) {
	
	$database = Database();
	$statement = $database -> prepare("SELECT user_id FROM users WHERE username = :username");
	$statement -> bindParam(':username', $username);
	$statement -> execute();
	$result = $statement -> fetchAll();
	if (sizeof($result) != 1)
		return 0;
	else
		return 1;
}

?>