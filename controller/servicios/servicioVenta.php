<?php

use Valex\Clases\DataBase;
use Valex\Clases\ProductoVenta;
use Valex\Clases\Stock;
use Valex\Clases\Venta;

function obtenerVentas($filters = null)
{
    $conexion =  DataBase::getInstance()->getConexion();
    $query = "SELECT v.idVenta, 
    v.idCliente,
    v.monto,
    v.fecha,
    c.nombre as cliente,
    c.telefono as clienteTelefono,
    c.precio as clientePrecio,
    u.nombre as vendedor,
    s.direccionSuc as direccion
    FROM ventas AS v
    INNER JOIN clientes AS c ON c.idCliente = v.idCliente
    INNER JOIN users as u ON u.idUsuario = v.idVendedor
    INNER JOIN sucursales s ON s.idSucursal = u.idSucursal";

    if (!empty($filters['idVendedor'])) {
        $id = intval($filters['idVendedor']);
        $query .= " AND v.idVendedor = $id";
    }
    if (!empty($filters['idCliente'])) $query .= " AND v.idCliente = " . $filters['idCliente'] . "";
    if (!empty($filters['fechaInicio'])) {
        $fecha = date('Y-m-d', strtotime($filters['fechaInicio']));
        $query .= " AND v.fecha >= CAST('$fecha' as datetime)";
    }
    if (!empty($filters['fechaFin'])) {
        $fecha = date('Y-m-d', strtotime($filters['fechaFin']));
        $query .= " AND v.fecha <= CAST( '$fecha' as datetime)";
    }

    $result = $conexion->query($query);
    $ventas = [];
    while ($venta = $result->fetch_object())
        $ventas[] = $venta;

    return $ventas;
}

function obtenerVentasPorSucursal($idSucursal, $filters = null)
{
    $conexion =  DataBase::getInstance()->getConexion();
    $query = "SELECT v.idVenta, 
                v.idCliente,
                v.monto,
                v.fecha,
                c.nombre as cliente,
                c.telefono as clienteTelefono,
                c.precio as clientePrecio,
                u.nombre as vendedor,
                s.direccionSuc as direccion
                FROM ventas AS v
                INNER JOIN clientes AS c ON c.idCliente = v.idCliente
                INNER JOIN users as u ON u.idUsuario = v.idVendedor
                INNER JOIN sucursales s ON s.idSucursal = u.idSucursal
                WHERE v.idSucursal = $idSucursal";

    if (!empty($filters['idVendedor'])) {
        $id = intval($filters['idVendedor']);
        $query .= " AND v.idVendedor = $id";
    }
    if (!empty($filters['idCliente'])) $query .= " AND v.idCliente = " . $filters['idCliente'] . "";
    if (!empty($filters['fechaInicio'])) {
        $fecha = date('Y-m-d', strtotime($filters['fechaInicio']));
        $query .= " AND v.fecha >= CAST('$fecha' as datetime)";
    }
    if (!empty($filters['fechaFin'])) {
        $fecha = date('Y-m-d', strtotime($filters['fechaFin']));
        $query .= " AND v.fecha <= CAST( '$fecha' as datetime)";
    }

    $result = $conexion->query($query);
    $ventas = [];
    while ($venta = $result->fetch_object())
        $ventas[] = $venta;

    return $ventas;
}

function obtenerVenta($idVenta)
{
    $conexion =  DataBase::getInstance()->getConexion();
    $query = "SELECT v.idVenta, 
                     v.idCliente,
                     v.monto,
                     v.fecha,
                     c.nombre as cliente,
                     c.telefono as clienteTelefono,
                     c.precio as clientePrecio,
                     u.nombre as vendedor,
                     s.direccionSuc as direccion
              FROM ventas AS v
              INNER JOIN clientes AS c ON c.idCliente = v.idCliente
              INNER JOIN users as u ON u.idUsuario = v.idVendedor
              INNER JOIN sucursales s ON s.idSucursal = u.idSucursal
              WHERE v.idVenta = '$idVenta'";

    $result = $conexion->query($query);

    return $result->fetch_object();
}

function obtenerProductosVenta($idVenta)
{
    $conexion =  DataBase::getInstance()->getConexion();

    $query = "SELECT vp.*,p.nombre FROM venta_productos AS vp 
    INNER JOIN productos AS p ON p.idProducto = vp.idProducto WHERE vp.idVenta = '$idVenta'";
    $resutl = $conexion->query($query);
    $productos = [];
    while ($producto = $resutl->fetch_object()) {
        $productos[] = $producto;
    }
    return $productos;
}


function registrarVenta($ventaData, $cliente)
{
    $stock = new Stock($ventaData->idSucursal);

    $productosVenta = [];

    foreach ($ventaData->productos as $productoInfo) {
        $producto = getProductoById($productoInfo->idProducto);
        $productosVenta[] = new ProductoVenta(
            $producto->idProducto,
            $productoInfo->cantidad,
            $producto->obtenerPrecioCliente($cliente),
            $producto->medida
        );
    }


    $venta = new Venta($ventaData->idSucursal, $cliente, $ventaData->idVendedor, $ventaData->pago, $productosVenta);
    $venta->calcularTotal();
    $venta->calcularCambio();
    $venta->registrarVenta();

    if ($venta->idVenta == null) {
        throw new Exception("Ocurrió un error al registrar la venta");
    }

    $venta->pagar($ventaData->pago);

    foreach ($venta->proudctos as $producto) {
        if (
            $stock->validarExistenciaDeProducto($producto->idProducto)
            && ($stock->obtenerCantidadProducto($producto->idProducto) - $producto->cantidad >= 0)
        ) {
            $venta->registrarProducto($producto);
            $stock->reducirProducto($producto->idProducto, $producto->cantidad);
        } else {
            throw new Exception("No se puede registrar el producto $producto->idProducto");
        }
    }
    return $venta->idVenta;
}