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
			<?php include 'fragments/header.php'; ?>
			<br><br><br><br>
			<!-- container -->
			<div class="container-fluid">
				<div id="divContainer"></div>
			</div>
			<!-- container -->
			<div class="modal fade" id="arqueoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							<!-- row -->
							<div class="row row-sm">
								<div class="col-md-12 col-xl-12">
									<div class=" main-content-body-invoice">
										<div class="card card-invoice">
											<div class="card-body">
												<div class="invoice-header">
													<h1 class="invoice-title">Nota</h1>
													<div class="billed-from">
														<h6 id="ventaDireccion">Lazaro cardenas # 100</h6>
														<!--<p><br>s
													<br>
													</p>-->
													</div><!-- billed-from -->
												</div><!-- invoice-header -->
												<div class="row mg-t-20">
													<div class="col-md">
														<label class="tx-gray-600">Cliente:</label>
														<div class="billed-to">
															<h6 id="clienteDetalle">Publico en General</h6>
														</div>
													</div>
													<div class="col-md">
														<label class="tx-gray-600">Infomacion de la nota:</label>
														<p class="invoice-info-row"><span><small>Nota No.</small></span> <span><small id="idDetalle">007</small></span></p>
														<p class="invoice-info-row"><span><small>Vendedor:</small></span> <span><small id="vendedorDetalle">Paloma</small></span></p>
														<p class="invoice-info-row"><span><small>Fecha y Hora:</small></span> <span><small id="fechaDetalle">14/01/2020-13:47:44</small></span></p>
													</div>
												</div>
												<div class="table-responsive mg-t-40">
													<table id="tablaProductosDetalle" class="table table-invoice border text-md-nowrap mb-0">
														<thead>
															<tr>
																<th><small>Producto</small></th>
																<th><small>Precio</small></th>
																<th><small>Cantidad</small></th>
																<th><small>Total</small></th>
															</tr>
														</thead>
														<tbody>

														</tbody>

													</table>
													<h3 class="mt-4">Total:<span id="totalDetalle"></span></h3>
												</div>
												<!--  -->
												<a href="#" class="btn btn-info float-end mt-3 ms-2">
													<i class="mdi mdi-printer me-1"></i>Imprimir
												</a>
											</div>
										</div>
									</div>
								</div><!-- COL-END -->
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<?php include 'fragments/footer.php'; ?>

	</div>
	<?php include 'fragments/js.php' ?>
	<script type="module" src="./assets/js/modules/cash-register/index.js"></script>
</body>

</html>