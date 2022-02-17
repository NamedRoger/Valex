<?php

	session_start();
	require 'functions.php';
	$con = Conexion();

	$categoria = trim(mysqli_escape_string($con, $_POST['categoria']));
	if (empty($categoria)) {
		echo 1;
	}else{
		if (!preg_match ('/^[a-zA-Z0-9 áéíóúÁÉÍÓÚñÑ]+$/', $categoria)) {			
			echo 2;
		}else{
			$insertar = $con->query("INSERT INTO categorias (categoria) VALUES ('$categoria')");
			if (!$insertar) {
				printf("Error en ejecución contacte con soporte: %s\n", $con->error);
			}else{
				$con->close();
				echo 3;
			}
		}
	}
