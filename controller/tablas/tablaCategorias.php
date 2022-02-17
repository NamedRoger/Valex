<?php 
  
  require_once '../functions.php';
  $con = Conexion();

  $consulta = $con->query("SELECT * FROM categorias");
  $data = array();

  while($row = $consulta->fetch_array()){      
      $sub_array = array();
      $sub_array[] = '<small>'.$row["categoria"].'</small>';
      $sub_array[] = '<div class="btn-group mb-3 btn-group-sm" role="group">
                <button class="btn btn-iconbtn btn-sm" onclick="EliminarCategoria('.$row["idCategoria"].')"><i class="fas fa-trash-alt" style="color: red;"></i></button>
              </div>';
       
      $data[] = $sub_array;
  }



  $output = array(
   "data" => $data
  );

  echo json_encode($output);