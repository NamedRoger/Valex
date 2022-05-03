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


$response = [];
$connection = DataBase::getInstance()->getConexion();

try{
    $ventaData = json_decode(file_get_contents('php://input'));
    $sucursal = $ventaData->sucursal;
    $venta = $ventaData->venta;
    $producosVenta =[];

    $producosVentaQuery = "SELECT * FROM venta_productos WHERE idVenta = $venta";

    $producosVenta = $connection->query($producosVentaQuery)->fetchAll(PDO::FETCH_CLASS);
    $productosStock = [];
    foreach($producosVenta as $productoVenta){
        $idProducto = $productoVenta->idProducto;
        $cantidad = 0;
        $productoStock = $connection->query("SELECT * FROM stock WHERE idSucursal = $sucursal AND idProducto = $idProducto")->fetchObject();
        $cantidad = floatval($productoStock->stock) + floatval($productoVenta->cantidad);
        $productosStock[] =$cantidad;
        $productoUpdateStockQuery = "UPDATE stock SET stock = $cantidad WHERE idSucursal = $sucursal AND idProducto = $idProducto";
        $res = $connection->exec($productoUpdateStockQuery);
    }

    $deleteVentaQuery = "DELETE FROM ventas WHERE idVenta = $venta";
    $resDelete = $connection->exec($deleteVentaQuery);
    if(!$resDelete){
        throw new Exception("no se pudo eliminar la venta");
    }

    echo json_encode($response);
}catch(Exception $exception){
    echo json_encode($response);
}