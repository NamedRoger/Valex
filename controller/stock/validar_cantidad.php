<?php

use Valex\Clases\Stock;

include '../../clases/DataBase.php';
include '../../clases/Venta.php';
include '../../clases/Stock.php';
include '../../clases/Cliente.php';
include '../../clases/ProductoVenta.php';
include '../../clases/Producto.php';


include '../servicios/servicioSesion.php';
include '../servicios/servicioProducto.php';
include '../servicios/servicioCliente.php';
include '../servicios/servicioVenta.php';

$result = [];
try{
    $idProducto = $_GET['idProducto'];
    $cantidad = floatval($_GET['cantidad']);

    $idSucursal = getSucursal();
    $stock = new Stock($idSucursal);

    $producto = $stock->obtenerProducto($idProducto);
    $cantidadEnStock = (float) $producto->stock;

    $result['data'] = $cantidadEnStock - $cantidad >= 0;
    $result['success'] = true;

    echo json_encode($result);
}catch(Exception $exception){
    $result['success'] = false;
    $result['error'] = $exception->getMessage();
    
    http_response_code(400);
    echo json_encode($result);
}