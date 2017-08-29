<?php
    $dest = "contact@wwmairs.com"
    $name = $_GET['name'];
    $email = $_GET['email'];
    $message = $_GET['message'];
    $message = wordwrap($message, 70, "\r\n");
    echo "<h1>" . $message . "</h1>";
    echo mail($dest, "from: " . $email, $message);
?>