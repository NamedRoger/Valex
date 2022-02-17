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
					<!-- container -->
				<br><br><br><br>
				<div class="container-fluid">
					<div class="row row-sm">
						<div class="col-lg-4">
							<div class="card">
								<div class="card-body">
									<h5 class="mb-3">Formulario clientes</h5>
									<form id="formCliente">
										<div class="form-group">
											<label for="">Nombre del Cliente</label>
											<input type="text" id="nombre" name="nombre" class="form-control">
										</div>
										<div class="form-group">
											<label for="">Teléfono del Cliente</label>
											<input type="number" id="telefono" name="telefono" class="form-control">
										</div>
										<div class="form-group">
											<label for="">Precio de venta</label>
											<select id="precio" name="precio" class="form-control">
												<option value="0">Selecciona un precio</option>
												<option value="1">Precio Publico</option>
												<option value="2">Medio-Mayoreo</option>
												<option value="3">Mayoreo</option>
											</select>
										</div>
										<div>
											<button class="btn btn-primary" onclick="GuardarCliente(); return false;">Guardar</button>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div class="col-lg-8">
							<div class="card ">
								<div class="card-body">
									<h5 class="mb-3">Clientes</h5>
									<table class="table" id="tablaClientes">
										<thead>
											<tr>
												<th>Nombre</th>
												<th>Telefono</th>
												<th>Precio</th>
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
				<div class="modal fade" id="modalActualizarCliente" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLabel">Editar Cliente</h5>
				        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				      </div>
				      <div class="modal-body">
				        <div id="fomularioActualizarCliente"></div>
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