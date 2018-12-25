$().ready(function() {
	
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
	
	$("#contents").on("cut paste", function(e) {
		setTimeout(function() {
			if ($("#contents").val() == "") { 
				$("#send_button").prop("disabled", true);
			} else {
				$("#send_button").prop("disabled", false);
			}
		}, 0);
	});

	$("#contents").keyup(function() {
		if ($("#contents").val() != "") {
			$("#send_button").prop("disabled", false);
		} else {
			$("#send_button").prop("disabled", true);
		}
	});

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

	$("#administration_button").click(function() {
		window.location="administration.html";
	});
});