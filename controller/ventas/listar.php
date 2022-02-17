<?php
include './servicios/servicioVentas.php';


$ventas = obtenerVentas();

echo json_encode($ventas);