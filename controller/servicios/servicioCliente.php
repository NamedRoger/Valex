<?php

use Valex\Clases\Cliente;
use Valex\Clases\DataBase;

function getClienteById($idCliente)
{
    $conexion =  DataBase::getInstance()->getConexion();
    $query = "SELECT * FROM clientes WHERE idCliente = '$idCliente'";
    $result =  $conexion->query($query)->fetchObject();
    $cliente = new Cliente($result->idCliente, $result->nombre, $result->precio);
    return $cliente;
}

function getClientBase()
{
    $conexion = DataBase::getInstance()->getConexion();
    $clientName = "Cliente Default";
    $foundClientBaseQuery = "SELECT * FROM clientes WHERE nombre = '$clientName'";
    $foundClientResult = $conexion->query($foundClientBaseQuery);
    return $foundClientResult->fetchObject();
}

function getClientes($filter = null)
{
    $clientes = [];
    $conexion =  DataBase::getInstance()->getConexion();
    $query = "SELECT * FROM clientes ";

    if (isset($filter)) {
        $query .= "WHERE nombre LIKE '%$filter%'  ";
    }

    $query .= "LIMIT 15";

    $result = $conexion->query($query);
    $clientes = $result->fetchAll(PDO::FETCH_CLASS);
    return $clientes;
}
