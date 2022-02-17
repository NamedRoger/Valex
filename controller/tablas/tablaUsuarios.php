<?php 
  session_start();
  require_once '../functions.php';
  $con = Conexion();
  $idSucursal = $_SESSION['idSucursal'];

  if ($_SESSION['rol'] == 1) {
   $consulta = $con->query("SELECT * FROM users LEFT JOIN sucursales USING(idSucursal) ORDER BY idUsuario DESC");
  }else if ($_SESSION['rol'] == 2) {
    $consulta = $con->query("SELECT * FROM users WHERE rol != 1 AND idSucursal = '$idSucursal'");
  }
  
  $data = array();

  while($row = $consulta->fetch_array()){      
      $sub_array = array();
      $sub_array[] = '<small>'.$row["nombre"].'</small>';
      $sub_array[] = '<small>'.$row["telefono"].'</small>';
      $sub_array[] = '<small>'.$row["direccion"].'</small>';
      $sub_array[] = '<small>'.$row["usuario"].'</small>';
      switch ($row['rol']) {
        case '1':
           $sub_array[] = '<span class="badge bg-success">Superadmin</span>';
          break;
        case '2':
           $sub_array[] = '<span class="badge bg-info">Administrador(a)</span>';
          break;
        case '3':
           $sub_array[] = '<span class="badge bg-warning">Vendedor(a)</span>';
          break;
        
        
      }
      if ($_SESSION['rol'] == 1) {
        $sub_array[] = '<small>'.$row["sucursal"].'</small>';
      }
      if ($row["permiso"] == 0) {
         $sub_array[] = '<span class="badge bg-danger" style="cursor: pointer" onclick="PermisoStock('.$row["idUsuario"].','.$row["permiso"].' )">Bloqueado</span>';
      }else{
        $sub_array[] = '<span class="badge bg-success" style="cursor: pointer" onclick="PermisoStock('.$row["idUsuario"].','.$row["permiso"].' )">Desbloqueado</span>';
      }
      if ($row['rol'] == 1) {
        $sub_array[] = '<div class="btn-group mb-3 btn-group-sm" role="group">
                <button class="btn btn-iconbtn btn-sm" onclick="ModalEditarUsuario('.$row["idUsuario"].')"><i class="fas fa-user-edit" style="color: #278CCD;"></i></button>';
      }else{
        $sub_array[] = '<div class="btn-group mb-3 btn-group-sm" role="group">
                <button class="btn btn-iconbtn btn-sm" onclick="ModalEditarUsuario('.$row["idUsuario"].')"><i class="fas fa-user-edit" style="color: #278CCD;"></i></button>
                <button class="btn btn-iconbtn btn-sm" onclick="EliminarUsuario('.$row["idUsuario"].')"><i class="fas fa-trash-alt" style="color: red;"></i></button>
              </div>';
      }
       
      $data[] = $sub_array;
      
  }



  $output = array(
   "data" => $data
  );

  echo json_encode($output);