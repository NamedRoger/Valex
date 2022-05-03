<?php

use Valex\Clases\Caja;
use Valex\Clases\DataBase;

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
try {
    $idSucursal = getSucursal();
    $idUsuario = getIdUsuario();
    $connection = DataBase::getInstance()->getConexion();
    $cajaData = json_decode(file_get_contents('php://input'));
    $monto = $cajaData->monto;
    // $caja = new Caja($idUsuario, $idSucursal, $cajaData->monto);
    // $caja->abrirCaja();

    $fechaInicio = new DateTime("now");
    $fecha = $fechaInicio->format('Y-m-d H:i:s');

    $openCashRegisterQuery = "INSERT INTO arqueo_caja (idUsuario, idSucursal, fechaInicio, montoInicial, montoFinal,estatus) VALUES ($idUsuario,$idSucursal,'$fecha',$monto,0,1)";

    $res = $connection->exec($openCashRegisterQuery);

    if(!$res)
        throw new Exception("no se pudo abrir la caja");

    $result['data'] = [
        "id" => $connection->lastInsertId(),
        "monto" => $monto,
    ];
    $result['success'] = true;

    echo json_encode($result);
} catch (Exception $exception) {
    $result['success'] = false;
    $result['error'] = $exception->getMessage();

    http_response_code(400);
    echo json_encode($result);
}
