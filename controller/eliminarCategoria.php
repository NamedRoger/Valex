<?php  
	require 'functions.php';
	$con = Conexion();

	$idCategoria = trim(mysqli_escape_string($con, $_POST['idCategoria']));

	$eliminar = $con->query("DELETE FROM categorias WHERE idCategoria = '$idCategoria'");
	if(!$eliminar){
		printf("Error en ejecución contacte con soporte: %s\n", $con->error);
	}else{
		echo 1;
	}