<?php
    require_once 'vendor/autoload.php';
    $dest = "wwmairs@gmail.com";
    $name = $_GET['name'];
    $email = $_GET['email'];
    $body = $_GET['message'];
    $result = False;
    $message = wordwrap($message, 70, "\r\n");
    $config = parse_ini_file('/home/wm/config.ini');
    $transporter = (new Swift_SmtpTransport('smtp.gmail.com', 465, 'ssl'))
        ->setUsername($config['gmail_username'])
        ->setPassword($config['gmail_password'])
        ;
    $mailer = new Swift_Mailer($transporter);
    $message = (new Swift_Message($name . ' is trying to contact you'))
        ->setFrom([$dest => 'Will'])
        ->setTo([$dest => 'Will'])
        ->setBody($body . "\n reply to: ". $email)
        ;
    $result = $mailer->send($message);
    if ($result) {
        header("Location: http://w.wwmairs.com/contact.html?sent=true");
    }
    else {
        header("Location: http://w.wwmairs.com/contact.html?sent=false");
    }
    
?>
