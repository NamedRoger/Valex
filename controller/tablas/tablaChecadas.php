<?php 
  
  require_once '../functions.php';
  $con = Conexion();

  $consulta = $con->query("SELECT *,DATE_FORMAT(fechaEntrada,'%d/%m/%Y') AS fechaEntrada, DATE_FORMAT(horaEntrada, '%h:%i %p') AS horaEntrada, DATE_FORMAT(fechaSalida, '%d/%m/%Y') AS fechaSalida, DATE_FORMAT(horaSalida, '%h:%i %p') AS horaSalida FROM checador");
  $data = array();

  while($row = $consulta->fetch_array()){      
      $sub_array = array();
      $sub_array[] = '<small>'.$row["nombre"].'</small>';
      $sub_array[] = '<small>'.$row["fechaEntrada"].'</small>';
      $sub_array[] = '<small>'.$row["horaEntrada"].'</small>';
      $sub_array[] = '<small>'.$row["fechaSalida"].'</small>';
      $sub_array[] = '<small>'.$row["horaSalida"].'</small>';
      $data[] = $sub_array;
  }

  $output = array(
   "data" => $data
  );

  echo json_encode($output);