$().ready(function() {
	$("#user_deletion_response").hide();
	
	$.ajax({
		type: "GET",
		url: "get_role.php",
		success: function(administrator) {
			if (administrator == 1) {
				$("#see_users_button").show();
			} else {
				$("#see_users_button").hide();
			}
		}
	});
	
	$.ajax({
		type: "GET",
		url: "get_messages.php",
		success: function(html) {
			if (html.length > 0) {
				$("#messages").html(html);
			} else {
				$("#delete_button").prop("disabled", true);
			}
		}
	});

	$("#contents").keyup(function() {
		if ($("#contents").val().trim() != "") {
			$("#send_button").prop("disabled", false);
		} else {
			$("#send_button").prop("disabled", true);
		}
	});
	
	$("#send_button").click(function() {
		if ($("#contents").val() != "") {
			var dataString = "contents=" + $("#contents").val();
			$.ajax({
				type: "POST",
				url: "send_message.php",
				data: dataString,
				success: function(username) {
					$("#messages").html($("#messages").html() + "<div class='row'><div class='col-md-2'></div><div class='col-md-8 light message'><p>" + username + ": " + $("#contents").val() + "</p><div class='col-md-2'></div></div></div>");
					$("#contents").val("");
					$("#send_button").prop("disabled", true);
					$("#delete_button").prop("disabled", false);
				}
			});
		}
	});
	
	$("#delete_button").click(function() {
		if ($("#messages").html() != "") {
			$.ajax({
				type: "GET",
				url: "delete_all_messages.php"
			});
			$("#messages").html("");
			$("#delete_button").prop("disabled", true);
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
	
	$("#username_text").keyup(function() {
		if ($("#username_text").val().length < 8) {
			$("#delete_user_button").prop("disabled", true);
			$("#user_deletion_response").hide();
		} else {
			$("#delete_user_button").prop("disabled", false);
		}
    });
	
	$("#delete_user_button").click(function() {
		var dataString = "username=" + $("#username_text").val();
		$.ajax({
			type: "POST",
			url: "username_exists.php",
			data: dataString,
			success(response) {
				if (response == 0) {
					$("#user_deletion_response").show();
					$("#user_deletion_response").html("That user does not exist");
				} else {
					$.ajax({
						type: "POST",
						url: "delete_user.php",
						data: dataString,
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
});