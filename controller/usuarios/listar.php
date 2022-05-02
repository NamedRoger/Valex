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
    

    echo json_encode($result->fetchAll(PDO::FETCH_CLASS));

} catch(Exception $excetption){
    echo json_encode($excetption->getMessage());
}
