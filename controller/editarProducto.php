<?php
	
	namespace Verot\Upload;
	session_start();
	include('../vendor/autoload.php');
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
	$dir = '../assets/img/productos/'.$idProducto.'/';

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
								if (!file_exists($dir)) {
									 mkdir($dir, 0777);
								}
								if($_FILES['eFoto']['error'] != 4){
									$foto = new \Verot\Upload\Upload($_FILES['eFoto']);
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
										}else{
											echo 'chale';
										}
									}
								}else{
									$consulta = $con->query("SELECT foto FROM productos WHERE idProducto = '$idProducto'");
									$row = $consulta->fetch_array();
									$foto = $row['foto'];
								}

								$actualizar = $con->query("UPDATE productos SET foto = '$foto', codigo = '$codigo', nombre = '$nombre', descripcion = '$descripcion', compra = '$compra', venta = '$venta', medio = '$medio', mayoreo = '$mayoreo' WHERE idProducto = '$idProducto'");
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