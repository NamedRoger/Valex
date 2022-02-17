<?php 
	session_start();
	require '../controller/functions.php';
	$con = Conexion();
	$idProducto = $_GET['idProducto'];
	$consulta = $con->query("SELECT * FROM productos WHERE idProducto = '$idProducto'");
	$row = $consulta->fetch_array();

 ?>
<form>
	<div class="row row-sm">
		<div class="form-group">
			<label>Codigo de barras</label>
			<input type="text" id="eCodigo" name="eCodigo" class="form-control form-control-sm" value="<?php echo $row['codigo'] ?>">
			<input type="hidden" id="idProducto" name="idProducto" value="<?php echo $row['idProducto'] ?>">
		</div>
		<div class="form-group">
			<label>Nombre del Producto</label>
			<input type="text" id="eNombre" name="eNombre" class="form-control form-control-sm" value="<?php echo $row['nombre'] ?>">
		</div>
		<div class="form-group">
			<label>Descripción del Producto</label>
			<input type="text" id="eDescripcion" name="eDescripcion" class="form-control form-control-sm" value="<?php echo $row['descripcion'] ?>">
		</div>
		
		<div class="form-group col-lg-6">
			<label>Precio de compra</label>
			<input type="number" id="eCompra" name="eCompra" class="form-control form-control-sm" value="<?php echo $row['compra'] ?>">
		</div>
		<div class="form-group col-lg-6">
			<label>Precio Venta</label>
			<input type="number" id="eVenta" name="eVenta" class="form-control form-control-sm" value="<?php echo $row['venta'] ?>">
		</div>
		<div class="form-group col-lg-6">
			<label>Precio Medio-Mayoreo</label>
			<input type="number" id="eMedio" name="eMedio" class="form-control form-control-sm" value="<?php echo $row['medio'] ?>">
		</div>
		<div class="form-group col-lg-6">
			<label>Precio Mayoreo</label>
			<input type="number" id="eMayoreo" name="eMayoreo" class="form-control form-control-sm" value="<?php echo $row['mayoreo'] ?>">
		</div>
		<div>
			<button class="btn btn-primary" onclick="EditarProducto(); return false;">Actualizar</button>
		</div>
	</div>
</form>