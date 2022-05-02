<?php

namespace Valex\Clases;

use Exception;

class Venta
{
    public $idVenta;
    public $idSucursal;
    public $proudctos;
    public $cliente;
    public $idVendedor;
    public $total;
    private $conexion;
    public $pago;
    public $cambio;

    public function __construct($idSucursal, $cliente, $idVendedor, $pago, $proudctos = [])
    {
        $this->idSucursal = $idSucursal;
        $this->cliente = $cliente;
        $this->idVendedor = $idVendedor;
        $this->proudctos = $proudctos;
        $this->total = 0.00;
        $this->conexion = DataBase::getInstance()->getConexion();
        $this->pago = $pago;
    }

    public function registrarVenta()
    {
        $this->conexion->beginTransaction();
        try {
            $idCliente = $this->cliente->idCliente;
            $registrarVentaQuery = "INSERT INTO 
                                ventas (idVendedor, idCliente, idSucursal, monto, pago, cambio)
                                VALUES ($this->idVendedor,$idCliente,$this->idSucursal, $this->total, $this->pago, $this->cambio)";
            $this->conexion->exec($registrarVentaQuery);
            $this->idVenta = $this->conexion->lastInsertId();

            foreach ($this->proudctos as $producto) {
                $this->registrarProducto($producto);
            }

            $this->conexion->commit();
        } catch (Exception $e) {
            $this->conexion->rollBack();
        }
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

        $this->conexion->exec($registrarProductoQuery);
    }

    public function obtenerProductos()
    {
        $query = "SELECT * FROM venta_productos AS vp WHERE vp.idVenta = $this->idVenta";
        $resutl = $this->conexion->query($query);
        $productos = [];
        while ($producto = $resutl->fetchObject()) {
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

    public function calcularCambio()
    {
        $this->cambio = $this->pago - $this->total;
    }

    public function pagar($monto)
    {
        $cambio = $monto - $this->total;
        $registrarPagoQuery = "UPDATE ventas SET pago = $monto, cambio = $cambio WHERE idVenta = $this->idVenta";
        $this->conexion->exec($registrarPagoQuery);
        return $cambio;
    }

    public function agregarProducto($producto)
    {
        $this->proudctos[] = $producto;
    }
}
