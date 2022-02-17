<?php 
	
	session_start();
	require 'functions.php';
	$con = Conexion();

	$sucursal = trim(mysqli_escape_string($con, $_POST['sucursal']));
	$direccion = trim(mysqli_escape_string($con, $_POST['direccion']));
	$telefono = trim(mysqli_escape_string($con, $_POST['telefono']));
	$idSucursal = rand(10001, 99999); 

	if (empty($sucursal)) {
		echo 1;
		exit;
	}else{
		if (!preg_match ('/^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑ]+$/', $sucursal)) {
			echo 2;
			exit;
		}else{
			if (empty($direccion)) {
				echo 3;
				exit;
			}else{
				if (!preg_match ('/^[a-zA-Z0-9.# áéíóúÁÉÍÓÚñÑ]+$/', $direccion)) {
					echo 4;
					exit;
				}else{
					if (empty($telefono)) {
						echo 5;
						exit;
					}else{
						if (!preg_match ('/^[0-9]+$/', $telefono)) {
							echo 6;
							exit;
						}else{
							$consulta = $con->query("SELECT idSucursal FROM sucursales WHERE idSucursal = 10000");
							$num_row = $consulta->num_rows;
							if ($num_row == 1) {
								$consulta = $con->query("SELECT idProducto FROM stock WHERE idSucursal = 10000");
								while ($row = $consulta->fetch_array()) {
									$idProducto = $row['idProducto'];
									$insertar = $con->query("INSERT INTO stock (idSucursal, idProducto) VALUES ('$idSucursal' , '$idProducto')");
								}
								$insertar = $con->query("INSERT INTO sucursales(idSucursal, sucursal, direccionSuc, telefonoSuc) VALUES ('$idSucursal', '$sucursal', '$direccion', '$telefono')");
								if (!$insertar) {
									printf("Error en ejecución contacte con soporte: %s\n", $con->error);
								}else{
									$con->close();
			               			echo 7;
								}
							}else{
								$insertar = $con->query("INSERT INTO sucursales(idSucursal, sucursal, direccionSuc, telefonoSuc) VALUES (10000, '$sucursal', '$direccion', '$telefono')");
								if(!$insertar){
				                   
				                   exit;
				               }else{
				               	$con->close();
				               	echo 7;
				               }
							}
						}
					}
				}
			}
		}
	}