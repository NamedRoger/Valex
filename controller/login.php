<?php 
	session_start();
	require 'functions.php';
	$con = Conexion();

	$usuario = trim(mysqli_escape_string($con, $_POST['usuario']));
	$password = sha1(trim(mysqli_escape_string($con, $_POST['password'])));

	$response = [

	];

	if (empty($usuario)) {
		$response["success"] = 1;
	}else{
		if (empty($password)) {
			$response["success"] = 2;
		}else{
			if (!preg_match ('/^[a-zA-Z0-9 ñÑ]+$/', $usuario)) {
				$response["success"] = 3;
			}else{
				if (!preg_match ('/^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑ]+$/', $password)) {
					$response["success"] = 4;
				}else{
					$consulta = $con->query("SELECT usuario FROM users WHERE usuario = '$usuario'");
					$num_row = $consulta->num_rows;
					if ($num_row != 1) {
						$response["success"] = 5;
					}else{
						$consulta = $con->query("SELECT password FROM users WHERE password = '$password'");
						$num_row = $consulta->num_rows;
						if ($num_row != 1) {
							$response["success"] = 6;
						}else{
							$consulta = $con->query("SELECT idUsuario, rol, idSucursal, nombre, genero, permiso FROM users WHERE password = '$password' AND usuario = '$usuario'");
							$num_row = $consulta->num_rows;
							if ($num_row != 1) {
								$response["success"] = 7;
							}else{
								date_default_timezone_set('America/Mexico_City');
								$fecha = date('Y-m-d');
								$row = $consulta->fetch_array();
								$nombre = $row['nombre'];

								$consult = $con->query("SELECT fechaEntrada FROM checador WHERE nombre = '$nombre' AND fechaEntrada = '$fecha'");
								$num_row = $consult->num_rows;
								if ($num_row != 1) {
									$insertar = $con->query("INSERT INTO checador (nombre, fechaEntrada, horaEntrada) VALUES ('$nombre', NOW(), NOW()) ");
								}
								
								$_SESSION['idUsuario'] = $row['idUsuario'];
								$_SESSION['rol'] = $row['rol'];
								$_SESSION['idSucursal'] = $row['idSucursal'];
								$_SESSION['nombre'] = $row['nombre'];
								$_SESSION['genero'] = $row['genero'];
								$_SESSION["permiso"] = $row["permiso"];
								$con->close();
								$response["success"] = 8;
								$response["session"] = $_SESSION;
							}
						}
					}
				}
			}
		}
	}

	echo json_encode($response);






