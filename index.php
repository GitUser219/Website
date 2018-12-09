<?php

require 'library.php';

if (isset($_POST['login'])) {
	if (strlen($_POST["login_username"]) < 8 || strlen($_POST["login_password"]) < 8) {
		echo "Your username and password must consist of at least 8 characters";
	} else if (!ctype_alnum($_POST["login_username"]) || !ctype_alnum($_POST["login_password"])) {
		echo "Your username and password must consist of only alphanumeric characters";
	} else if ($user_id = Login($_POST["login_username"], $_POST["login_password"])) {
		session_start();
		$_SESSION['user_id'] = $user_id;
		header("Location: dashboard.php");
	} else {
		echo "Invalid username or password";
	}
}

if (isset($_POST['signup'])) {
	if (strlen($_POST["signup_username"]) < 8 || strlen($_POST["signup_password_1"]) < 8 || strlen($_POST["signup_password_2"]) < 8) {
		echo "Your username and password must consist of at least 8 characters";
	} else if (!ctype_alnum($_POST["signup_username"]) || !ctype_alnum($_POST["signup_password_1"]) || !ctype_alnum($_POST["signup_password_2"])) {
		echo "Your username and password must consist of only alphanumeric characters";
	} else if (UsernameExists($_POST["signup_username"])) {
		echo "That username is taken";
	} else if ($_POST["signup_password_1"] != $_POST["signup_password_2"]) {
		echo "Those passwords do not match";
	} else {
		$user_id = Signup($_POST["signup_username"], $_POST["signup_password_1"]);
		session_start();
		$_SESSION['user_id'] = $user_id;
		header("Location: dashboard.php");
	}
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
		<div class="container vertical-center">
			<div class="container">
				<div class="row">
					<div class="col-md-4"></div>
					<div class="col-md-4 light">
						<form method="post">
							<label>Log in</label>
							<input class="form-control input" type="text" name="login_username" placeholder="Username" maxlength="255">
							<input class="form-control input" type="password" name="login_password" placeholder="Password" maxlength="255">
							<input class="btn btn-primary" type="submit" name="login" value="Log in">
						</form>
					</div>
					<div class="col-md-4"></div>
				</div>
				<div class="row">
					<div class="col-md-4"></div>
					<div class="col-md-4 text-center">
						<label>OR</label>
					</div>
					<div class="col-md-4"></div>
				</div>
				<div class="row">
					<div class="col-md-4"></div>
					<div class="col-md-4 light">
						<form method="post">
							<label>Sign up</label>
							<input class="form-control input" type="text" name="signup_username" placeholder="Username" maxlength="255">
							<input class="form-control input" type="password" name="signup_password_1" placeholder="Password" maxlength="255">
							<input class="form-control input" type="password" name="signup_password_2" placeholder="Re-enter password" maxlength="255">
							<input class="btn btn-primary" type="submit" name="signup" value="Sign up">
						</form>
					</div>
					<div class="col-md-4"></div>
				</div>
			</div>
		</div>
	</body>
</html>