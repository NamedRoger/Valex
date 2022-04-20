<?php

use Valex\Clases\Cliente;
use Valex\Clases\DataBase;

function getClienteById($idCliente)
{
    $conexion =  DataBase::getInstance()->getConexion();
    $query = "SELECT * FROM clientes WHERE idCliente = '$idCliente'";
    $result =  $conexion->query($query)->fetch_object();
    $cliente = new Cliente($result->idCliente, $result->nombre, $result->precio);
    return $cliente;
}

function getClientBase()
{
    $conexion = DataBase::getInstance()->getConexion();
    $clientName = "Cliente Default";
    $foundClientBaseQuery = "SELECT * FROM clientes WHERE nombre = '$clientName'";
    $foundClientResult = $conexion->query($foundClientBaseQuery);
    return $foundClientResult->fetch_object();
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
    while ($clienteResult = $result->fetch_object()) {
        $clientes[] = new Cliente(
            $clienteResult->idCliente,
            $clienteResult->nombre,
            $clienteResult->precio
        );
    }
    return $clientes;
}
