<?php

$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
$statement = $database -> prepare("SELECT COUNT(*) FROM registration WHERE registration_key = :registration_key");
$statement -> bindParam(':registration_key', $_POST['registration_key']);
$statement -> execute();
$result = $statement -> fetchAll();
if ($result[0][0] == 1) {
	echo 1;
} else {
	echo 0;
}

?>