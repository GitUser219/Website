<?php

try {
	$connection = new PDO("mysql:host=db;dbname=website_db", "root", "test");
	$connection_message = "Connected to database successfully";
}
catch(Exception $e)
{
	$connection_message = "Database connection failed: " . $e -> getMessage();
}

try {
	$statement = "SELECT username FROM Users";
	$prepared_statement = $connection -> prepare($statement);
	$prepared_statement -> execute();
	
	while ($row = $prepared_statement -> fetch(PDO::FETCH_ASSOC))
	{
		$query_result =  $row['username'];
	}

	$query_message = "Successfully ran query: " . $statement . "<br>Results from query: " . $query_result;
}
catch(Exception $e)
{
	$query_message = "Query failed: " . $e -> getMessage();
}

$connection -> null;

?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<title>Website Title</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
		<script src="functions.js"></script>
		<link rel="stylesheet" href="styling.css">
		<link rel="shortcut icon" href="image.ico">
	</head>
	<body>
		<div class="container">
			<div class="row test">
				<div class="col text-center">
					<div class="login-modal">
						<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#loginModal">Login</button>
						<div class="modal fade" id="loginModal" role="dialog">
							<div class="modal-dialog">
								<div class="modal-content">	
									<form name="loginForm" onsubmit="return validate()" action="login.php" method="post">
										<div class="modal-header">
											<button type="button" class="close" data-dismiss="modal">&times;</button>
											<h4 class="modal-title text-left">Login</h4>
										</div>
										<div class="modal-body text-left">
											<div class="form-group">
												<label for="inputUsername">Username</label>
												<input type="username" class="form-control" name="username" placeholder="Enter username">
											</div>
											<div class="form-group">
												<label for="inputPassword">Password</label>
												<input type="password" class="form-control" name="password" placeholder="Enter password">
											</div>
										</div>
										<div class="modal-footer">
											<button type="submit" class="btn btn-success">Submit</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col text-center">
					<?php echo $connection_message ?>
				</div>
			</div>
			<div class="row">
				<div class="col text-center">
					<?php echo $query_message ?>
				</div>
			</div>
		</div>
	</body>
</html>
