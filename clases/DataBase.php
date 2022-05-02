<?php

namespace Valex\Clases;

use PDO;

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
		$con = new PDO("mysql:host=localhost;dbname=valex",$username,$password, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8") );
		// Check connection
		if (!$con) {
			die("Connection failed: " . mysqli_connect_error());
		}
		return $con;
	}

	private function seedInitData()
	{
		$clientName = "Cliente Default";
		$foundClientBaseQuery = "SELECT * FROM clientes WHERE nombre = '$clientName'";
		$foundClientResult = $this->conexion->query($foundClientBaseQuery);
		if ($foundClientResult) {
			$foundClient = $foundClientResult->fetchObject();
			if (!$foundClient) {
				$clientBaseInsertQuery = "INSERT INTO clientes (nombre, precio) VALUES ('$clientName', 1)";
				$this->conexion->query($clientBaseInsertQuery);
			}
		}
	}
}
