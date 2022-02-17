<?php  
	require 'functions.php';
	$con = Conexion();

	$idProducto = trim(mysqli_escape_string($con, $_POST['idProducto']));

	$eliminar = $con->query("DELETE FROM stock WHERE idProducto = '$idProducto'");
	if(!$eliminar){
		echo 1;
	}else{
		$eliminar = $con->query("DELETE FROM productos WHERE idProducto = '$idProducto'");
		if(!$eliminar){
			printf("Error en ejecución contacte con soporte: %s\n", $con->error);
		}else{
			echo 1;
		}
	}