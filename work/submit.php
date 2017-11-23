<!DOCTYPE>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>WORK</title>
    <link rel="icon" type="img/png" href="../glasses.png">
    <!-- Roboto google font -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:100" rel="stylesheet">
    <!-- vulf fonts -->
    <link href="../vulfface/font.css" rel="stylesheet">
    <!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- jQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <style>
    :root{--page-color: #D78416}
    </style>
    <link href="portfolio.css?v=2.1.2" rel="stylesheet"/>
</head>

<body>
<div class="container-fluid">
    <?php
	$config = parse_ini_file('/home/wm/config.ini');
	$mysqli = new mysqli($config['servername'], $config['username'],
        $config['password'], $config['dbname']);
    if (!empty($_POST)) {
        if (!($stmt = $mysqli->prepare("INSERT INTO portfolio (title, body, category, url, blurb) VALUES (?, ?, ?, ?, ?)")))
            echo "prepare failed: (" . $mysqli->errno .") ". $mysqli->error;
        if (!$stmt->bind_param("sssss", $_POST["title"], $_POST["body"], $_POST["category"], $_POST["url"], $_POST["blurb"]))
            echo "binding pars failed: (" . $stmt->errno . ") " . $stmt->error;
        if (!$stmt->execute())
            echo "execute failed: (" .$stmt->errno .")" . $stmt->error;
            header("Location: http://wwmairs.com:82/work");
    } else {
        echo "this can't be right";
    }
    ?>
</div>
</body>
</html>
