<?php

namespace Valex\Clases;

class DataBase
{
	private static $instance;
	private $conexion;

	public static function getInstance()
	{
		if (!self::$instance instanceof self)
			self::$instance = new self();
		return self::$instance;
	}

	private function __construct()
	{
		$this->conexion = $this->createConexion();
		$this->seedInitData();
	}

	public function getConexion()
	{
		return $this->conexion;
	}

	public function createConexion()
	{
		$servername = "localhost";
		$database = "valex";
		$username = "root";
		$password = "";
		// Create connection
		$con = mysqli_connect($servername, $username, $password, $database);
		// Check connection
		if (!$con) {
			die("Connection failed: " . mysqli_connect_error());
		}
		if (!$con->set_charset("utf8")) {
			printf("Error al cargar el conjunto de caracteres utf8: %s\n", $con->error);
			exit();
		}

		return $con;
	}

	private function seedInitData()
	{
		$clientName = "Cliente Default";
		$foundClientBaseQuery = "SELECT * FROM clientes WHERE nombre = '$clientName'";
		$foundClientResult = $this->conexion->query($foundClientBaseQuery);
		if ($foundClientResult) {
			$foundClient = $foundClientResult->fetch_object();
			if (!$foundClient) {
				$clientBaseInsertQuery = "INSERT INTO clientes (nombre, precio) VALUES ('$clientName', 1)";
				$this->conexion->query($clientBaseInsertQuery);
			}
		}
	}
}
