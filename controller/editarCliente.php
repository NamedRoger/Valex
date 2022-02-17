<?php 
	
	session_start();
	require 'functions.php';
	$con = Conexion();

	$nombre = trim(mysqli_escape_string($con, $_POST['eNombre']));
	$telefono = trim(mysqli_escape_string($con, $_POST['eTelefono']));
	$precio = trim(mysqli_escape_string($con, $_POST['ePrecio']));
	$idCliente = trim(mysqli_escape_string($con, $_POST['idCliente']));

	if (!preg_match ('/^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑ]+$/', $nombre)) {		
		echo 1;
	}else{
		if (!preg_match ('/^[0-9]+$/', $telefono)) {
			echo 2;
		}else{
			if ($precio == 0) {
				echo 3;
			}else{
				$actualizar = $con->query("UPDATE clientes SET nombre = '$nombre', telefono = '$telefono', precio = '$precio' WHERE idCliente = '$idCliente'");
				if (!$actualizar) {
					printf("Error en ejecución contacte con soporte: %s\n", $con->error);
				}else{
					echo 4;
				}
			}
		}
	}