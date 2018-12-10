$().ready(function() {

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
				url: "get_user_id.php",
				success: function(user_id) {
					var dataString = "user_id=" + user_id + "&contents=" + $("#contents").val();
					$.ajax({
						type: "POST",
						url: "send_message.php",
						data: dataString,
						success: function() {
							$("#message").html($("#contents").val());
							$("#contents").val("");
							$("#send_button").prop("disabled", true);
						}
					});
				}
			});
		}
	});
	
	$("#delete_button").click(function() {
		alert("You clicked the delete all messages button");
	});
	
	$("#logout_button").click(function() {
		$.ajax({
			type: "POST",
			url: "logout.php",
			success: function() {
				window.location="index.html";
			}
		});
	});
});