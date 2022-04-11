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


try{
    $fechaInicio = $_GET['fechaInicio'] ?? null;
    $fechaFin = $_GET['fechaFin'] ?? null;
    $vendedor = $_GET['idVendedor'] ?? null;
    $cliente = $_GET['idCliente'] ?? null;
    $sucursalGet = $_GET['idSucursal'] ?? null;

    $sucursal = getSucursal();

    $rol = getRol();

    $ventas = [];
    $filters = [
        "idVendedor" => $vendedor,
        "fechaInicio" => $fechaInicio,
        "fechaFin" => $fechaFin,
        "idCliente" => $cliente,
    ];

    if($rol == 1){
        if($sucursalGet != null){
            $ventas = obtenerVentasPorSucursal($sucursalGet, $filters);
        }else{
            $ventas = obtenerVentas($filters);
        }
    }else {
        $ventas =  obtenerVentasPorSucursal($sucursal, $filters);
    }

    echo json_encode($ventas);

} catch(Exception $excetption){
    echo json_encode($excetption->getMessage());
}
