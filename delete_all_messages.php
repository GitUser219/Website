<?php

$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
$statement = $database -> prepare("TRUNCATE TABLE messages");
$statement -> execute();

?>