<?php

class ControladorPlantilla
{
	static public function ctrPlantilla()
	{
		include "views/template.php";
	}
}



function Conexion()
{
	$servername = "localhost";
	$database = "valex";
	$username = "root";
	$password = "";
	// Create connection
	$con = mysqli_connect($servername, $username, $password, $database);
	// Check connection
	if (!$con) {
		die("Connection failed: " . mysqli_connect_error());
	}
	if (!$con->set_charset("utf8")) {
		printf("Error al cargar el conjunto de caracteres utf8: %s\n", $con->error);
		exit();
	}

	return $con;
}
