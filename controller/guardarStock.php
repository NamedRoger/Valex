<?php
	
	session_start();
	require 'functions.php';
	$con = Conexion();

	$stock = trim(mysqli_escape_string($con, $_POST['stock']));
	$idStock = trim(mysqli_escape_string($con, $_POST['idStock']));

	if (empty($stock)) {
		echo 1;
	}else{
		if (!preg_match ('/^[0-9.]+$/', $stock)) {	
			echo 2;
		}else{
			$consulta = $con->query("SELECT idProducto FROM stock WHERE idStock = '$idStock'");
			$row = $consulta->fetch_array();
			$producto = $row['idProducto'];
			$consulta = $con->query("SELECT medida FROM productos WHERE idProducto = '$producto'");
			$row = $consulta->fetch_array();
			if ($row['medida'] == 1) {
				$stock = $stock * 1000;
			}
			$actualizar = $con->query("UPDATE stock SET stock = '$stock' WHERE idStock = '$idStock'");
			if (!$actualizar) {
				printf("Error en ejecución contacte con soporte: %s\n", $con->error);
			}else{
				echo 3;
			}
		}
	}