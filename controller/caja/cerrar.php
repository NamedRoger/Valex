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
try{
    $idSucursal = getSucursal();
    $idUsuario = getIdUsuario();
    $cajaData = json_decode(file_get_contents('php://input'));
    $conexion = DataBase::getInstance()->getConexion();
    
    // $caja = new Caja($idUsuario, $idSucursal);
    // $caja->id = $cajaData->id;
    // $caja->cerrarCaja($cajaData->monto);

    $id = $cajaData->id;
    $monto = $cajaData->monto;

    date_default_timezone_set('America/Monterrey');
    $fechaInicio = new DateTime("now");
    $fecha = $fechaInicio->format('Y-m-d H:i:s');
    $abrirCajaQuery = "UPDATE arqueo_caja SET estatus = 0, fechaFin ='$fecha', montoFinal = $monto WHERE id = $id";

    $res = $conexion->exec($abrirCajaQuery);
    if (!$res){
        throw new Exception("no se pudo cerrar la caja");
    }

    $result['data'] = [
        "montoFinal" => $monto
    ];
    $result['success'] = true;

    echo json_encode($result);
}catch(Exception $exception){
    $result['success'] = false;
    $result['error'] = $exception->getMessage();
    
    http_response_code(400);
    echo json_encode($result);
}