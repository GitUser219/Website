<?php

require 'library.php';

if (isset($_POST['login'])) {
	$user_id = Login($_POST["login_username"], $_POST["login_password"]);
	session_start();
	$_SESSION['user_id'] = $user_id;
	header("Location: dashboard.php");
}

if (isset($_POST['signup'])) {
	$user_id = Signup($_POST["signup_username"], $_POST["signup_password_1"]);
	session_start();
	$_SESSION['user_id'] = $user_id;
	header("Location: dashboard.php");
}

?>

<!DOCTYPE html>
<html>
	<head>
		<title>Website - Login</title>
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
				<div class="row">
					<div class="col-md-4"></div>
					<div class="col-md-4 light">
						<form method="post">
							<label>Log in</label>
							<input class="form-control input" type="text" name="login_username" placeholder="Username" maxlength="255" autocomplete="off" id="login_username">
							<div id="login_username_response"></div>
							<input class="form-control input" type="password" name="login_password" placeholder="Password" maxlength="255" autocomplete="off" id="login_password">
							<div id="login_password_response"></div>
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
							<input class="form-control input" type="text" name="signup_username" placeholder="Username" maxlength="255" autocomplete="off" id="signup_username">
							<div id="signup_username_response"></div>
							<input class="form-control input" type="password" name="signup_password_1" placeholder="Password" maxlength="255" autocomplete="off" id="signup_password_1">
							<div id="signup_password_1_response"></div>
							<input class="form-control input" type="password" name="signup_password_2" placeholder="Retype password" maxlength="255" autocomplete="off" id="signup_password_2">
							<div id="signup_password_2_response"></div>
							<input class="btn btn-primary" type="submit" name="signup" value="Sign up">
							<label id="test"></label>
						</form>
					</div>
					<div class="col-md-4"></div>
				</div>
			</div>
		</div>
	</body>
</html>

<script>
$().ready(function() {
	$("#login_username").keyup(function() {
		$("#login_username_response").html($("#login_username").val());
    });
	$("#login_password").keyup(function() {
		$("#login_password_response").html($("#login_password").val());
    });
	$("#signup_username").keyup(function() {
		if ($("#signup_username").val() != "") {
			if ($("#signup_username").val().length < 8) {
				$("#signup_username_response").show();
				$("#signup_username_response").html("Your username must be at least 8 characters long");
			} else {
				var dataString = "username=" + $("#signup_username").val();
				$.ajax({
					type: "POST",
					url: "username_check.php",
					data: dataString,
					cache: false,
					success: function(result) {
						if (result == "available") {
							$("#signup_username_response").hide();
						} else {
							$("#signup_username_response").show();
							$("#signup_username_response").html(result);
						}
					}
				});
			}
		} else {
			$("#signup_username_response").hide();
		}
    });
	$("#signup_password_1").keyup(function() {
		$("#signup_password_1_response").html($("#signup_password_1").val());
    });
	$("#signup_password_2").keyup(function() {
		$("#signup_password_2_response").html($("#signup_password_2").val());
    });
});
</script>