<?php
    $dest = "contact@wwmairs.com";
    $name = $_GET['name'];
    $email = $_GET['email'];
    $message = $_GET['message'];
    $success = TRUE;
    $message = wordwrap($message, 70, "\r\n");
    echo "<h1>" . $message . "</h1>";
    $success = mail($dest, "from: " . $email, $message);
    echo "<h2" . $success . "</h2>";
?>