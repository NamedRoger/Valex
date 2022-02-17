<?php  
	require 'functions.php';
	$con = Conexion();

	$idUsuario = trim(mysqli_escape_string($con, $_POST['idUsuario']));

	$eliminar = $con->query("DELETE FROM users WHERE idUsuario = '$idUsuario'");
	if(!$eliminar){
		printf("Error en ejecución contacte con soporte: %s\n", $con->error);
	}else{
		echo 1;
	}
	