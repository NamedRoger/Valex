<?php 
  
  require_once '../functions.php';
  $con = Conexion();

  $consulta = $con->query("SELECT * FROM clientes");
  $data = array();

  while($row = $consulta->fetch_array()){      
      $sub_array = array();
      $sub_array[] = '<small>'.$row["nombre"].'</small>';
      $sub_array[] = '<small>'.$row["telefono"].'</small>';
      switch ($row['precio']) {
        case '1':
          $sub_array[] = '<small>Precio Publico</small>';
          break;
        case '2':
          $sub_array[] = '<small>Medio-Mayoreo</small>';
          break;
        case '3':
          $sub_array[] = '<small>Mayoreo</small>';
          break;
      }
      $sub_array[] = '<div class="btn-group mb-3 btn-group-sm" role="group">
                <button class="btn btn-iconbtn btn-sm" onclick="ModalEditarCliente('.$row["idCliente"].')"><i class="fas fa-edit" style="color: #278CCD;"></i></button>
                <button class="btn btn-iconbtn btn-sm" onclick="EliminarCliente('.$row["idCliente"].')"><i class="fas fa-trash-alt" style="color: red;"></i></button>
              </div>';
       
      $data[] = $sub_array;
  }

  $output = array(
   "data" => $data
  );

  echo json_encode($output);