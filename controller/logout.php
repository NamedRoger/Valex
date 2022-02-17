<?php
	
	session_start();
	require 'functions.php';
	$con = Conexion();

	date_default_timezone_set('America/Mexico_City');
	$fecha = date('Y-m-d');
	$nombre = $_SESSION['nombre'];
	$insertar = $con->query("UPDATE checador SET fechaSalida = NOW(), horaSalida = NOW() WHERE nombre = '$nombre' AND fechaEntrada = '$fecha'"); 
	session_destroy(); 
	header('Location: ../');