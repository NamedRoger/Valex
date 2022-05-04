<?php
	
	namespace Verot\Upload;
	session_start();
	include('../vendor/autoload.php');
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
	$dir = '../assets/img/productos/'.$idProducto.'/';

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
											if (!file_exists($dir)) {
											    mkdir($dir, 0777);
											}
											if (isset($_FILES['foto'])) {
												$foto = new \Verot\Upload\Upload($_FILES['foto']);
												if ($foto->uploaded) {
													$foto->file_new_name_body = $idProducto;
													$foto->file_new_name_ext = 'jpeg';
													$foto->image_resize = true;
													$foto->image_x = $foto->image_src_x/2;
													$foto->image_ratio_y = true;
													$foto->jpeg_quality = 100;
													$foto->file_overwrite = true;
													$foto->process($dir);
													if ($foto->processed) {
														$foto->clean();
													    $foto = $dir.$foto->file_new_name_body = $idProducto.'.jpeg';
													}
												}
											}else{
												$foto = '';
											}
											
											$consulta = $con->query("SELECT idSucursal FROM sucursales");
											while ($row = $consulta->fetch_array()) {
												$idSucursal = $row['idSucursal'];
												$insertar = $con->query("INSERT INTO stock (idSucursal, idProducto) VALUES ('$idSucursal' , '$idProducto')");
											}

											$insertar = $con->query("INSERT INTO productos (foto, codigo, idProducto, idCategoria, medida, nombre, descripcion, compra, venta, medio, mayoreo) VALUES ('$foto', '$codigo', '$idProducto', '$idCategoria', '$medida', '$nombre', '$descripcion', '$compra', '$venta', '$medio', '$mayoreo' )");
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
