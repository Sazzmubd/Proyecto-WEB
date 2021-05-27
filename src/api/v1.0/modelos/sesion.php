<?php



// lo de mantener sesion iniciada



//session_set_cookie_params(30);
session_start([
    'cookie_lifetime' => 30,
]);

if(!isset($_SESSION['count'])){
    $_SESSION['count'] = 0;
}
$_SESSION['count']++;


