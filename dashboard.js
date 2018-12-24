$().ready(function() {
	
	// Sends a GET request to get_role.php
	// Shows the administration button for administrators
	
	$.ajax({
		type: "GET",
		url: "get_role.php",
		success: function(response) {
			if (response == 1) {
				$("#administration_button").show();
			} else {
				$("#administration_button").hide();
			}
		}
	});
	
	// Sends a GET request to get_messages.php
	// Populates the messages container
	
	$.ajax({
		type: "GET",
		url: "get_messages.php",
		success: function(response) {
			if (response.length > 0) {
				$("#messages").html(response);
			} else {
				$("#delete_all_messages_button").prop("disabled", true);
			}
		}
	});
	
	// Enables the send button when user pastes test into the contents input box
	
	$("#contents").on("paste", function(e) {
		if (e.originalEvent.clipboardData.getData('text') != "") {
			$("#send_button").prop("disabled", false);
		}
	});
	
	// Disables the send button when user cuts all text from the contents input box
	
	$("#contents").on("cut", function() {
		setTimeout(function() {
			if ($("#contents").val() == "") { 
				$("#send_button").prop("disabled", true);
			}
		}, 0);
	});
	
	// Enables the send button when the user types in the contents input box
	// Disables the send button when the user deletes the text in the contents input box
	
	$("#contents").keyup(function() {
		if ($("#contents").val() != "") {
			$("#send_button").prop("disabled", false);
		} else {
			$("#send_button").prop("disabled", true);
		}
	});
	
	// Sends POST request to send_message.php
	// Sends the text from the contents input box
	
	$("#send_button").click(function() {
		if ($("#contents").val() != "") {
			$.ajax({
				type: "POST",
				url: "send_message.php",
				data: "contents=" + $("#contents").val(),
				success: function(response) {
					$("#messages").html($("#messages").html() + "<div class='row'><div class='col-md-2'></div><div class='col-md-8 light message'><p>" + response + ": " + $("#contents").val() + "</p><div class='col-md-2'></div></div></div>");
					$("#contents").val("");
					$("#send_button").prop("disabled", true);
					$("#delete_all_messages_button").prop("disabled", false);
				}
			});
		}
	});
	
	// Sends GET request to delete_all_messages.php
	// Executes on "Delete all messages" button click
	
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
	
	// Sends GET request to logout.php
	// Terminates the session and sends the user to the index page
	
	$("#logout_button").click(function() {
		$.ajax({
			type: "GET",
			url: "logout.php",
			success: function() {
				window.location="index.html";
			}
		});
	});
	
	// Only visible to administrators
	// Sends the user to the adminstration page
	
	$("#administration_button").click(function() {
		window.location="administration.html";
	});
});