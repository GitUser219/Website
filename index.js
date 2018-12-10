$().ready(function() {

	var login_username_ready = false;
	var login_password_ready = false;
	var signup_username_ready = false;
	var signup_password_1_ready = false;
	var signup_password_2_ready = false;
	
	$("#login_username").keyup(function() {
		
		if ($("#login_username").val().length < 8) {
			$("#login_button").prop("disabled", true);
			login_username_ready = false;
		} else {
			login_username_ready = true;
			if (login_password_ready) {
				$("#login_button").prop("disabled", false);
			}
		}
    });
	
	$("#login_password").keyup(function() {
		
		if ($("#login_password").val().length < 8) {
			$("#login_button").prop("disabled", true);
			login_password_ready = false;
		} else {
			login_password_ready = true;
			if(login_username_ready) {
				$("#login_button").prop("disabled", false);
			}
		}
    });
	
	$("#login_button").click(function() {
		var dataString = "username=" + $("#login_username").val() + "&password=" + $("#login_password").val();
		$.ajax({
			type: "POST",
			url: "login.php",
			data: dataString,
			success: function(user_id) {
				if (user_id != 0) {
					window.location="dashboard.html";
				} else {
					$("#login_response").show();
					$("#login_response").html("Invalid username or password");
				}
			}
		});
	});
	
	$("#signup_username").keyup(function() {
		
		if ($("#signup_username").val() != "") {
			
			if ($("#signup_username").val().length < 8) {
				$("#signup_username_response").show();
				$("#signup_username_response").html("Your username must be at least 8 characters long");
				$("#signup_button").prop("disabled", true);
				signup_username_ready = false;
			} else {
				var dataString = "username=" + $("#signup_username").val();
				$.ajax({
					type: "POST",
					url: "username_check.php",
					data: dataString,
					success: function(response) {
						
						if (response == "available") {
							$("#signup_username_response").hide();
							signup_username_ready = true;
							if (signup_password_1_ready && signup_password_2_ready) {
								$("#signup_button").prop("disabled", false);
							} else {
								$("#signup_button").prop("disabled", true);
							}
						} else {
							$("#signup_username_response").show();
							$("#signup_username_response").html(response);
							$("#signup_button").prop("disabled", true);
							signup_username_ready = false;
						}
					}
				});
			}
		} else {
			$("#signup_username_response").hide();
			$("#signup_button").prop("disabled", true);
			signup_username_ready = false;
		}
    });
	
	$("#signup_password_1").keyup(function() {
		
		if ($("#signup_password_1").val() != "") {
			
			if ($("#signup_password_1").val().length < 8) {
				$("#signup_password_1_response").show();
				$("#signup_password_1_response").html("Your password must be at least 8 characters long");
				$("#signup_button").prop("disabled", true);
				signup_password_1_ready = false;
			} else {
				$("#signup_password_1_response").hide();
				signup_password_1_ready = true;
				if (signup_username_ready && signup_password_2_ready) {
					$("#signup_button").prop("disabled", false);
				} else {
					$("#signup_button").prop("disabled", true);
				}
			}
			
		} else {
			$("#signup_password_1_response").hide();
			$("#signup_button").prop("disabled", true);
			signup_password_1_ready = false;
		}
		
		if ($("#signup_password_2").val() != "") {
			
			if ($("#signup_password_2").val() != $("#signup_password_1").val()) {
				$("#signup_password_2_response").show();
				$("#signup_password_2_response").html("The two passwords do not match");
				$("#signup_button").prop("disabled", true);
				signup_password_2_ready = false;
			} else {
				$("#signup_password_2_response").hide();
				signup_password_2_ready = true;
				if (signup_username_ready && signup_password_1_ready) {
					$("#signup_button").prop("disabled", false);
				} else {
					$("#signup_button").prop("disabled", true);
				}
			}
			
		} else {
			$("#signup_password_2_response").hide();
			$("#signup_button").prop("disabled", true);
			signup_password_2_ready = false;
		}
    });
	
	$("#signup_password_2").keyup(function() {
		
		if ($("#signup_password_2").val() != "") {
			
			if ($("#signup_password_2").val() != $("#signup_password_1").val()) {
				$("#signup_password_2_response").show();
				$("#signup_password_2_response").html("The two passwords do not match");
				$("#signup_button").prop("disabled", true);
				signup_password_2_ready = false;
			} else {
				$("#signup_password_2_response").hide();
				signup_password_2_ready = true;
				if (signup_username_ready && signup_password_1_ready) {
					$("#signup_button").prop("disabled", false);
				} else {
					$("#signup_button").prop("disabled", true);
				}
			}
			
		} else {
			$("#signup_password_2_response").hide();
			$("#signup_button").prop("disabled", true);
			signup_password_2_ready = false;
		}
    });
	
	$("#signup_button").click(function() {
		var dataString = "username=" + $("#signup_username").val() + "&password=" + $("#signup_password_1").val();
		$.ajax({
			type: "POST",
			url: "signup.php",
			data: dataString,
			success: function() {
				window.location="dashboard.html";
			}
		});
	});
});