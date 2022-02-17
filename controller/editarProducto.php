<?php
	
	session_start();
	require 'functions.php';
	$con = Conexion();

	$codigo = trim(mysqli_escape_string($con, $_POST['eCodigo']));
	$nombre = trim(mysqli_escape_string($con, $_POST['eNombre']));
	$descripcion = trim(mysqli_escape_string($con, $_POST['eDescripcion']));
	$compra = trim(mysqli_escape_string($con, $_POST['eCompra']));
	$venta = trim(mysqli_escape_string($con, $_POST['eVenta']));
	$medio = trim(mysqli_escape_string($con, $_POST['eMedio']));
	$mayoreo = trim(mysqli_escape_string($con, $_POST['eMayoreo']));
	$idProducto = trim(mysqli_escape_string($con, $_POST['idProducto']));

	if (!preg_match ('/^[0-9]+$/', $codigo)) {
		echo 1;
	}else{
		if (!preg_match ('/^[a-zA-Z0-9.# áéíóúÁÉÍÓÚñÑ]+$/', $nombre)) {
			echo 2;
		}else{
			if (!preg_match ('/^[a-zA-Z0-9.# áéíóúÁÉÍÓÚñÑ]+$/', $descripcion)) {
				echo 3;
			}else{
				if (!preg_match ('/^[0-9.]+$/', $compra)) {
					echo 4;
				}else{
					if (!preg_match ('/^[0-9.]+$/', $venta)) {
						echo 5;
					}else{
						if (!preg_match ('/^[0-9.]+$/', $medio)) {
							echo 6;
						}else{
							if (!preg_match ('/^[0-9.]+$/', $mayoreo)) {
								echo 7;
							}else{
								$actualizar = $con->query("UPDATE productos SET codigo = '$codigo', nombre = '$nombre', descripcion = '$descripcion', compra = '$compra', venta = '$venta', medio = '$medio', mayoreo = '$mayoreo' WHERE idProducto = '$idProducto'");
								if (!$actualizar) {
									printf("Error en ejecución contacte con soporte: %s\n", $con->error);
								}else{
									echo 8;
								}
							}
						}
					}
				}
			}
		}
	}