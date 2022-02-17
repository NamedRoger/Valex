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
									<h5 class="mb-3">Formulario categorías</h5>
									<form id="formCategorias">
										<div class="form-group">
											<label for="">Nombre de la Categoría</label>
											<input type="text" id="categoria" name="categoria" class="form-control">
										</div>
										<div>
											<button class="btn btn-primary" onclick="GuardarCategoria(); return false;">Guardar</button>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div class="col-lg-8">
							<div class="card ">
								<div class="card-body">
									<h5 class="mb-3">Categorías</h5>
									<table class="table" id="tablaCategorias">
										<thead>
											<tr>
												<th>Nombre</th>
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
			</div>
			<?php include 'fragments/footer.php';?>
				
		</div>
		<?php include 'fragments/js.php' ?>
	</body>
</html>