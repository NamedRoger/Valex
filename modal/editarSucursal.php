<?php 
	session_start();
	require '../controller/functions.php';
	$con = Conexion();
	$idSucursal = $_GET['idSucursal'];
	$consulta = $con->query("SELECT * FROM sucursales WHERE idSucursal = '$idSucursal'");
	$row = $consulta->fetch_array();

 ?>
 <form id="formEditarSucursal">
	<div class="form-group">
		<label for="">Nombre de la tienda</label>
		<input type="text" id="eSucursal" name="eSucursal" class="form-control" value="<?php echo $row['sucursal'] ?>">
		<input type="hidden" id="idSucursal" name="idSucursal" class="form-control" value="<?php echo $row['idSucursal'] ?>">
	</div>
	<div class="form-group">
		<label for="">Dirección de la tienda</label>
		<input type="text" id="eDireccion" name="eDireccion" class="form-control" value="<?php echo $row['direccionSuc'] ?>">
	</div>
	<div class="form-group">
		<label for="">Teléfono de la tienda</label>
		<input type="text" id="eTelefono" name="eTelefono" class="form-control" value="<?php echo $row['telefonoSuc'] ?>">
	</div>
	<div>
		<button class="btn btn-primary" onclick="EditarSucursal(); return false;">Actualizar</button>
	</div>
</form>