function Login() {

	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		   document.getElementById("test_id").innerHTML = request.responseText;
		}
	};
	request.open("GET", "test.php", true);
	request.send();
}