<?php

$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
$statement = $database -> prepare("SELECT COUNT(*) FROM users WHERE username = :username AND password = :password");
$statement -> bindParam(':username', $_POST['username']);
$statement -> bindParam(':password', $_POST['password']);
$statement -> execute();
$result = $statement -> fetchAll();
if ($result[0][0] == 1) {
	session_start();
	$_SESSION['username'] = $_POST['username'];
	echo 1;
} else {
	echo 0;
}

?>