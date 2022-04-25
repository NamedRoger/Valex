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

$idSucursal = $_GET["id"];

$queryGetSucursal = "SELECT * FROM sucursales WHERE idSucursal = $idSucursal";

$conexion = DataBase::getInstance()->getConexion();

$result = $conexion->query($queryGetSucursal);

$sucursal = $result->fetch_object();

echo json_encode($sucursal);