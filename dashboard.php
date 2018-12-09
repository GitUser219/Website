<?php

session_start();

require 'library.php';

$messages = getMessages();

foreach ($messages as $message) {
	echo "User " . $message[0] . ": " . $message[1] . "<br>";
}

echo "[User " . $_SESSION['user_id'] . "]";

if (isset($_POST['send'])) {
	SendMessage($_SESSION['user_id'], $_POST["message"]);
	header("Location: dashboard.php");
}

?>

<!DOCTYPE html>
<html>
	<head>
		<title>Website</title>
		<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
		<link rel="stylesheet" href="styling.css">
	</head>
	<body>
		<div class="container">
			<form method="post">
				<input class="form-control input" type="text" name="message" placeholder="Send a message" maxlength="255" autocomplete="off">
				<input class="btn btn-primary" type="submit" name="send" value="Send">
			</form>
		</div>
	</body>
</html>