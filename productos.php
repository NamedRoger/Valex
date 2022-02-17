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
									<h5 class="mb-3">Formulario productos</h5>
									<form id="formProductos">
										<div class="row row-sm">
											<div class="form-group">
												<label>Codigo de barras</label>
												<input type="text" id="codigo" name="codigo" class="form-control form-control-sm">
											</div>
											<div class="form-group col-lg-6">
												<label>Categoría</label>
												<select class="form-control form-control-sm" id="idCategoria" name="idCategoria">
													<?php 
														$consulta = $con->query("SELECT * FROM categorias");
										                while ($row = $consulta->fetch_array()) {
										                	echo '<option value="'.$row["idCategoria"].'">'.$row["categoria"].'</option>';
										                }
													 ?>
												</select>
											</div>
											<div class="form-group col-lg-6">
												<label>Unidad de Medida</label>
												<select id="medida" name="medida" class="form-control form-control-sm">
													<option value="1">Kg</option>
													<option value="2">Pieza</option>
													<option value="3">Paquete</option>
												</select>
											</div>
											<div class="form-group">
												<label>Nombre del Producto</label>
												<input type="text" id="nombre" name="nombre" class="form-control form-control-sm">
											</div>
											<div class="form-group">
												<label>Descripción del Producto</label>
												<input type="text" id="descripcion" name="descripcion" class="form-control form-control-sm">
											</div>
											
											<div class="form-group col-lg-6">
												<label>Precio de compra</label>
												<input type="number" id="compra" name="compra" class="form-control form-control-sm">
											</div>
											<div class="form-group col-lg-6">
												<label>Precio Venta</label>
												<input type="number" id="venta" name="venta" class="form-control form-control-sm">
											</div>
											<div class="form-group col-lg-6">
												<label>Precio Medio-Mayoreo</label>
												<input type="number" id="medio" name="medio" class="form-control form-control-sm">
											</div>
											<div class="form-group col-lg-6">
												<label>Precio Mayoreo</label>
												<input type="number" id="mayoreo" name="mayoreo" class="form-control form-control-sm">
											</div>
											<div>
												<button class="btn btn-primary" onclick="GuardarProducto(); return false;">Guardar</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div class="col-lg-8">
							<div class="card">
								<div class="card-body">
									<h5 class="mb-3">Productos</h5>
									<table class="table" id="tablaProductos">
										<thead>
											<tr>
												<th>Codigo de Barras</th>
												<th>Producto</th>
												<th>Decripción</th>
												<th>Categoría</th>
												<th>U/Medida</th>
												<th>Compra</th>
												<th>Venta</th>
												<th>Medio-Mayoreo</th>
												<th>Mayoreo</th>
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
				<div class="modal fade" id="modalActualizarProducto" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				  <div class="modal-dialog">
				    <div class="modal-content">
				      <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLabel">Editar Producto</h5>
				        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				      </div>
				      <div class="modal-body">
				        <div id="fomularioActualizarProducto"></div>
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