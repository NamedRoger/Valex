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
				<div class="breadcrumb-header justify-content-between">
					<div class="my-auto">
						<div class="d-flex">
							<h3 class="content-title mb-0 my-auto">Venta</h3>
						</div>
					</div>
					<div class="d-flex my-xl-auto right-content">
						<div class="pe-1 mb-xl-0"> 
							<button type="button" class="btn btn-success me-2" data-bs-toggle="modal" data-bs-target="#buscarCliente">
								<i class="bi bi-person-circle"></i>
							</button> 
						</div>
						<div class="pe-1 mb-xl-0"> 
							<button type="button" class="btn btn-info me-2 btn-b" data-bs-toggle="modal" data-bs-target="#nuevoCliente" >
								<i class="bi bi-person-plus"></i>
							</button> 
						</div>
						<div class="pe-1 mb-xl-0"> 
							<button type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#buscarProducto" >
								<i class="bi bi-search"></i>
							</button>
						</div>
						<div class="mb-xl-0"> 
							<div class="btn-group dropdown"> 
								<span class="btn btn-warning" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Caja</span> 
								<button type="button" class="btn btn-warning dropdown-toggle dropdown-toggle-split" id="dropdownMenuDate" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
									<span class="sr-only">Toggle Dropdown</span> 
								</button> 
								<div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuDate" x-placement="bottom-end"> 
									<button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#abrirCaja" >Abrir</button> 
									<button class="dropdown-item" data-bs-toggle="modal" data-bs-target="#cerrarCaja">Cerrar</button> 
								</div> 
							</div> 
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col-8">
						<div class="card">
							<div class="card-body">
								<!-- <div class="row">
									<div class="col">
										<div>
											<label for="">Producto:</label>
											<input type="text" placeholder="buscar..."/>
										</div>
									</div>
								</div> -->
								<div class="row">
									<di class="col">
										<table class="table table-bordered" >
											<thead>
												<tr>
													<td>Producto</td>
													<td>Precio</td>
													<td>Cantidad</td>
													<td>Total</td>
													<td></td>
												</tr>
											</thead>
											<tbody id="tablaProductosVenta"></tbody>
											<tfoot>
												<tr class="tx-blod">
													<td colspan="2"></td>
													<td>TOTAL</td>
													<td id="totalVentaTabla">$0.00</td>
												</tr>
											</tfoot>
										</table>
									</di>
								</div>
							</div>
						</div>
					</div>
					<div class="col-4">
						<div class="card">
							<div class="card-body" id="infoVenta">
								<div class="row">
									<div class="col">
										<dl>
											<dt>Cliente</dt>
											<dd id="infoCliente">---</dd>

											<dt>Total</dt>
											<dd id="totalVentaDetalle">$0.00</dd>
										</dl>
									</div>
								</div>
								<div class="row">
									<div class="col">
										<button id="cancelarVenta" class="btn btn-danger">Cancelar</button>

										<button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#terminarVenta">Finalizar</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- container -->
		</div>
		<?php include 'fragments/footer.php'; ?>
	</div>
	<!-- Modal -->
	<?php include 'fragments/ventas.modls.php'?>
	<!-- Modal -->
	<?php include 'fragments/js.php' ?>
	<script src="./assets/js/ventas.js"></script>
</body>

</html>