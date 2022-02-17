<?php 
  session_start();
  require_once '../functions.php';
  $con = Conexion();
  $idSucursal = $_SESSION['idSucursal'];
  $consulta = $con->query("SELECT * FROM productos JOIN stock USING(idProducto) WHERE idSucursal = '$idSucursal'");
  $data = array();

  while($row = $consulta->fetch_array()){      
      $sub_array = array();
      $sub_array[] = $row["nombre"];
      $sub_array[] = $row["venta"];
      $sub_array[] = '<button class="btn btn-icon btn-primary"><i class="fas fa-plus"></i></button>';
      $data[] = $sub_array;
  }



  $output = array(
   "data" => $data
  );

  echo json_encode($output);