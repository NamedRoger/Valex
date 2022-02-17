<?php 
	
	session_start(); 
	if (!isset($_SESSION['rol'])) {
		header('Location: /');
	}
	include 'controller/functions.php';
	$con = 	Conexion(); 
?>
<!doctype html>
<html lang="es" dir="ltr">
	<head>
		<meta charset="UTF-8">
		<meta name='viewport' content='width=device-width, initial-scale=1.0, user-scalable=0'>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<!-- Title -->
		<title> Don Huachinango </title>
		<?php include 'fragments/css.php'; ?>
	</head>
	<body class="main-body app sidebar-mini">
		<div id="global-loader">
			<img src="../assets/img/loader.svg" class="loader-img" alt="Loader">
		</div>
		<div class="page">
			<?php include 'fragments/menu.php'; ?>
			<div class="main-content app-content">
			<?php  include 'fragments/header.php'; ?>
				<br><br><br><br>
				<!-- container -->
				<div class="container-fluid">
					<div class="row row-sm">
						<div class="col-lg-4">
							<div class="card">
								<div class="card-body">
									<h5 class="mb-3">Formulario usuarios</h5>
									<form id="formUsuario">
										<div class="form-group">
											<label for="">Nombre</label>
											<input type="text" id="nombre" name="nombre" class="form-control">
										</div>
										<div class="form-group">
											<label for="">Genero</label>
											<select id="genero" name="genero" class="form-control">
												<option value="0">Seleccione un genero</option>
												<option value="1">Mujer</option>
												<option value="2">Hombre</option>
												<option value="3">Otro</option>
											</select>
										</div>
										<div class="form-group">
											<label for="">Teléfono</label>
											<input type="number" id="telefono" name="telefono" class="form-control">
										</div>
										<div class="form-group">
											<label for="">Dirección</label>
											<input type="text" id="direccion" name="direccion" class="form-control">
										</div>
										<div class="form-group">
											<label for="">Usuario</label>
											<input type="text" id="usuario" name="usuario" class="form-control">
										</div>
										<div class="form-group">
											<label for="">Contraseña</label>
											<input type="password" id="password" name="password" class="form-control">
										</div>
										<div class="form-group">
											<label for="">Rol</label>
											<select id="rol" name="rol" class="form-control">
												<option value="0">Seleccione un rol de usuario</option>
												<option value="2">Administrador(a)</option>
												<option value="3">Vendedor(a)</option>
											</select>
										</div>
										<?php 
											if ($_SESSION['idSucursal'] == 0) {
												echo '<div class="form-group">
												<label for="">Sucursal</label>
												<select id="idSucursal" name="idSucursal" class="form-control">
												<option value="0">Seleccione una sucursal para el usuario</option>';
												$consulta = $con->query("SELECT idSucursal, sucursal FROM sucursales ORDER BY sucursal ASC");
								                while ($row = $consulta->fetch_array()) {
								                	echo '<option value="'.$row["idSucursal"].'">'.$row["sucursal"].'</option>';
								                }
								        	echo '	</select>
												</div>';
											}else{
												echo '<input type="hidden" id="idSucursal" name="idSucursal" value="'.$_SESSION['idSucursal'].'">';
											}
				              
				             			?>
										<div>
											<button class="btn btn-primary" onclick="GuardarUsuario(); return false;">Guardar</button>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div class="col-lg-8">
							<div class="card ">
								<div class="card-body">
									<h5 class="mb-3">Usuarios</h5>
									<table class="table" id="tablaUsuarios">
										<thead>
											<tr>
												<th>Nombre</th>
												<th>Telefono</th>
												<th>Direccion</th>
												<th>Usuario</th>
												<th>Rol</th>
												<?php 
													if ($_SESSION['idSucursal'] == 0) {
														echo '<th>Sucursal</th>';
													}
												 ?>
												 <th>Stock</th>
												<th>Acciones</th>
											</tr>
										</thead>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- container -->
				<!-- Modal -->
				<div class="modal fade" id="modalActualizarUsuario" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLabel">Editar Usuario</h5>
				        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				      </div>
				      <div class="modal-body">
				        <div id="fomularioActualizarUsuario"></div>
				      </div>
				    </div>
				  </div>
				</div>	
			</div>
			<?php include 'fragments/footer.php';?>
				
		</div>
		<?php include 'fragments/js.php' ?>
	</body>
</html>