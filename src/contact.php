<?php

    include "Message.php";

    $username = $_POST['username'];
    $message = $_POST['message'];
    $recaptchaResponse = $_POST['g-recaptcha-response'];

    if( !empty($recaptchaResponse) ) {
        $msg = new Message($username, $message);
        try {
            $msg->insert();
            header('Location: ../thank-you.html');
        } catch (\Throwable $exception) {
            header('Location: ../error.html');
        }
    } else {
        header('Location: ../error.html');
    }
    
?>
