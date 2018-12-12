<?php

session_start();
$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
$statement = $database -> prepare("INSERT INTO messages (message_id, username, contents) VALUES (NULL, :username, :contents)");
$statement -> bindParam(':username', $_SESSION['username']);
$statement -> bindParam(':contents', $_POST['contents']);
$statement -> execute();
echo $_SESSION['username'];

?>