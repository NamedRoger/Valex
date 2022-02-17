<?php
	
	session_start();
	require 'functions.php';
	$con = Conexion();

	$codigo = trim(mysqli_escape_string($con, $_POST['codigo']));
	$idCategoria = trim(mysqli_escape_string($con, $_POST['idCategoria']));
	$medida = trim(mysqli_escape_string($con, $_POST['medida']));
	$nombre = trim(mysqli_escape_string($con, $_POST['nombre']));
	$descripcion = trim(mysqli_escape_string($con, $_POST['descripcion']));
	$compra = trim(mysqli_escape_string($con, $_POST['compra']));
	$venta = trim(mysqli_escape_string($con, $_POST['venta']));
	$medio = trim(mysqli_escape_string($con, $_POST['medio']));
	$mayoreo = trim(mysqli_escape_string($con, $_POST['mayoreo']));
	$idProducto = rand(10000, 99999); 

	$consulta = $con->query("SELECT idSucursal FROM sucursales");
	$num_row = $consulta->num_rows;
	if ($num_row == 0) {
		echo 100;
	}else{
		if ($idCategoria == 0) {
			echo 2;
		}else{
			if ($medida == 0) {
				echo 3;
			}else{
				if (!preg_match ('/^[a-zA-Z0-9.# áéíóúÁÉÍÓÚñÑ]+$/', $nombre)) {
					echo 4;
				}else{
					if (!preg_match ('/^[a-zA-Z0-9.# áéíóúÁÉÍÓÚñÑ]+$/', $descripcion)) {
						echo 5;
					}else{
						if (!preg_match ('/^[0-9.]+$/', $compra)) {
							echo 6;
						}else{
							if (!preg_match ('/^[0-9.]+$/', $venta)) {
								echo 7;
							}else{
								if (!preg_match ('/^[0-9.]+$/', $medio)) {
									echo 8;
								}else{
									if (!preg_match ('/^[0-9.]+$/', $mayoreo)) {
										echo 9;
									}else{
										$consulta = $con->query("SELECT nombre FROM productos WHERE nombre = '$nombre'");
										$num_row = $consulta->num_rows;
										if ($num_row > 0) {
											echo 1;
										}else{
											$consulta = $con->query("SELECT idSucursal FROM sucursales");
											while ($row = $consulta->fetch_array()) {
												$idSucursal = $row['idSucursal'];
												$insertar = $con->query("INSERT INTO stock (idSucursal, idProducto) VALUES ('$idSucursal' , '$idProducto')");
											}

											$insertar = $con->query("INSERT INTO productos (codigo, idProducto, idCategoria, medida, nombre, descripcion, compra, venta, medio, mayoreo) VALUES ('$codigo', '$idProducto', '$idCategoria', '$medida', '$nombre', '$descripcion', '$compra', '$venta', '$medio', '$mayoreo' )");
											if (!$insertar) {
												printf("Error en ejecución contacte con soporte: %s\n", $con->error);
											}else{
												echo 10;
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}

	
	
	
