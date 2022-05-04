<?php

use Valex\Clases\DataBase;
use Valex\Clases\ProductoVenta;
use Valex\Clases\Stock;

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
    $conexion = DataBase::getInstance()->getConexion();
    $ventaData = json_decode(file_get_contents('php://input'));

    if(isset($ventaData)){
        $cliente = getClienteById($ventaData->customer->idCliente);
        if($cliente == null) {
            $cliente = getClientBase();
        }

        $idSucursal = getSucursal();
        $idUsuario = getIdUsuario();

        $insertVentaQuery = "INSERT INTO 
        ventas (idVendedor, idCliente, idSucursal, monto, pago, cambio)
        VALUES ($idUsuario,$cliente->idCliente,$idSucursal, $ventaData->total, $ventaData->paid, $ventaData->cambio)";

        $insertVentaResul = $conexion->exec($insertVentaQuery);

        $idVenta = $conexion->lastInsertId();

        if(!$insertVentaQuery){
            throw new Exception("no se pudo registrar la venta");
        }

        $productosVenta = [];
        foreach ($ventaData->products as $productoInfo) {
            $producto = getProductoById($productoInfo->idProducto);
            $productosVenta[] = new ProductoVenta(
                $producto->idProducto,
                $productoInfo->cantidad,
                $producto->obtenerPrecioCliente($cliente),
                $producto->medida
            );
        }
        $stock = new Stock($idSucursal);

        foreach ($productosVenta as $producto) {
            if (
                $stock->validarExistenciaDeProducto($producto->idProducto)
                && ($stock->obtenerCantidadProducto($producto->idProducto) - $producto->cantidad >= 0)
            ) {
                $queryInserProduct = "INSERT INTO venta_productos (idVenta, idProducto,cantidad, precio, medida, total) 
                VALUES ($idVenta,
                $producto->idProducto,
                $producto->cantidad,
                $producto->precio,
                $producto->medida,
                $producto->total)";
                $resultInsertProduct = $conexion->exec($queryInserProduct);

                if(!$resultInsertProduct)
                    throw new Exception("no se pudo registar el producto");

                $stock->reducirProducto($producto->idProducto, $producto->cantidad);
            } else {
                throw new Exception("No se puede registrar el producto $producto->idProducto");
            }
        }
        
        // if(!isset($idSucursal)){
        //     throw new Exception("Necesita estar registrado en alguna sucursal");
        // }
        // $ventaData->idVendedor = intval($idUsuario);
        // $ventaData->idSucursal = intval($idSucursal);

        // $idVenta = registrarVenta($ventaData, $cliente);

        $result = [
            "success" => true,
            "data" => $productosVenta
        ];

        echo json_encode($result);
    }

}catch(Exception $e){
    $result['success'] = false;
    $result['error'] = $e->getMessage();
    http_response_code(400);
    echo json_encode($result);
}


