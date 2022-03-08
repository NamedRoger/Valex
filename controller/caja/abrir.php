<?php

use Valex\Clases\Caja;

include '../../clases/DataBase.php';
include '../../clases/Venta.php';
include '../../clases/Stock.php';
include '../../clases/Cliente.php';
include '../../clases/ProductoVenta.php';
include '../../clases/Producto.php';
include '../../clases/Caja.php';


include '../servicios/servicioSesion.php';
include '../servicios/servicioProducto.php';
include '../servicios/servicioCliente.php';
include '../servicios/servicioVenta.php';

$result = [];
try{
    $idSucursal = getSucursal();
    $idUsuario = getIdUsuario();
    $cajaData = json_decode(file_get_contents('php://input'));
    
    $caja = new Caja($idUsuario, $idSucursal, $cajaData->monto);
    $caja->abrirCaja();
    $result['data'] = $caja;
    $result['success'] = true;

    echo json_encode($result);
}catch(Exception $exception){
    $result['success'] = false;
    $result['error'] = $exception->getMessage();
    
    http_response_code(400);
    echo json_encode($result);
}