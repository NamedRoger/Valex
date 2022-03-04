<?php

namespace Valex\Clases;

class Venta
{
    public $idVenta;
    public $idSucursal;
    public $proudctos;
    public $cliente;
    public $idVendedor;
    public $total;
    private $conexion;

    public function __construct($idSucursal, $cliente, $idVendedor, $proudctos = [])
    {
        $this->idSucursal = $idSucursal;
        $this->cliente = $cliente;
        $this->idVendedor = $idVendedor;
        $this->proudctos = $proudctos;
        $this->total = 0.00;
        $this->conexion = DataBase::getInstance()->getConexion();
    }

    public function registrarVenta()
    {
        $idCliente = $this->cliente->idCliente;
        $registrarVentaQuery = "INSERT INTO ventas (idVendedor, idCliente, idSucursal, monto)
        VALUES ($this->idVendedor,$idCliente,$this->idSucursal, $this->total)";
        $this->conexion->query($registrarVentaQuery);
        $this->idVenta = $this->conexion->insert_id;
    }

    public function registrarProducto($producto)
    {
        $registrarProductoQuery = "INSERT INTO venta_productos (idVenta, idProducto,cantidad, precio, medida, total) 
        VALUES ($this->idVenta,
        $producto->idProducto,
        $producto->cantidad,
        $producto->precio,
        $producto->medida,
        $producto->total)";

        $this->conexion->query($registrarProductoQuery);
    }

    public function obtenerProductos()
    {
        $query = "SELECT * FROM venta_productos AS vp WHERE vp.idVenta = $this->idVenta";
        $resutl = $this->conexion->query($query);
        $productos = [];
        while ($producto = $resutl->fetch_object()) {
            $productos[] = new ProductoVenta(
                $producto->idProducto,
                $producto->cantidad, 
                $producto->precio,
                $producto->medida
            );
        }
        return $productos;
    }

    public function calcularTotal()
    {
        foreach ($this->proudctos as $producto) {
            $this->total += $producto->total;
        }
    }
}
