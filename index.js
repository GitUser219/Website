$().ready(function() {
	
	$("#login_button").click(function() {
		
		if ($("#login_username").val().length > 7 && $("#login_username").val().length < 256 && $("#login_password").val().length > 7 && $("#login_password").val().length < 256) {
			$.ajax({
				type: "POST",
				url: "login.php",
				data: "username=" + $("#login_username").val() + "&password=" + $("#login_password").val(),
				success: function(response) {
					if (response == 1) {
						window.location="dashboard.html";
					} else {
						$("#login_response").html("Invalid username or password");
					}
				}
			});
		} else {
			$("#login_response").html("Invalid username or password");
		}
	});
	
	$("#signup_button").click(function() {
		
		var username_is_good = false;
		var password_is_good = false;
		var registration_key_is_good = false
		
		if ($("#signup_username").val().length < 8) {
			$("#signup_username_response").html("Your username must contain at least 8 characters");
		} else if ($("#signup_username").val().length > 255) {
			$("#signup_username_response").html("Your username must contain at most 255 characters");
		} else {
			$.ajax({
				type: "POST",
				url: "username_exists.php",
				data: "username=" + $("#signup_username").val(),
				success: function(response) {
					if (response == 1) {
						$("#signup_username_response").html("That username is taken");
					} else {
						$("#signup_username_response").html("");
						username_is_good = true;
						if (password_is_good && registration_key_is_good) {
							$.ajax({
								type: "POST",
								url: "signup.php",
								data: "username=" + $("#signup_username").val() + "&password=" + $("#signup_password_1").val(),
								success: function() {
									window.location="dashboard.html";
								}
							});
						}
					}
				}
			});
		}
		
		if ($("#signup_password_1").val().length < 8) {
			$("#signup_password_1_response").html("Your password must contain at least 8 characters");
			$("#signup_password_2_response").html("");
		} else if ($("#signup_password_1").val().length > 255) {
			$("#signup_password_1_response").html("Your password must contain at most 255 characters");
			$("#signup_password_2_response").html("");
		} else if ($("#signup_password_2").val() != $("#signup_password_1").val()) {
			$("#signup_password_2_response").html("Your passwords do not match");
		} else {
			$("#signup_password_1_response").html("");
			$("#signup_password_2_response").html("");
			password_is_good = true;
			if (username_is_good && registration_key_is_good) {
				$.ajax({
					type: "POST",
					url: "signup.php",
					data: "username=" + $("#signup_username").val() + "&password=" + $("#signup_password_1").val(),
					success: function() {
						window.location="dashboard.html";
					}
				});
			}
		}
		
		if ($("#registration_key").val().length != 6 || $("#registration_key").val().match(/[^0-9]/) != null) {
			$("#registration_key_response").html("Invalid registration key");
		} else {
			$.ajax({
				type: "POST",
				url: "registration_key_exists.php",
				data: "registration_key=" + $("#registration_key").val(),
				success: function(response) {
					if (response == 1) {
						$("#registration_key_response").html("");
						registration_key_is_good = true;
						if (username_is_good && password_is_good) {
							$.ajax({
								type: "POST",
								url: "signup.php",
								data: "username=" + $("#signup_username").val() + "&password=" + $("#signup_password_1").val(),
								success: function() {
									window.location="dashboard.html";
								}
							});
						}
					} else {
						$("#registration_key_response").html("Invalid registration key");
					}
				}
			});
		}
	});
});