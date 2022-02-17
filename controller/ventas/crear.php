<?php
include './servicios/servicioVentas.php';

$result = [];
try{
    $connexion = Conexion();
    $ventaData = json_decode(file_get_contents('php://input'));

    if(isset($ventaData)){
        $cliente = getDetallesCliente($ventaData->idCliente);
        if($cliente == null) {
            throw new Exception("No existe el cliente");
        }

        $idVenta = registrarVenta($ventaData, $cliente);

        if($idVenta == null){
            throw new Exception("Ocurrió un problema para registrar la venta");
        }

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


