<?php

$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
$statement = $database -> query("SELECT username, contents FROM messages");
$result = $statement -> fetchAll();
foreach ($result as $row) {
	echo "<div class='row'><div class='col-md-2'></div><div class='col-md-8 light message'><p>" . $row[0] . ": " . $row[1] . "</p><div class='col-md-2'></div></div></div>";
}

?>