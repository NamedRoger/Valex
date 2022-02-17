<?php 
	
	session_start();
	require 'functions.php';
	$con = Conexion();

	$nombre = trim(mysqli_escape_string($con, $_POST['nombre']));
	$telefono = trim(mysqli_escape_string($con, $_POST['telefono']));
	$precio = trim(mysqli_escape_string($con, $_POST['precio']));

	if (!preg_match ('/^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑ]+$/', $nombre)) {		
		echo 1;
	}else{
		if (!preg_match ('/^[0-9]+$/', $telefono)) {
			echo 2;
		}else{
			if ($precio == 0) {
				echo 3;
			}else{
				$insertar = $con->query("INSERT INTO clientes (nombre, telefono, precio) VALUES ('$nombre', '$telefono', '$precio')");
				if (!$insertar) {
					printf("Error en ejecución contacte con soporte: %s\n", $con->error);
				}else{
					echo 4;
				}
			}
		}
	}