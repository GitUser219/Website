<?php

$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
$statement = $database -> query("SELECT username, contents FROM messages");
$result = $statement -> fetchAll();
foreach ($result as $row) {
	echo "/" . $row[0] . ": " . $row[1];
}

?>