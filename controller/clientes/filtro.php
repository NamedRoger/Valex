<?php

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
    $filter = $_GET['filter'] | '';
    $productos = getClientes($filter);

    $result['success'] = true;
    $result['data'] = $productos;

    echo json_encode($result);
}catch(Exception $exception){
    $result['success'] = false;
    $result['error'] = $exception->getMessage();

    http_response_code(400);
    echo json_encode($result);
}

