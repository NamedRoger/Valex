<?php 
  
  session_start();
  require_once '../functions.php';
  $con = Conexion();

  $idSucursal = $_SESSION['idSucursal'];
  if ($_SESSION['rol'] == 1) {
    $consulta = $con->query("SELECT * FROM stock LEFT JOIN productos USING(idProducto) LEFT JOIN sucursales USING(idSucursal) LEFT JOIN categorias USING(idCategoria)");
  }else{
    $consulta = $con->query("SELECT * FROM stock LEFT JOIN productos USING(idProducto) LEFT JOIN categorias USING(idCategoria) WHERE stock.idSucursal = '$idSucursal'");
  }
  $data = array();

  while($row = $consulta->fetch_array()){      
      $sub_array = array();
      if ($_SESSION['rol'] == 1) {
        $sub_array[] = '<small>'.$row["sucursal"].'</small>';
      }
      $sub_array[] = '<small>'.$row["codigo"].'</small>';
      $sub_array[] = '<small>'.$row["nombre"].'</small>';
      $sub_array[] = '<small>'.$row["descripcion"].'</small>';
      $sub_array[] = '<small>'.$row["categoria"].'</small>';
      switch ($row["medida"]) {
        case '1':
           $sub_array[] = '<small>Kg</small>';
          break;
        case '2':
           $sub_array[] = '<small>Pieza</small>';
          break;
        case '3':
           $sub_array[] = '<small>Paquete</small>';
          break;
      }
      $sub_array[] = '<small>$ '.$row["compra"].'</small>';
      $sub_array[] = '<small>$ '.$row["venta"].'</small>';
      $sub_array[] = '<small>$ '.$row["medio"].'</small>';
      $sub_array[] = '<small>$ '.$row["mayoreo"].'</small>';
      if ($row["stock"] == 0) {
       $sub_array[] = '<button class="btn btn-iconbtn btn-sm" onclick="ModalStock('.$row['idStock'].')"><i class="fas fa-cubes" style="color: green;"></i></button>';
      }else{
        $sub_array[] = $row["stock"];
      }

      if ($row["stock"] == 0) {
        $sub_array[] = '';
      }else{
        $sub_array[] = '<button class="btn btn-iconbtn btn-sm" onclick="ModalStock('.$row['idStock'].')"><i class="fas fa-edit" style="color: #278CCD;"></i></button>';
      }
      if ($_SESSION['rol'] == 1 && $row["stock"] != 0 || $_SESSION['rol'] == 2 && $row["stock"] != 0) {
         $sub_array[] = '<button class="btn btn-iconbtn btn-sm" onclick="ModalMerma('.$row['idStock'].')"><i class="fas fa-edit" style="color: #278CCD;"></i></button>';
      }else{
        $sub_array[] = '';
      }
      $data[] = $sub_array;
      
  }

  $output = array(
   "data" => $data
  );

  echo json_encode($output);