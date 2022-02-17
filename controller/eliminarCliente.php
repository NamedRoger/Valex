<?php  
	require 'functions.php';
	$con = Conexion();

	$idCliente = trim(mysqli_escape_string($con, $_POST['idCliente']));

	$eliminar = $con->query("DELETE FROM clientes WHERE idCliente = '$idCliente'");
	if(!$eliminar){
		printf("Error en ejecución contacte con soporte: %s\n", $con->error);
	}else{
		echo 1;
	}