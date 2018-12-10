<?php

$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
$statement = $database -> query("SELECT user_id, contents FROM messages");
return $statement -> fetchAll();

?>