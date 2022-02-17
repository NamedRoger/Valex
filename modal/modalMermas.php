<?php 
	session_start();
	require '../controller/functions.php';
	$con = Conexion();
	$idStock = $_GET['idStock'];
 ?>
<form id="formularioStock">
	<div class="form-group">
		<label>Restar Stock</label>
		<input type="number" name="merma" id="merma" class="form-control form-control-sm">
		<input type="hidden" name="idStock" id="idStock" value="<?php echo $idStock ?>">
	</div>
    <div>
    <button class="btn btn-primary" onclick="GuardarMerma(); return false;">Ajustar</button>
    </div>
</form>