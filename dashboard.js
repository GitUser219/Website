$().ready(function() {
	
	$.ajax({
		type: "GET",
		url: "get_messages.php",
		success: function(html) {
			if (html.length > 0) {
				$("#messages").html(html);
			} else {
				$("#delete_all_messages_button").prop("disabled", true);
			}
		}
	});
	
	$("#send_button").click(function() {
		if ($("#contents").val() != "") {
			$.ajax({
				type: "POST",
				url: "send_message.php",
				data: "contents=" + $("#contents").val(),
				success: function(username) {
					$("#messages").html($("#messages").html() + "<div class='row'><div class='col-md-2'></div><div class='col-md-8 light message'><p>" + username + ": " + $("#contents").val() + "</p><div class='col-md-2'></div></div></div>");
					$("#contents").val("");
					$("#delete_all_messages_button").prop("disabled", false);
				}
			});
		}
	});
	
	$("#delete_all_messages_button").click(function() {
		if ($("#messages").html() != "") {
			$.ajax({
				type: "GET",
				url: "delete_all_messages.php"
			});
			$("#messages").html("");
			$("#delete_all_messages_button").prop("disabled", true);
		}
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
	
	$("#see_users_button").click(function() {
		$.ajax({
			type: "GET",
			url: "get_users.php",
			success: function(html) {
				$("#user_data").html(html);
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
					$("#user_deletion_response").show();
					$("#user_deletion_response").html("That user does not exist");
				} else {
					$.ajax({
						type: "POST",
						url: "delete_user.php",
						data: "username=" + $("#username_text").val(),
						success(response) {
							if (response == 0) {
								$("#user_deletion_response").show();
								$("#user_deletion_response").html("You cannot delete your own account");
							} else {
								$("#user_deletion_response").hide();
								$.ajax({
									type: "GET",
									url: "get_users.php",
									success: function(html) {
										$("#user_data").html(html);
										$("#username_text").val("");
										$("#delete_user_button").prop("disabled", true);
									}
								});
							}
						}
					});
				}
			}
		});
	});
	
	$("#generate_button").click(function() {
		$.ajax({
			type: "GET",
			url: "generate_key.php",
			success: function(registration_key) {
				$("#registration_key").html(registration_key);
				$("#generate_button").prop("disabled", true);
				$("#delete_key_button").prop("disabled", false);
				$("#close_button").prop("disabled", true);
			}
		});
	});
	
	$("#delete_key_button").click(function() {
		$.ajax({
			type: "GET",
			url: "delete_key.php",
			success: function() {
				$("#registration_key").html("Registration key");
				$("#generate_button").prop("disabled", false);
				$("#delete_key_button").prop("disabled", true);
				$("#close_button").prop("disabled", false);
			}
		});
	});
});