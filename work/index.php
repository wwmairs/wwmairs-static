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
    <div id="sidebar-wrapper">
        <a id="home" href='../index.html'>WWM</a>
        <a id="back" href="../what.html">BACK</a>
    </div>
    <div id="options">
        <ul>
            <li>
                <a href="?category=machines">by machine</a>
            </li>
            <li>
                <a href="?category=hands">by hand</a>
            </li>
            <li>
                <a href="?">all</a>
            </li>
        </ul>
    </div>
    <div class='content'>
    <div id='entries'>
    <?php
    $cat = $_GET['category'];
    $search_id = $_GET['id'];
	$config = parse_ini_file('/home/wm/config.ini');
	$mysqli = new mysqli($config['servername'], $config['username'],
			     $config['password'], $config['dbname']);
    if ($cat != null) {
        if (!($stmt = $mysqli->prepare("SELECT * FROM portfolio WHERE category = ?")))
            echo "prepare failed: (" . $mysqli->errno . ")" . $mysqli->error;
        if (!$stmt->bind_param("s", $cat))
            echo "binding pars failed: (" .$stmt->errno . ") " .$stmt->error;
        if (!$stmt->execute())
            echo "execute failed: (" . $mysqli->errno . ")" . $mysqli->error;
        
    } else if ($search_id != null) {
        if (!($stmt = $mysqli->prepare("SELECT * FROM portfolio WHERE id = ?")))
            echo "prepare failed: (" . $mysqli->errno . ")" . $mysqli->error;
        if (!$stmt->bind_param("i", $search_id))
            echo "binding pars failed: (" .$stmt->errno . ") " .$stmt->error;
        if (!$stmt->execute())
            echo "execute failed: (" . $mysqli->errno . ")" . $mysqli->error;
    } else {
        if (!($stmt = $mysqli->prepare("SELECT * FROM portfolio")))
            echo "prepare failed: (" . $mysqli->errno . ")" . $mysqli->error;
        if (!$stmt->execute())
            echo "execute failed: (" . $mysqli->errno . ")" . $mysqli->error;
    }
    $out_id       = NULL;
    $out_title    = NULL;
    $out_body     = NULL;
    $out_category = NULL;
    $out_url      = NULL;
    $out_blurb    = NULL;
    if (!$stmt->bind_result($out_id, $out_title, $out_body, $out_category, $out_url, $out_blurb))
        echo "binding output pars failed: (" . $stmt->errno . ") " . $stmt->error;
    while ($stmt->fetch()) {
        echo "<a href='?id=" . $out_id . "'>";
        echo "<div class='entry'>";
        echo "<h2>" . $out_title . "</h2>";
        if ($out_category == "machines") 
            echo "<iframe src='" . $out_url . "' height='100%'></iframe>";
        else
            echo "<img src='" . $out_url ."'>";
        echo "<p>" . $out_body . "</p>";
        echo "</div>";
        echo "</a>";
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
                <li><a href="../contact.html">contact</a></li>
                <li><a href="https://github.com/wwmairs">github</a></li>
            </ul>
            <p id='version'>
            </p>
        </div>
    </div>
</div>
</body>
<script>
$('.entries').css('min-height', $(document).height());
</script>
</html>
