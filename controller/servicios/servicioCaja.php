<?php
use Valex\Clases\DataBase;

function listarArqueos() {
    $conexion = DataBase::getInstance()->getConexion();
    $queryArqueo = "SELECT * FROM arqueo_caja AS ac INNER JOIN sucursales AS s ON s.idSucursal = ac.idSucursal";
    
    $result = $conexion->query($queryArqueo);
    $arqueos = [];

    while($arqueo = $result->fetch_object()){
        $arqueos[] = $arqueo;
    }

    return $arqueos;
}
