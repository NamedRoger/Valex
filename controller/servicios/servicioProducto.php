<?php

use Valex\Clases\DataBase;
use Valex\Clases\Producto;

function getProductoById($id)
{
    $conexion =  DataBase::getInstance()->getConexion();
    $query = "SELECT * FROM productos WHERE idProducto = $id";
    $result = $conexion->query($query)->fetch_object();
    $producto = new Producto(
        $result->codigo,
        $result->idCategoria,
        $result->medida,
        $result->nombre,
        $result->compra,
        $result->venta,
        $result->medio,
        $result->mayoreo
    );

    $producto->idProducto = $result->idProducto;

    return $producto;
}

function getProductoByCodigo($codigo)
{
    $conexion =  DataBase::getInstance()->getConexion();
    $query = "SELECT * FROM productos WHERE codigo = $codigo";
    return $conexion->query($query)->fetch_object();
}

function getProductos($filter = null)
{
    $productos = [];
    $conexion =  DataBase::getInstance()->getConexion();
    $query = "SELECT p.* FROM productos AS p ";

    if(isset($filter)){
        $query .= "WHERE p.nombre LIKE '%$filter%' ";
    }

    $query .= "LIMIT 15";
    $result = $conexion->query($query);
    while($producto = $result->fetch_object()){
        $productos[] = $producto;
    }
    return $productos;
}

