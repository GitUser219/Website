<?php

session_start();
$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
$statement = $database -> prepare("SELECT administrator FROM users WHERE username = :username");
$statement -> bindParam(':username', $_SESSION['username']);
$statement -> execute();
$result = $statement -> fetchAll();
echo $result[0][0];

?>