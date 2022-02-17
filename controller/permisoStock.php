<?php 
	
	session_start();
	require 'functions.php';
	$con = Conexion();

	$idUsuario = trim(mysqli_escape_string($con, $_POST['idUsuario']));
	$permiso = trim(mysqli_escape_string($con, $_POST['permiso']));

	if ($permiso == 1) {
		$permiso = 0;
	}else{
		$permiso = 1;
	}

	$actualizar = $con->query("UPDATE users SET permiso = '$permiso' WHERE idUsuario = '$idUsuario'");
	if (!$actualizar) {
		printf("Error en ejecución contacte con soporte: %s\n", $con->error);
	}else{
		if ($permiso == 0) {
			echo 1;
		}else{
			echo 2;
		}
	}