var login_username_ready    = false;
var login_password_ready    = false;
var signup_username_ready   = false;
var signup_password_1_ready = false;
var signup_password_2_ready = false;
var registration_key_ready  = false;

$().ready(function() {
	
	$("#login_username").on("cut paste keyup", function() {
		
		setTimeout(function() {
			if ($("#login_username").val().length < 8) {
				$("#login_button").prop("disabled", true);
				login_username_ready = false;
			} else if (login_password_ready) {
				$("#login_button").prop("disabled", false);
				login_username_ready = true;
			} else {
				login_username_ready = true;
			}
		}, 0);
	});

	$("#login_password").on("cut paste keyup", function() {
		
		setTimeout(function() {
			if ($("#login_password").val().length < 8) {
				$("#login_button").prop("disabled", true);
				login_password_ready = false;
			} else if (login_username_ready) {
				$("#login_button").prop("disabled", false);
				login_password_ready = true;
			} else {
				login_password_ready = true;
			}
		}, 0);
	});
	
	$("#login_button").click(function() {
		
		if ($("#login_username").val().length < 8 ||
			$("#login_username").val().length > 255 ||
			$("#login_password").val().length < 8 ||
			$("#login_password").val().length > 255) {
			$("#login_response").html("Invalid username or password");
		} else {
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
		}
	});
	
	$("#signup_username").on("cut paste keyup", function() {
		
		setTimeout(function() {
			if ($("#signup_username").val() == "") {
				$("#signup_username_response").html("");
			} else {
				if ($("#signup_username").val().length < 8) {
					$("#signup_username_response").html("Your username must be at least 8 characters long");
					$("#signup_button").prop("disabled", true);
					signup_username_ready = false;
				} else {
					$.ajax({
						type: "POST",
						url: "username_exists.php",
						data: "username=" + $("#signup_username").val(),
						success: function(response) {
							if (response == 1) {
								$("#signup_username_response").html("That username is taken");
								$("#signup_button").prop("disabled", true);
								signup_username_ready = false;
							} else {
								$("#signup_username_response").html("");
								signup_username_ready = true;
								if (signup_password_1_ready && signup_password_2_ready && registration_key_ready) {
									$("#signup_button").prop("disabled", false);
								}
							}
						}
					});
				}
			}
		}, 0);
	});
	
	$("#signup_password_1").on("cut paste keyup", function() {
		
		setTimeout(function() {
			if ($("#signup_password_1").val() == "") {
				$("#signup_password_1_response").html("");
			} else {
				if ($("#signup_password_1").val().length < 8) {
					$("#signup_password_1_response").html("Your password must be at least 8 characters long");
					$("#signup_button").prop("disabled", true);
					signup_password_1_ready = false;
				} else {
					$("#signup_password_1_response").html("");
					signup_password_1_ready = true;
					if (signup_username_ready && signup_password_2_ready && registration_key_ready) {
						$("#signup_button").prop("disabled", false);
					}
				}
			}
		}, 0);
	});
	
	$("#signup_password_2").on("cut paste keyup", function() {
		
		setTimeout(function() {
			if ($("#signup_password_2").val() == "") {
				$("#signup_password_2_response").html("");
			} else {
				if ($("#signup_password_2").val() != $("#signup_password_1").val()) {
					$("#signup_password_2_response").html("The two passwords do not match");
					$("#signup_button").prop("disabled", true);
					signup_password_2_ready = false;
				} else {
					$("#signup_password_2_response").html("");
					signup_password_2_ready = true;
					if (signup_username_ready && signup_password_1_ready && registration_key_ready) {
						$("#signup_button").prop("disabled", false);
					}
				}
			}
		}, 0);
	});
	
	$("#registration_key").on("cut paste keyup", function() {
		
		setTimeout(function() {
			if ($("#registration_key").val() == "") {
				$("#registration_key_response").html("");
			} else {
				if ($("#registration_key").val().length != 6 ||
					$("#registration_key").val().match(/[^0-9]/) != null) {
					$("#registration_key_response").html("Invalid registration key");
					$("#signup_button").prop("disabled", true);
					registration_key_ready = false;
				} else {
					$.ajax({
						type: "POST",
						url: "registration_key_exists.php",
						data: "registration_key=" + $("#registration_key").val(),
						success: function(response) {
							if (response == 1) {
								$("#registration_key_response").html("");
								registration_key_ready = true;	
								if (signup_username_ready && signup_password_1_ready && signup_password_2_ready) {
									$("#signup_button").prop("disabled", false);
								}
							} else {
								$("#registration_key_response").html("Invalid registration key");
								$("#signup_button").prop("disabled", true);
								registration_key_ready = false;	
							}
						}
					});
				}
			}
		}, 0);
	});
	
	$("#signup_button").click(function() {
	
		if ($("#signup_username").val().length > 7 &&
			$("#signup_username").val().length < 256 &&
			$("#signup_password_1").val().length > 7 &&
			$("#signup_password_1").val().length < 256 &&
			$("#signup_password_2").val() == $("#signup_password_1").val() &&
			$("#registration_key").val().length == 6 &&
			$("#registration_key").val().match(/[^0-9]/) == null) {
			$.ajax({
				type: "POST",
				url: "username_exists.php",
				data: "username=" + $("#signup_username").val(),
				success: function(response) {
					if (response == 0) {
						$.ajax({
							type: "POST",
							url: "registration_key_exists.php",
							data: "registration_key=" + $("#registration_key").val(),
							success: function(response) {
								if (response == 1) {
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
						});
					}
				}
			});
		}
	});
});