<?php
	
	session_start();
	require 'functions.php';
	$con = Conexion();

	$nombre = trim(mysqli_escape_string($con, $_POST['eNombre']));
	$telefono = trim(mysqli_escape_string($con, $_POST['eTelefono']));
	$direccion = trim(mysqli_escape_string($con, $_POST['eDireccion']));
	$usuario = trim(mysqli_escape_string($con, $_POST['eUsuario']));
	$password = trim(mysqli_escape_string($con, $_POST['ePassword']));
	$rol = trim(mysqli_escape_string($con, $_POST['eRol']));
	$idSucursal = trim(mysqli_escape_string($con, $_POST['eIdSucursal']));
	$idUsuario = trim(mysqli_escape_string($con, $_POST['idUsuario']));

	if (empty($nombre)) {
		echo 1;
		exit;
	}else{
		if (!preg_match ('/^[a-zA-Z áéíóúÁÉÍÓÚñÑ]+$/', $nombre)) {
			echo 2;
			exit;
		}else{
			if (empty($telefono)) {
				echo 3;
				exit;
			}else{
				if (!preg_match ('/^[0-9]+$/', $telefono)) {
					echo 4;
				}else{
					if (empty($direccion)) {
						echo 5;
						exit;
					}else{
						if (!preg_match ('/^[a-zA-Z0-9.# áéíóúÁÉÍÓÚñÑ]+$/', $direccion)) {
							echo 6;
							exit;
						}else{
							if (empty($usuario)) {
								echo 7;
								exit;
							}else{
								if (!preg_match ('/^[a-zA-Z0-9 ñÑ]+$/', $usuario)) {
									echo 8;
								}else{
									if ($rol == 0) {
										echo 9;
										exit;
									}else{
										if ($idSucursal == 0) {
											echo 10;
											exit;
										}else{
											$consulta = $con->query("SELECT password FROM users WHERE idUsuario = '$idUsuario'");
											$row = $consulta->fetch_array();
											if ($password == '') {
												$password = $row['password'];
											}else{
												$password = sha1($password);
											}
											$actualizar = $con->query("UPDATE users SET nombre = '$nombre', telefono = '$telefono', direccion = '$direccion', usuario = '$usuario', password = '$password', rol = '$rol', idSucursal = '$idSucursal' WHERE idUsuario = '$idUsuario'");
											if(!$actualizar){
												printf("Error en ejecución contacte con soporte: %s\n", $con->error);
												exit;
											}else{
												$con->close();
												echo 11;
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