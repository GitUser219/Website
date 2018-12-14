<?php

$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
$statement = $database -> query("SELECT username FROM users");
$result = $statement -> fetchAll();
foreach ($result as $row) {
	echo "/" . $row[0];
}

?>