<!DOCTYPE>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Portfolio</title>
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
    :root{--page-color: #CC5B51}
    </style>
    <link href="portfolio.css?v=2.1.2" rel="stylesheet"/>
</head>

<body>
<div class="container-fluid">
    <div id="sidebar-wrapper">
        <a id="home" href='../index.html'>WWM</a>
        <a id="back" href="../what.html">BACK</a>
    </div>
    <div class='content'>
    <div id='entries'>
    <?php
	$config = parse_ini_file('/home/wm/config.ini');
	$mysqli = new mysqli($config['servername'], $config['username'],
			     $config['password'], $config['dbname']);
        $result = $mysqli->query("SELECT * FROM portfolio");
	#var_dump($result->fetch_all());
	while($entry = mysqli_fetch_assoc($result)) {
		echo "<div class='entry'>";
		echo "<h2>" . $entry["title"] . "</h2>";
		if ($entry["category"] == "web") {
			echo "<iframe src='" . $entry["url"] . "'></iframe>";
		} else if ($entry["category"] == "books") {
			echo "<img src='" . $entry["url"] . "'>";
		}
		echo "<p>" . $entry["body"] . "</p>";
		echo "</div>";
	}
	
    ?>
    </div>
    </div>

</div>
<div id='footer' class='container-fluid'>
    <div class='row'>
        <div class='col-md-4 col-sm-4 col-xs-4'>
            <p id='logo'>WWM
            </p>
            <p>WWMairs &copy; 2017
        </div>
        <div class='col-md-8 col-sm-8 col-xs-8'>
            <p>
            </p>
            <ul id='contact-links'>
                <li><a href="https://www.google.com/maps/@42.4023285,-71.1233033,3a,75y,244.36h,98.87t/data=!3m6!1e1!3m4!1sTHjr4PigkIQWlbNtmPRtJQ!2e0!7i13312!8i6656">maps</a></li>
                <li><a href="contact.html">contact</a></li>
                <li><a href="https://github.com/wwmairs">github</a></li>
            </ul>
            <p id='version'>
            </p>
        </div>
    </div>
</div>
</body>
<script>
$('.content').css('min-height', $(document).height());
</script>
</html>
