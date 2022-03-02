<?php

use Valex\Persistence\DataBase;
include '../../database/database.php';


function getClienteById($idCliente)
{
    $dataBase = DataBase::getInstance();
    $conexion = $dataBase->getConexion();
    $query = "SELECT * FROM clientes WHERE idCliente = '$idCliente'";
    return $conexion->query($query)->fetch_object();
}

function getPrecioClienteProducto($cliente, $producto)
{
    $precioCliente  = 0;
    switch ($cliente->precio) {
        case 1:
            $precioCliente = $producto->venta;
            break;
        case 2:
            $precioCliente = $producto->medio;
            break;
        case 3:
            $precioCliente = $producto->mayoreo;
            break;
        default:
            $precioCliente = 1;
            break;
    }
    return $precioCliente;
}

function getClientes()
{
    $clientes = [];
    $dataBase = DataBase::getInstance();
    $conexion = $dataBase->getConexion();
    $query = "SELECT * FROM clientes";
    $result = $conexion->query($query);
    while($cliente = $result->fetch_object()){
        $clientes[] = $cliente;
    }
    return $clientes;
}
