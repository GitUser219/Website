$().ready(function() {
	
	$.ajax({
		type: "GET",
		url: "get_messages.php",
		success: function(messages) {
			if (messages.length > 0) {
				messages = messages.substr(1).split("/");
				html_insert = "";
				for (i = 0; i < messages.length; i++) {
					html_insert += "<div class='row'><div class='col-md-2'></div><div class='col-md-8 light message'><p>" + messages[i] + "</p><div class='col-md-2'></div></div></div>";
				}
				$("#messages").html(html_insert);
			}
		}
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
			
			var dataString ="contents=" + $("#contents").val();
			$.ajax({
				type: "POST",
				url: "send_message.php",
				data: dataString,
				success: function() {
					$("#contents").val("");
					$("#send_button").prop("disabled", true);
				}
			});
		}
	});
	
	$("#delete_button").click(function() {
		$.ajax({
			type: "GET",
			url: "delete_all_messages.php"
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
});