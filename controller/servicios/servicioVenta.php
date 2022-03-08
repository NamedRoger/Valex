<?php

use Valex\Clases\DataBase;
use Valex\Clases\ProductoVenta;
use Valex\Clases\Stock;
use Valex\Clases\Venta;

function obtenerVentas(){
    $conexion =  DataBase::getInstance()->getConexion();
    $query = "SELECT v.idVenta, 
                     v.idCliente,
                     v.monto,
                     v.fecha,
                     c.nombre as cliente
              FROM ventas AS v
              INNER JOIN clientes AS c ON c.idCliente = v.idCliente";

    $result = $conexion->query($query);
    while($venta = $result->fetch_object())
        $ventas[] = $venta;
    return $ventas;
}

function obtenerVenta($idVenta){
    $conexion =  DataBase::getInstance()->getConexion();
    $query = "SELECT v.idVenta, 
                     v.idCliente,
                     v.monto,
                     v.fecha,
                     c.nombre as cliente,
                     c.telefono as clienteTelefono,
                     c.precio as clientePrecio,
                     u.nombre as vendedor
              FROM ventas AS v
              INNER JOIN clientes AS c ON c.idCliente = v.idCliente
              INNER JOIN users as u ON u.idUsuario = v.idVendedor
              WHERE v.idVenta = '$idVenta'";

    $result = $conexion->query($query);

    return $result->fetch_object();
}

function obtenerProductosVenta($idVenta){
    $conexion =  DataBase::getInstance()->getConexion();

    $query = "SELECT * FROM venta_productos AS vp WHERE vp.idVenta = '$idVenta'";
    $resutl = $conexion->query($query);
    $productos = [];
    while($producto = $resutl->fetch_object()){
        $productos[] = $producto;
    }
    return $productos;
}


function registrarVenta($ventaData, $cliente)
{
    $stock = new Stock($ventaData->idSucursal);

    $productosVenta = [];
    foreach($ventaData->productos as $productoInfo){
        $producto = getProductoById($productoInfo->idProducto);
        $productosVenta[] = new ProductoVenta(
            $producto->idProducto,
            $productoInfo->cantidad,
            $producto->obtenerPrecioCliente($cliente),
            $producto->medida);
    }


    $venta = new Venta($ventaData->idSucursal,$cliente,$ventaData->idVendedor, $productosVenta);
    $venta->calcularTotal();

    $venta->registrarVenta();

    $venta->pagar($ventaData->pago);

    foreach($venta->proudctos as $producto)
    {
        if($stock->validarExistenciaDeProducto($producto->idProducto) 
            && ($stock->obtenerCantidadProducto($producto->idProducto) - $producto->cantidad >= 0)){
            $venta->registrarProducto($producto);
            $stock->reducirProducto($producto->idProducto, $producto->cantidad);
        }else{
            throw new Exception("No se puede registrar el producto $producto->idProducto");
        }
    }

    return $venta->idVenta;
}