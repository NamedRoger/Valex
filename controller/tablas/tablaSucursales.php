<?php 
  
  require_once '../functions.php';
  $con = Conexion();

  $consulta = $con->query("SELECT * FROM sucursales");
  $data = array();

  while($row = $consulta->fetch_array()){      
      $sub_array = array();
      $sub_array[] = '<small>'.$row["sucursal"].'</small>';
      $sub_array[] = '<small>'.$row["direccionSuc"].'</small>';
      $sub_array[] = '<small>'.$row["telefonoSuc"].'</small>';
      $sub_array[] = '<div class="btn-group mb-3 btn-group-sm" role="group">
                <button class="btn btn-iconbtn btn-sm" onclick="ModalEditarSucursal('.$row["idSucursal"].')"><i class="fas fa-edit" style="color: #278CCD;"></i></button>
                <button class="btn btn-iconbtn btn-sm" onclick="EliminarSucursal('.$row["idSucursal"].')"><i class="fas fa-trash-alt" style="color: red;"></i></button>
              </div>';
       
      $data[] = $sub_array;
  }



  $output = array(
   "data" => $data
  );

  echo json_encode($output);