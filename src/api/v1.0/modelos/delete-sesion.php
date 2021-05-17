<?php
session_start();
unset($_SESSION['rol']);//es para eleminar variables
session_destroy();
http_reponse_code(200);
