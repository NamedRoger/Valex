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
									<h5 class="mb-3">Alta de sucursal</h5>
										<form id="formSucursal" method="post">
											<div class="form-group">
												<label for="">Nombre de la sucursal</label>
												<input type="text" id="sucursal" name="sucursal" class="form-control" autofocus>
											</div>
											<div class="form-group">
												<label for="">Dirección de la sucursal</label>
												<input type="text" id="direccion" name="direccion" class="form-control">
											</div>
											<div class="form-group">
												<label for="">Teléfono de la sucursal</label>
												<input type="number" id="telefono" name="telefono" class="form-control">
											</div>
											<div>
												<button class="btn btn-primary" onclick="GuardarSucursal(); return false;">Guardar</button>
											</div>
										</form>
								</div>
							</div>
						</div>
						<div class="col-lg-8">
							<div class="card ">
								<div class="card-body">
									<h5 class="mb-3">Sucursales</h5>
									<table class="table" id="tablaSucursales">
										<thead>
											<tr>
												<th>Sucursal</th>
												<th>Direccion</th>
												<th>Teléfono</th>
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
				<div class="modal fade" id="modalActualizarSucursal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLabel">Editar Sucursal</h5>
				        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				      </div>
				      <div class="modal-body">
				        <div id="fomularioActualizarSucursal"></div>
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