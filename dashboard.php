<?php

session_start();

require 'library.php';

if (isset($_POST['send'])) {
	SendMessage($_SESSION['user_id'], $_POST["message"]);
	header("Location: dashboard.php");
}

if (isset($_POST['delete'])) {
	DeleteAllMessages();
}

?>

<!DOCTYPE html>
<html>
	<head>
		<title>Website - Dashboard</title>
		<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
		<link rel="stylesheet" href="styling.css">
		<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
	</head>
	<body>
		<div class="container vertical-center">
			<div class="container">
				<?php $messages = getMessages(); foreach ($messages as $message) { echo "<div class='row'><div class='col-md-2'></div><div class='col-md-8 light message'><p>User " . $message[0] . ": " . $message[1] . "</p><div class='col-md-2'></div></div></div>"; } ?>
				<div class="row">
					<div class="col-md-2"></div>
					<div class="col-md-8 light">
						<form method="post">
							<input class="form-control input" type="text" name="message" placeholder="Send a message" maxlength="255" autocomplete="off">
							<input class="btn btn-primary" type="submit" name="send" value="Send">
							<input class="btn btn-primary" type="submit" name="delete" value="Delete all messages">
						</form>
					</div>
					<div class="col-md-2"></div>
				</div>
			</div>
		</div>
	</body>
</html>