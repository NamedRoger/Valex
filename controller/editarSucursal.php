<?php 
	
	session_start();
	require 'functions.php';
	$con = Conexion();

	$sucursal = trim(mysqli_escape_string($con, $_POST['eSucursal']));
	$direccion = trim(mysqli_escape_string($con, $_POST['eDireccion']));
	$telefono = trim(mysqli_escape_string($con, $_POST['eTelefono']));
	$idSucursal = trim(mysqli_escape_string($con, $_POST['idSucursal']));

	if (empty($sucursal)) {
		echo 1;
	}else{
		if (!preg_match ('/^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑ]+$/', $sucursal)) {
			echo 2;
		}else{
			if (empty($direccion)) {
				echo 3;
			}else{
				if (!preg_match ('/^[a-zA-Z0-9.# áéíóúÁÉÍÓÚñÑ]+$/', $direccion)) {
					echo 4;
				}else{
					if (empty($telefono)) {
						echo 5;
					}else{
						if (!preg_match ('/^[0-9]+$/', $telefono)) {
							echo 6;
						}else{
							$actualizar = $con->query("UPDATE sucursales SET sucursal = '$sucursal', direccionSuc = '$direccion', telefonoSuc = '$telefono' WHERE idSucursal = '$idSucursal'");
							if(!$actualizar){
			                   printf("Error en ejecución contacte con soporte: %s\n", $con->error);
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