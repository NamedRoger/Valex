<?php

namespace Valex\Clases;

use Exception;

class Stock
{
    public $idSucursal;
    private $conexion;

    public function __construct($idSucursal)
    {
        $this->idSucursal = $idSucursal;
        $this->conexion = DataBase::getInstance()->getConexion();
    }

    public function validarExistenciaDeProducto($idProducto)
    {
        $producto = $this->obtenerProducto($idProducto);
        $cantidad = floatval($producto->stock);

        return $cantidad > 0;
    }

    public function obtenerCantidadProducto($idProducto)
    {
        $producto = $this->obtenerProducto($idProducto);
        return (float) $producto->stock;
    }

    public function reducirProducto($idProducto, $cantidad)
    {

        $producto = $this->obtenerProducto($idProducto);
        $cantidadEnStock = floatval($producto->stock);
        $cantidadEnStock -= $cantidad;
        $this->actualizarCantidadProducto($producto->idStock, $cantidadEnStock);
    }

    public function aumentarProducto($idProducto, $cantidad)
    {
        $producto = $this->obtenerProducto($idProducto);
        $cantidadEnStock = floatval($producto->stock);
        $cantidad += $cantidadEnStock;

        $this->actualizarCantidadProducto($producto->idStock, $cantidad);
    }

    private function actualizarCantidadProducto($idProducto, $cantidad)
    {
        $actualizarCantidadQuery = "UPDATE stock SET  stock = $cantidad WHERE idStock = $idProducto";
        $this->conexion->query($actualizarCantidadQuery);
    }

    public function obtenerProducto($idProducto)
    {
        $obetenerProductoQuery = "SELECT * FROM stock 
        WHERE idSucursal = $this->idSucursal 
        AND idProducto = $idProducto";

        $result = $this->conexion->query($obetenerProductoQuery);
        return $result->fetch_object();
    }
}
