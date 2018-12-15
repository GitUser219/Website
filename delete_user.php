<?php

session_start();
if ($_SESSION['username'] == $_POST['username']) {
	echo 0;
} else {
	$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
	$statement = $database -> prepare("DELETE FROM users WHERE username = :username");
	$statement -> bindParam(':username', $_POST['username']);
	$statement -> execute();
	echo 1;
}

?>