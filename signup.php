<?php

$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
$statement = $database -> prepare("INSERT INTO users (user_id, username, password, administrator) VALUES (NULL, :username, :password, FALSE); SELECT LAST_INSERT_ID();");
$statement -> bindParam(':username', $_POST['username']);
$statement -> bindParam(':password', $_POST['password']);
$statement -> execute();
$result = $statement -> fetchAll();
if (sizeof($result) == 1) {
	session_start();
	$_SESSION['user_id'] = $result[0][0];
}

?>