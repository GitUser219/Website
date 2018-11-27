function validate()
{
	var alphanumeric = /^[0-9a-zA-z]+$/;
	var username = document.forms["loginForm"]["username"].value;
	var password = document.forms["loginForm"]["password"].value;

	if (username.length == 0 || password.length == 0)
	{
		alert("Both fields are required.");
		return false;
	}
	else if (username.length < 8 || username.length > 20 || password.length < 8 || password.length > 20)
	{
		alert("Your username and password must be between 8 and 20 characters long.");
		return false;
	}
	else if (!username.match(alphanumeric) || !password.match(alphanumeric))
	{
		alert("Your username and password may only contain letters and numbers.");
		return false;
	}
	else
	{
		return true;
	}
}

