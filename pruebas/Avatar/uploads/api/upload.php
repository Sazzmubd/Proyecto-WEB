<?php

$nombre = $_POST['nombre'];//LA INFORMACION Q ME VIENE DE OTROS CAMPOS , COMMO ME VIENE ENVIARDA POR POST la recupero
$file = $_FILES['pic']['tmp_name'];//cuando se envian datos vienarios osea la foto se llama a FILES

$propiedades = getimagesize($file);//aqui obtengo la informacion de la imagen la anchura y altura
$fileNewName = uniqid('a_');//aqui renombro el archivo y genera el nombre para que no este repetida 947t8937.jpg
$folderPath = "../avatar/";//aqui pongo la ruta donde se tiene q guardar la imgaen
$imageType = $propiedades[2];

$avatarName = '';

switch ($imageType) {
	case IMAGETYPE_PNG:
		$imagenOriginal = imagecreatefrompng($file);
		$tmp = imageResize($imagenOriginal, $propiedades[0], $propiedades[1]);
		$avatarName = $fileNewName . ".png";
		imagepng($tmp, $folderPath . $avatarName);
		break;
	case IMAGETYPE_GIF:
		$imagenOriginal = imagecreatefromgif($file);
		$tmp = imageResize($imagenOriginal, $propiedades[0], $propiedades[1]);
		$avatarName = $fileNewName . ".gif";
		imagegif($tmp, $folderPath . $avatarName);
		break;
	case IMAGETYPE_JPEG:
		$imagenOriginal = imagecreatefromjpeg($file);
		$tmp = imageResize($imagenOriginal, $propiedades[0], $propiedades[1]);
		$avatarName = $fileNewName . ".jpg";
		imagejpeg($tmp, $folderPath . $avatarName);
		break;
	default:
		http_response_code(400);
		die('{"error":"Tipo no válido de imagen"}');
}

function imageResize($original, $width, $height)
{
	$targetWidth = 100;
	$targetHeight = 100;
	$src_x = 0;
	$src_y = 0;
	$salida = imagecreatetruecolor($targetWidth, $targetHeight);


	// formato apaisado
	if ($width > $height) {
		$src_x = ($width - $height) / 2;
		$width = $height;
	}
	// formato vertical
	if ($width < $height) {
		// presuponemos que la parte significativa de la imagen está arriba
		//$src_y = ($height - $width) / 2;
		$height = $width;
	}

	imagecopyresampled($salida, $original, 0, 0, $src_x, $src_y, $targetWidth, $targetHeight, $width, $height);
	return $salida;
}


$data = [
	'nombre' => $_POST['nombre'],
	'avatar' => $avatarName
];
echo json_encode($data);