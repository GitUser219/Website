<?php

$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
$statement = $database -> prepare("SELECT user_id FROM users WHERE username = :username AND password = :password");
$statement -> bindParam(':username', $_POST['username']);
$statement -> bindParam(':password', $_POST['password']);
$statement -> execute();
$result = $statement -> fetchAll();
if (sizeof($result) == 1) {
	session_start();
	$_SESSION['user_id'] = $result[0][0];
	echo $result[0][0];
} else {
	echo 0;
}

?>