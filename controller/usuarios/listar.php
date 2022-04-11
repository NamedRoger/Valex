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
    $idSucursal = $_GET['idSucursal'];
    $query = "SELECT * FROM users WHERE idSucursal = $idSucursal AND rol = 3";
    $vendedores = [];

    $result = $conexion->query($query);
    while($vendedor = $result->fetch_object()){
        $vendedores[] = $vendedor;
    }

    echo json_encode($vendedores);

} catch(Exception $excetption){
    echo json_encode($excetption->getMessage());
}
