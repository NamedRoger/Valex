<?php
include './servicios/servicioVentas.php';

$idVenta = $_GET['idVenta'];

$productosVenta = obtenerVenta($idVenta);
echo json_encode($productosVenta);