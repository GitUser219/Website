$().ready(function() {
	
	$("#manage_users_button").click(function() {
		$.ajax({
			type: "GET",
			url: "get_users.php",
			success: function(response) {
				$("#user_data").html(response);
			}
		});
	});
	
	$("#delete_user_button").click(function() {
		$.ajax({
			type: "POST",
			url: "username_exists.php",
			data: "username=" + $("#username_text").val(),
			success(response) {
				if (response == 0) {
					$("#user_deletion_response").html("That user does not exist");
				} else {
					$.ajax({
						type: "POST",
						url: "delete_user.php",
						data: "username=" + $("#username_text").val(),
						success(response) {
							if (response == 0) {
								$("#user_deletion_response").html("You cannot delete your own account");
							} else {
								$("#user_deletion_response").html("");
								$.ajax({
									type: "GET",
									url: "get_users.php",
									success: function(response) {
										$("#user_data").html(response);
										$("#username_text").val("");
									}
								});
							}
						}
					});
				}
			}
		});
	});
	
	$("#manage_users_close_button").click(function() {
		$("#user_deletion_response").html("");
		$("#username_text").val("");
	});
	
	$("#generate_key_button").click(function() {
		$.ajax({
			type: "GET",
			url: "generate_key.php",
			success: function(response) {
				$("#registration_key").html(response);
				$("#generate_key_button").prop("disabled", true);
				$("#delete_key_button").prop("disabled", false);
				$("#registration_close_button").prop("disabled", true);
			}
		});
	});
	
	$("#delete_key_button").click(function() {
		$.ajax({
			type: "GET",
			url: "delete_key.php",
			success: function() {
				$("#registration_key").html("Registration key");
				$("#generate_key_button").prop("disabled", false);
				$("#delete_key_button").prop("disabled", true);
				$("#registration_close_button").prop("disabled", false);
			}
		});
	});
	
	$("#logout_button").click(function() {
		$.ajax({
			type: "GET",
			url: "logout.php",
			success: function() {
				window.location="index.html";
			}
		});
	});
	
	$("#dashboard_button").click(function() {
		window.location="dashboard.html";
	});
});