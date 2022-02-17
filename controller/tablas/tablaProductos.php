<?php 
  
  require_once '../functions.php';
  $con = Conexion();

  $consulta = $con->query("SELECT * FROM productos LEFT JOIN categorias USING(idCategoria)");
  $data = array();

  while($row = $consulta->fetch_array()){      
      $sub_array = array();
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
      $sub_array[] = '<small>'.$row["compra"].'</small>';
      $sub_array[] = '<small>'.$row["venta"].'</small>';
      $sub_array[] = '<small>'.$row["medio"].'</small>';
      $sub_array[] = '<small>'.$row["mayoreo"].'</small>';
      $sub_array[] = '<div class="btn-group mb-3 btn-group-sm" role="group">
                <button class="btn btn-iconbtn btn-sm" onclick="ModalEditarProducto('.$row["idProducto"].')"><i class="fas fa-edit" style="color: #278CCD;"></i></button>
                <button class="btn btn-iconbtn btn-sm" onclick="EliminarProducto('.$row["idProducto"].')"><i class="fas fa-trash-alt" style="color: red;"></i></button>
              </div>';
       
      $data[] = $sub_array;
  }



  $output = array(
   "data" => $data
  );

  echo json_encode($output);