<?php  
	require 'functions.php';
	$con = Conexion();

	$idSucursal = trim(mysqli_escape_string($con, $_POST['idSucursal']));

	$eliminar = $con->query("DELETE FROM sucursales WHERE idSucursal = '$idSucursal'");
	if($eliminar){
		echo 1;
	}else{
		printf("Error en ejecución contacte con soporte: %s\n", $con->error);
	}
	