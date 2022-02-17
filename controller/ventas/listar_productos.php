<?php
include './servicios/servicioVentas.php';

$idVenta = $_GET['idVenta'];

$productosVenta = obtenerProductosVenta($idVenta);
echo json_encode($productosVenta);