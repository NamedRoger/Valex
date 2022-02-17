<?php
	
	require 'functions.php';
	$con = Conexion();

	$nombre = trim(mysqli_escape_string($con, $_POST['nombre']));
	$telefono = trim(mysqli_escape_string($con, $_POST['telefono']));
	$direccion = trim(mysqli_escape_string($con, $_POST['direccion']));
	$usuario = trim(mysqli_escape_string($con, $_POST['usuario']));
	$password = sha1(trim(mysqli_escape_string($con, $_POST['password'])));
	$rol = trim(mysqli_escape_string($con, $_POST['rol']));
	$idSucursal = trim(mysqli_escape_string($con, $_POST['idSucursal']));
	$genero = trim(mysqli_escape_string($con, $_POST['genero']));

	$consulta = $con->query("SELECT idSucursal FROM sucursales");
	$num_row = $consulta->num_rows;
	if ($num_row == 0) {
		echo 100;
	}else{
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
										if (empty($password)) {
											echo 9;
											exit;
										}else{
											if (!preg_match ('/^[a-zA-Z0-9 ñÑ]+$/', $password)) {
												echo 10;
												exit;
											}else{
												if ($rol == 0) {
													echo 11;
													exit;
												}else{
													if ($idSucursal == 0) {
														echo 12;
														exit;
													}else{
														if ($genero == 0) {
															echo 13;
														}else{
															$insertar = $con->query("INSERT INTO users (genero, nombre, telefono, direccion, usuario, password,rol, idSucursal) VALUES ('$genero', '$nombre', '$telefono', '$direccion', '$usuario', '$password', '$rol', '$idSucursal')");
															if(!$insertar){
																printf("Error en ejecución contacte con soporte: %s\n", $con->error);
																exit;
															}else{
																$con->close();
																echo 14;
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
				}
			}
		}
	}

	