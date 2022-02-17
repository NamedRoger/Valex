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
								<h5 class="mb-3">Registro de checadas:</h5>
								<table class="table" id="tablaChecador">
									<thead>
										<tr>
											<tr>
												<th>Usuario</th>
												<th>Fecha de entrada</th>
												<th>Hora de entrada</th>
												<th>Fecha de Salida</th>
												<th>Hora de Salida</th>
											</tr>
										</tr>
									</thead>
								</table>
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