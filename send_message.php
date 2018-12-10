<?php

$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
$statement = $database -> prepare("INSERT INTO messages (message_id, user_id, contents) VALUES (NULL, :user_id, :contents)");
$statement -> bindParam(':user_id', $_POST['user_id']);
$statement -> bindParam(':contents', $_POST['contents']);
$statement -> execute();

?>