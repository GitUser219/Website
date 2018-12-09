<?php

$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
$statement = $database -> prepare("SELECT user_id FROM users WHERE username = :username");
$statement -> bindParam(':username', $_POST['username']);
$statement -> execute();
$result = $statement -> fetchAll();
if (sizeof($result) == 1) {
	echo "That username is taken";
} else {
	echo "available";
}

?>