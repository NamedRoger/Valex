<?php 
	session_start();
	require '../controller/functions.php';
	$con = Conexion();
	$idCliente = $_GET['idCliente'];
	$consulta = $con->query("SELECT * FROM clientes WHERE idCliente = '$idCliente'");
	$row = $consulta->fetch_array();

 ?>
<form id="formCliente">
	<div class="form-group">
		<label for="">Nombre del Cliente</label>
		<input type="text" id="eNombre" name="eNombre" class="form-control" value="<?php echo $row['nombre'] ?>">
		<input type="hidden" id="idCliente" name="idCliente" value="<?php echo $row['idCliente'] ?>">
	</div>
	<div class="form-group">
		<label for="">Teléfono del Cliente</label>
		<input type="number" id="eTelefono" name="eTelefono" class="form-control" value="<?php echo $row['telefono'] ?>">
	</div>
	<div class="form-group">
		<label for="">Precio de venta</label>
		<select id="ePrecio" name="ePrecio" class="form-control">
			<option value="<?php echo $row['precio'] ?>">
				<?php 
					switch ($row['precio']) {
				        case '1':
				          echo 'Precio Publico';
				          break;
				        case '2':
				          echo 'Medio-Mayoreo';
				          break;
				        case '3':
				          echo 'Mayoreo';
				          break;
				      }
				 ?>
			</option>
			<option value="1">Precio Publico</option>
			<option value="2">Medio-Mayoreo</option>
			<option value="3">Mayoreo</option>
		</select>
	</div>
	<div>
		<button class="btn btn-primary" onclick="EditarCliente(); return false;">Actualizar</button>
	</div>
</form>