<?php

$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
$statement = $database -> prepare("INSERT INTO users (username, password, administrator) VALUES (:username, :password, FALSE);");
$statement -> bindParam(':username', $_POST['username']);
$statement -> bindParam(':password', $_POST['password']);
$statement -> execute();
session_start();
$_SESSION['username'] = $_POST['username'];

?>