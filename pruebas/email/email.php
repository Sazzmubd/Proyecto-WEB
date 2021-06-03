<?php

if (!defined('INCLUDE_PATH')) {
    define('INCLUDE_PATH', './');
}
define('GMAIL_ACOUNT', '********@gmail.com');//      TENGO QUE CABIAR ********@gmail.com Y AHI TENGO QUE PONER UN
//$Correo
define('GMAIL_PASSWORD', '********');
//Importar las clases PHPMailer necesarias en el espacio global
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;
require INCLUDE_PATH . 'PHPMailer/Exception.php';
require INCLUDE_PATH . 'PHPMailer/PHPMailer.php';
require INCLUDE_PATH . 'PHPMailer/SMTP.php';
function EnviarCorreo($destino, $asunto, $mensaje)
{
    $mail = new PHPMailer();//creo un objeto mail
    $mail->isSMTP();
    //Habilitar mensajes de SMTP
    //SMTP::DEBUG_OFF = off (para uso en producción)
    //SMTP::DEBUG_CLIENT = mensajes del cliente
    //SMTP::DEBUG_SERVER = mensajes del cliente y del servidor
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                                //esto se comenta para el final
    //Servidor de correo
    $mail->Host = 'smtp.gmail.com';
    //Puerto – 25 para SMTP simple / 465 para SMTP sobre SSL / 587 para SMTP sobre TSL
    $mail->Port = 587;
    //Mecanismo de encriptado - STARTTLS o SMTPS
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    //Autentificación y opciones SMTP
    $mail->SMTPAuth = true;
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );
    //Usuario para la autentificación SMTP – usar la dirección completa para gmail
    $mail->Username = GMAIL_ACOUNT;
    //Contraseña para la autentificación SMTP
    $mail->Password = GMAIL_PASSWORD;
    //Remitente del correo – no tiene por que ser la cuenta usada en el servidor
    //pero puede dar problemas con filtros de spam
    $mail->setFrom('noreplay@gmail.com', 'Nombre Apellidos');// AQUI PONER NOREPLY de la empresa
    //Dirección de destino del mensaje
    $mail->addAddress($destino);
    //Poner el asunto del correo
    $mail->Subject = $asunto;
    //Poner el contenido del correo en formato HTML
    $mail->msgHTML($mensaje);

    if (!$mail->send()) { return 'Error PHPMailer: ' . $mail->ErrorInfo; } else {//aqui intento enviar el correo
        return true;
    }
}