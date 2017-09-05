<?php
    $dest = "wwmairs@gmail.com";
    $name = $_GET['name'];
    $email = $_GET['email'];
    $message = $_GET['message'];
    $success = False;
    $message = wordwrap($message, 70, "\r\n");
    echo "<h1>" . $message . "</h1>";
    $success = mail($dest, "from: " . $email, $message);
    if ($success) {
        echo "<h2> success </h2>";
    }
    else {
        echo "<h2> not success </h2>";
    }
    
?>
