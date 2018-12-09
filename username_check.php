<?php

$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
$statement = $database -> prepare("SELECT COUNT(*) FROM users WHERE username = :username");
$statement -> bindParam(':username', $_POST['username']);
$statement -> execute();
$result = $statement -> fetchAll();
echo sizeof($result);

?>