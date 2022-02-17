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
						<div class="col-lg-6">
							<div class="card">
								<div class="card-body">
									<form>
										<div class="row" style="padding:5px 15px">
											<div class="col-lg-g">
												<div class="form-group">
													<label>Vendedor</label>
													<input type="text" name="vendedor" class="form-control" value="<?php echo $_SESSION['nombre'] ?>" readonly>
												</div>
											</div>
											<div class="form-group">
												<label>Cliente</label>
							                  	<div class="input-group">
							                    <select class="form-control select" required>
							                    	<?php 
														$consulta = $con->query("SELECT * FROM clientes");
										                while ($row = $consulta->fetch_array()) {
										                	echo '<option value="'.$row["idCliente"].'">'.$row["nombre"].'</option>';
										                }
													 ?>
							                    </select>
							                    <span class="input-group-addon"><button type="button" class="btn btn-secondary btn-sm" onclick="ModalCliente();">Agregar cliente</button></span>
							                  </div>
							                
							                </div>
									        <div class="col-lg-5" style="padding-right:0px">
									        	<div class="input-group">
									            	<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs"><i class="fa fa-times"></i></button></span>
									              	<input type="text" class="form-control" name="descripcion" placeholder="Descripcion del producto" readonly required>
									            </div>
									        </div>
									        <div class="col-lg-3">
								             	<select class="form-control">
								             		<option>Kilo</option>
								             		<option>Gramos</option>
								             		<option>Pieza</option>
								             		<option>Paquete</option>
								             	</select>
								          	</div> 
								          	<div class="col-lg-2">
								             	<input type="number" class="form-control" min="1" value="1" required>
								          	</div> 
									        <div class="col-lg-2" style="padding-left:0px">
									            <div class="input-group">
									              	<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>
									              	<input type="text" class="form-control" value="$"  readonly required>
									            </div>
								            </div>
								        </div>
									</form>
								</div>
							</div>
						</div>
						<div class="col-lg-6">
							<div class="card">
								<div class="card-body">
									<table class="table" id="tablaVentas">
										<thead>
											<tr>
												<th>Descripción</th>
												<th>Precio</th>
												<th></th>
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
		<!-- Modal -->
		<div class="modal fade" id="nuevoCliente" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div class="modal-dialog">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="exampleModalLabel">Nuevo Cliente</h5>
		        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		      </div>
		      <div class="modal-body">
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
		</div>
		<!-- Modal -->
		<?php include 'fragments/js.php' ?>
	</body>
</html>