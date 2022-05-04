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
					<div class="row">
						<div class="card">
							<div class="card-body">
								<h5 class="mb-3">Productos:</h5>
								<table class="table" id="tablaStock">
									<thead>
										<tr>
											<tr>
												<?php 
													if ($_SESSION['rol'] == 1) {
														echo '<th>Sucursal</th>';
													}
												 ?>
												<th>Codigop de Barras</th>
												<th>Producto</th>
												<th>Decripción</th>
												<th>Categoría</th>
												<th>U/Medida</th>
												<th>Venta</th>
												<th>Stock</th>
												<th>Resurtir</th>
												<?php 
													 if ($_SESSION['rol'] == 1 || $_SESSION['rol'] == 2) {
													 	echo '<th>Mermas</th>';
													 }
												 ?>
											</tr>
										</tr>
									</thead>
								</table>
							</div>
						</div>
					</div>
				</div>
				<!-- container -->
				<div class="modal fade" id="modalStock" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLabel">Actualizar Stock</h5>
				        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				      </div>
				      <div class="modal-body">
				      	<div id="formStock"></div>
				      </div>
				    </div>
				  </div>
				</div>
				<div class="modal fade" id="modalMerma" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLabel">Restar Stock</h5>
				        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				      </div>
				      <div class="modal-body">
				      	<div id="formMerma"></div>
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