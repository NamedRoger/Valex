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
	<title>Ventas | Don Huachinango </title>
	<?php include 'fragments/css.php' ?>

</head>

<body class="main-body app sidebar-mini body-default default closed-leftmenu sidenav-toggled">
	<div id="global-loader">
		<img src="../assets/img/loader.svg" class="loader-img" alt="Loader">
	</div>
	<div class="page">
		<?php include 'fragments/menu.php'; ?>

		<div class="main-content app-content">
			<?php include 'fragments/header.php'; ?>
			<div class="jumps-prevent" style="padding-top: 63px;"></div>

			<!-- container -->
			<div class="container-fluid">
				<div id="divContainer"></div>
			</div>
			<!-- container -->
		</div>
		<?php include 'fragments/footer.php'; ?>
	</div>
	<!-- Modal -->
	<!-- Modal -->
	<?php include 'fragments/ventas.modls.php' ?>
	<?php include 'fragments/js.php' ?>
	<script type="module" src="./assets/js/modules/sales/index.js"></script>

</body>

</html>