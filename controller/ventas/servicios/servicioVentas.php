<?php
require '../functions.php';
session_start();
$connexion = Conexion();
$session =  $_SESSION;

function obtenerVentas(){
    global $connexion;
    $query = "SELECT v.idVenta, 
                     v.idCliente,
                     v.monto,
                     v.fecha,
                     c.nombre as cliente
              FROM ventas AS v
              INNER JOIN clientes AS c ON c.idCliente = v.idCliente";

    $result = $connexion->query($query);
    while($venta = $result->fetch_object())
        $ventas[] = $venta;
    return $ventas;
}

function obtenerVenta($idVenta){
    global $connexion;
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

    $result = $connexion->query($query);

    return $result->fetch_object();
}

function obtenerProductosVenta($idVenta){
    global $connexion;
    $query = "SELECT * FROM venta_productos AS vp WHERE vp.idVenta = '$idVenta'";
    $resutl = $connexion->query($query);
    $productos = [];
    while($producto = $resutl->fetch_object()){
        $detalleProducto = getDetallesProducto($producto->idProducto);
        $producto->nombre = $detalleProducto->nombre;
        $productos[] = $producto;
    }
    return $productos;
}


function registrarVenta($ventaData, $cliente)
{
    global $connexion;
    $idVenta = 1;
    $monto = (float)0.0;
    $productos = [];

    foreach($ventaData->productos as $producto){
        $detalleProducto = getDetallesProducto($producto->idProducto);
        if($detalleProducto == null)
            throw new Exception("Ocurrió un error al registar la compra (No se encuentra un producto)");
        
        $precio = precioCliente($detalleProducto, $cliente);
        $producto->precio = $precio;
        $producto->medida = $detalleProducto->medida;
        $producto->total = calcularTotalProducto($detalleProducto, $precio, $producto->cantidad);
        $productos[] = $producto;
    }

    foreach($productos as $producto){
        $monto += (float) $producto->total;
    }

    $query = "INSERT INTO ventas (idVendedor, idCliente, idSucursal, monto) 
        VALUES ('$ventaData->idVendedor','$ventaData->idCliente','$ventaData->idSucursal','$monto')"; 
    $connexion->query($query);
    $idVenta = $connexion->insert_id;

    if($idVenta == null) {
        throw new Exception("Ocurrió un error al registar la compra");
    }

    registarProductosEnVenta($idVenta, $productos);

    return $idVenta;
}

function registarProductosEnVenta($venta, $productos){
    foreach($productos as $producto){
        registarProductoEnVenta($venta, $producto);
    }
}

function registarProductoEnVenta($venta, $producto)
{
    global $connexion;
    $query = "INSERT INTO venta_productos (idVenta, idProducto,cantidad, precio, medida, total) 
              VALUES ('$venta',
              '$producto->idProducto',
              '$producto->cantidad',
              '$producto->precio',
              '$producto->medida',
              '$producto->total')";

    $connexion->query($query);
}

function getDetallesProducto($idProducto)
{
    global $connexion;
    $query = "SELECT * FROM productos WHERE idProducto = $idProducto";
    return $connexion->query($query)->fetch_object();
}

function getDetallesCliente($idCliente)
{
    global $connexion;
    $query = "SELECT * FROM clientes WHERE idCliente = '$idCliente'";
    return $connexion->query($query)->fetch_object();
}

function calcularTotalProducto($producto, $precioCliente, $cantidad)
{
    $precio = 0;
    $precio = $precioCliente * $cantidad;
    return $precio;
}

function precioCliente($producto, $cliente){
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
