<?php

$registration_key = "";
for ($i = 0; $i < 6; $i++) {
	$registration_key .= rand(0, 9);
}
$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
$statement = $database -> prepare("INSERT INTO registration (registration_key) VALUES (:registration_key)");
$statement -> bindParam(':registration_key', $registration_key);
$statement -> execute();
echo $registration_key;

?>