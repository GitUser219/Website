<?php

$database = new PDO("mysql:host=localhost;dbname=db", "root", "");
$statement = $database -> query("SELECT username, administrator FROM users");
$result = $statement -> fetchAll();
echo "<table class='table table-bordered'><thead><tr><th>#</th><th>Username</th><th>Role</th><th>Messages Sent</th></tr></thead><tbody>";
$row_number = 1;
foreach ($result as $row) {
	echo "<tr><td>" . $row_number . "</td>";
	echo "<td>" . $row[0] . "</td>";
	if ($row[1]) {
		echo "<td>administrator</td>"; 
	} else {
		echo "<td>user</td>";
	}
	echo "<td>TBA</td></tr>";
	$row_number++;
}
echo "</tbody></table>";

?>