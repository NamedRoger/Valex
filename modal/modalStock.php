<?php 
	session_start();
	require '../controller/functions.php';
	$con = Conexion();
	$idStock = $_GET['idStock'];
	$consulta = $con->query("SELECT stock FROM stock WHERE idStock = '$idStock'");
	$row = $consulta->fetch_array();
 ?>
<form id="formularioStock">
	<div class="form-group">
		<label>Stock</label>
		<input type="number" name="stock" id="stock" class="form-control form-control-sm">
		<input type="hidden" name="idStock" id="idStock" value="<?php echo $idStock ?>">
	</div>
    <div>
    	<?php 
    		if ($row['stock'] == 0) {
    			echo '<button class="btn btn-primary" onclick="GuardarStock(); return false;">Actualizar</button>';
    		}else{
    			echo '<button class="btn btn-primary" onclick="EditarStock(); return false;">Actualizar</button>';
    		}
    	 ?>
    </div>
</form>