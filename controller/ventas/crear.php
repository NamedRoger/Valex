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
    $ventaData = json_decode(file_get_contents('php://input'));

    if(isset($ventaData)){
        $cliente = getClienteById($ventaData->idCliente);
        if($cliente == null) {
            throw new Exception("No existe el cliente");
        }

        $idSucursal = getSucursal();
        $idUsuario = getIdUsuario();

        if(!isset($idSucursal)){
            throw new Exception("Necesita estar registrado en alguna sucursal");
        }
        $ventaData->idVendedor = intval($idUsuario);
        $ventaData->idSucursal = intval($idSucursal);

        $idVenta = registrarVenta($ventaData, $cliente);

        $result = [
            "success" => true,
            "data" => $idVenta
        ];

        echo json_encode($result);
    }

}catch(Exception $e){
    $result['success'] = false;
    $result['error'] = $e->getMessage();
    http_response_code(400);
    echo json_encode($result);
}


