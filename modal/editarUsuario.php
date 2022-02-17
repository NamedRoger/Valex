<?php 
	session_start();
	require '../controller/functions.php';
	$con = Conexion();
	$idUsuario = $_GET['idUsuario'];
	$consulta = $con->query("SELECT * FROM users LEFT JOIN sucursales USING(idSucursal) WHERE idUsuario = '$idUsuario'");
	$row = $consulta->fetch_array();
 ?>

 <form>
	<div class="form-group">
		<label for="">Nombre</label>
		<input type="text" id="eNombre" name="eNombre" class="form-control" value="<?php echo $row['nombre'] ?>">
		<input type="hidden" id="idUsuario" name="idUsuario" class="form-control" value="<?php echo $row['idUsuario'] ?>">
	</div>
	<div class="form-group">
		<label for="">Teléfono</label>
		<input type="number" id="eTelefono" name="eTelefono" class="form-control" value="<?php echo $row['telefono'] ?>">
	</div>
	<div class="form-group">
		<label for="">Dirección</label>
		<input type="text" id="eDireccion" name="eDireccion" class="form-control" value="<?php echo $row['direccion'] ?>">
	</div>
	<div class="form-group">
		<label for="">Usuario</label>
		<input type="text" id="eUsuario" name="eUsuario" class="form-control" value="<?php echo $row['usuario'] ?>">
	</div>
	<div class="form-group">
		<label for="">Contraseña</label>
		<input type="password" id="ePassword" name="ePassword" class="form-control">
	</div>
	
	<?php 
		if ($row['rol'] != 1) {
			echo '<div class="form-group">
			<label for="">Rol</label>
			<select id="eRol" name="eRol" class="form-control">
				<option value="'.$row['rol'].'">';
				switch ($row['rol']) {
					case '2':
						echo 'Administrado(a)';
						break;
					case '3':
						echo 'Vendedor(a)';
						break;
					
				}
			echo '</option>
						<option value="2">Administrador(a)</option>
						<option value="3">Vendedor(a)</option>
					</select>
				</div>';
		}else{
			echo '<input type="hidden" id="eRol" name="eRol" value="'.$row['rol'].'">';
		}
		
		
		if ($row['idSucursal'] != 0) {
			echo '<div class="form-group">
			<label for="">Sucursal</label>
			<select id="eIdSucursal" name="eIdSucursal" class="form-control">
			<option value="'.$row['idSucursal'].'">'.$row['sucursal'].'</option>';
			$consulta = $con->query("SELECT idSucursal, sucursal FROM sucursales ORDER BY sucursal ASC");
	        while ($row = $consulta->fetch_array()) {
	        	echo '<option value="'.$row["idSucursal"].'">'.$row["sucursal"].'</option>';
	            }
		echo '	</select>
			</div>';
		}else{
			echo '<input type="hidden" id="eIdSucursal" name="eIdSucursal" value="'.$_SESSION['idSucursal'].'">';
		}

	?>
	<div>
		<button class="btn btn-primary" onclick="EditarUsuario(); return false;">Actualizar</button>
	</div>
</form>