<?php

use Valex\Clases\DataBase;

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
    $conexion = DataBase::getInstance()->getConexion();
    $query = "SELECT * FROM sucursales";
    $sucursales = [];

    $result = $conexion->query($query);
    while($sucursal = $result->fetch_object()){
        $sucursales[] = $sucursal;
    }

    echo json_encode($sucursales);

} catch(Exception $excetption){
    echo json_encode($excetption->getMessage());
}
