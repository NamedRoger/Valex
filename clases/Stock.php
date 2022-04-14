<?php

namespace Valex\Clases;

use Exception;
use Valex\Clases\Producto;
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
        $productoStock = $this->obtenerProducto($idProducto);
        $producto = Producto::obtenerProducto($idProducto);
        $cantidadEnStock = floatval($productoStock->stock);
        if($producto->medida == 1)
        {
            $cantidad = $cantidad * 1000;
        }
        $cantidadEnStock -= $cantidad;
        $this->actualizarCantidadProducto($productoStock->idStock, $cantidadEnStock);
    }

    public function aumentarProducto($idProducto, $cantidad)
    {
        $productoStock = $this->obtenerProducto($idProducto);
        $producto = Producto::obtenerProducto($idProducto);
        $cantidadEnStock = floatval($productoStock->stock);

        if($producto->medida == 1)
        {
            $cantidad = $cantidad * 1000;
        }
        $cantidad += $cantidadEnStock;
        $this->actualizarCantidadProducto($productoStock->idStock, $cantidad);
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
