<?php 
  
  require_once '../functions.php';
  $con = Conexion();

  $consulta = $con->query("SELECT * FROM productos LEFT JOIN categorias USING(idCategoria)");
  $data = array();

  while($row = $consulta->fetch_array()){      
      $sub_array = array();
      if ($row['foto'] == '') {
        $sub_array[] = '<img id="imagenPrevisualizacion" src="assets/img/box.png" width="50px">';
      }else{
        $sub_array[] = '<img id="imagenPrevisualizacion" src="'.$row['foto'].'" width="50px">';
      }
      $sub_array[] = $row["codigo"];
      $sub_array[] = $row["nombre"];
      $sub_array[] = $row["descripcion"];
      $sub_array[] = $row["categoria"];
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
      $sub_array[] = $row["compra"];
      $sub_array[] = $row["venta"];
      $sub_array[] = $row["medio"];
      $sub_array[] = $row["mayoreo"];
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