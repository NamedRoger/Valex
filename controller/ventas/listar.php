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
    $fechaInicio = $_GET['fechaInicio'];
    $fechaFin = $_GET['fechaFin'];
    $vendedor = $_GET['idVendedor'];
    $cliente = $_GET['idCliente'];
    $sucursal = getSucursal();

    $filters = [
        "idVendedor" => $vendedor,
        "fechaInicio" => $fechaInicio,
        "fechaFin" => $fechaFin,
        "idCliente" => $cliente,
    ];


    $ventas = obtenerVentas($sucursal,$filters);
    echo json_encode($ventas);

} catch(Exception $excetption){
    echo json_encode($excetption->getMessage());
}
