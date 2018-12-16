<?php

$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
$statement = $database -> query("TRUNCATE TABLE registration");

?>