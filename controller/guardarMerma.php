<?php
	
	session_start();
	require 'functions.php';
	$con = Conexion();

	$merma = trim(mysqli_escape_string($con, $_POST['merma']));
	$idStock = trim(mysqli_escape_string($con, $_POST['idStock']));
	$comentario = trim(mysqli_escape_string($con, $_POST['comentario']));

	if (empty($merma)) {
		echo 1;
	}else{
		if (!preg_match ('/^[0-9.]+$/', $merma)) {	
			echo 2;
		}else{
			$consulta = $con->query("SELECT stock, idProducto FROM stock WHERE idStock = '$idStock'");
			$row = $consulta->fetch_array();
			$producto = $row['idProducto'];
			$existencia = $row['stock'];
			$consulta = $con->query("SELECT medida FROM productos WHERE idProducto = '$producto'");
			$row = $consulta->fetch_array();
			$total = $existencia - $merma;
			$actualizar = $con->query("UPDATE stock SET stock = '$total', comentario = '$comentario' WHERE idStock = '$idStock'");
			if (!$actualizar) {
				printf("Error en ejecución contacte con soporte: %s\n", $con->error);
			}else{
				echo 3;
			}
		}
	}